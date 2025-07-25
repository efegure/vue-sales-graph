<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTypedStore } from '@/store'
import SalesChart from '@/components/SalesChart.vue'
import SKUTable from '@/components/SKUTable.vue'
import DropDown from '@/components/common/DropDown.vue'
import type { DailySalesSKUListResponse } from '@/types/api/sales-analytics'

const { state, dispatch, getters } = useTypedStore()

const day = ref(7)
const selectedColumns = ref<string[]>([])
// Api page requests 30 elements per requirement
const currentApiPage = ref(1)
const nextPageLoading = ref(false)
const pageSize = ref(30)
// Table page displays 10 elements per requirement
const currentTablePage = ref(1)

const handleColumnSelect = (indexes: number[]) => {
  currentApiPage.value = 1
  currentTablePage.value = 1
  selectedColumns.value = indexes
    .sort((a, b) => a - b)
    .map((index) => {
      return getters.getDailySalesOverview?.item[index].date
    })
}

const fetchSales = () =>
  dispatch('fetchDailySalesOverview', {
    marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
    sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
    requestStatus: 0,
    day: day.value,
    excludeYoYData: true,
  })

onMounted(() => {
  dispatch('fetchUserLoginInformation').then(() => {
    fetchSales()
  })
})

watch([currentApiPage, selectedColumns], () => {
  if (nextPageLoading.value) return
  nextPageLoading.value = true
  dispatch('fetchDailySalesSKUList', {
    marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
    sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
    salesDate: selectedColumns.value[0],
    salesDate2: selectedColumns.value[1],
    pageSize: pageSize.value,
    pageNumber: currentApiPage.value,
    isDaysCompare: selectedColumns.value.length > 1 ? 1 : 0,
  }).then((nextPageElementsLength: number) => {
    if (currentApiPage.value > 1 && nextPageElementsLength > 0) {
      //open next page if it exists
      currentTablePage.value += 1
    }
    nextPageLoading.value = false
  })
})
watch(
  () => day.value,
  () => {
    fetchSales()
  },
)
watch(
  () => getters.getSKUList,
  (skuList: DailySalesSKUListResponse['Data']['item']['skuList']) => {
    console.log('skuList', skuList)
    dispatch('fetchSKURefundRate', {
      marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
      sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
      skuList: skuList.map((sku) => sku.sku),
      requestedDay: 30, // seems static in pdf
    })
  },
)
</script>
<template>
  <div class="mx-8 my-12 h-full flex flex-col gap-4">
    <h1 class="text-3xl font-bold align-center">Sales Chart</h1>
    <div class="flex flex-col gap-4 border border-gray-200 shadow-md p-4 rounded-xl">
      <div class="relative flex flex-row items-center justify-center">
        <h2 class="text-2xl font-bold">Daily Sales</h2>
        <div class="flex flex-col gap-4 absolute right-0">
          <DropDown
            :options="[
              { value: 7, label: 'Last 7 Days' },
              { value: 14, label: 'Last 14 Days' },
              { value: 30, label: 'Last 30 Days' },
              { value: 60, label: 'Last 60 Days' },
            ]"
            v-model="day"
          />
        </div>
      </div>

      <SalesChart :data="getters.getDailySalesOverview" @columnSelect="handleColumnSelect" />
      <SKUTable
        :skuList="getters.getDailySalesSKUList"
        :pageSize="10"
        :currentPage="currentTablePage"
        @getNextPages="currentApiPage++"
        @nextPage="currentTablePage++"
        @prevPage="currentTablePage--"
        :nextPageLoading="nextPageLoading"
        :skuRefundRate="getters.getSKURefundRate"
        :selectedDates="selectedColumns"
      />
    </div>
  </div>
</template>
