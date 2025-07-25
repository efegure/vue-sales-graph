<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useTypedStore } from '@/store'
import SalesChart from '@/components/SalesChart.vue'
import SKUTable from '@/components/SKUTable.vue'
import DropDown from '@/components/common/DropDown.vue'
import type { DailySalesSKUListResponse } from '@/types/api/sales-analytics'
import { useRouter } from 'vue-router'
import type { PointClickEventObject } from 'highcharts'

const { state, dispatch, getters } = useTypedStore()

const router = useRouter()
const day = ref(7)
const selectedColumns = ref<number[]>([])
// Api page requests 30 elements per requirement
const currentApiPage = ref(1)
const nextPageLoading = ref(false)
const pageSize = ref(30)
const isLastPage = ref(false)
// Table page displays 10 elements per requirement
const currentTablePage = ref(1)

const handleColumnSelect = (event: PointClickEventObject) => {
  const columnIndex = event.point.x
  const isSelected = selectedColumns.value.includes(columnIndex)

  if (isSelected) {
    selectedColumns.value = selectedColumns.value.filter((i) => i !== columnIndex)
  } else {
    if (selectedColumns.value.length < 2) {
      selectedColumns.value.push(columnIndex)
    } else {
      const newSelections = [...selectedColumns.value]
      newSelections.shift()
      newSelections.push(columnIndex)
      selectedColumns.value = newSelections
    }
  }
  currentApiPage.value = 1
  currentTablePage.value = 1
  isLastPage.value = false
}
const selectedDates = computed(() => {
  return [...selectedColumns.value]
    .sort((a, b) => a - b)
    .map((index) => {
      return getters.getDailySalesOverview?.item[index].date
    })
})

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

watch([currentApiPage, selectedDates], () => {
  if (nextPageLoading.value) return
  nextPageLoading.value = true
  dispatch('fetchDailySalesSKUList', {
    marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
    sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
    salesDate: selectedDates.value[0],
    salesDate2: selectedDates.value[1],
    pageSize: pageSize.value,
    pageNumber: currentApiPage.value,
    isDaysCompare: selectedColumns.value.length > 1 ? 1 : 0,
  }).then((nextPageElementsLength: number) => {
    if (currentApiPage.value > 1 && nextPageElementsLength > 0) {
      //open next page if it exists
      currentTablePage.value += 1
    }
    if (nextPageElementsLength === 0) {
      isLastPage.value = true
    }
    nextPageLoading.value = false
  })
})
watch(
  () => day.value,
  () => {
    selectedColumns.value = []
    currentApiPage.value = 1
    currentTablePage.value = 1
    isLastPage.value = false
    fetchSales()
  },
)
watch(
  () => getters.getSKUList,
  (skuList: DailySalesSKUListResponse['Data']['item']['skuList']) => {
    if (!skuList) return
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
  <div class="lg:mx-32 md:mx-12 mx-4 my-16 h-full flex flex-col gap-4">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-3xl font-bold align-center">Sales Chart</h1>
      <button
        class="bg-red-500 text-white p-2 rounded cursor-pointer"
        @click="
          dispatch('logout').then(() => {
            router.push('/login')
          })
        "
      >
        Logout
      </button>
    </div>
    <div class="flex flex-col gap-4 border border-gray-200 shadow-md p-4 rounded-xl gap-8">
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

      <SalesChart
        :data="getters.getDailySalesOverview"
        @columnSelect="handleColumnSelect"
        :selectedColumnIndexes="selectedColumns"
      />

      <SKUTable
        v-if="
          getters.getDailySalesSKUList?.item?.skuList?.length > 0 &&
          getters.getSKURefundRate?.length > 0
        "
        :skuList="getters.getDailySalesSKUList"
        :pageSize="10"
        :currentPage="currentTablePage"
        @getNextPages="currentApiPage++"
        @nextPage="currentTablePage++"
        @prevPage="currentTablePage--"
        :nextPageLoading="nextPageLoading"
        :skuRefundRate="getters.getSKURefundRate"
        :selectedDates="selectedDates"
        :isLastPage="isLastPage"
      />
    </div>
  </div>
</template>
