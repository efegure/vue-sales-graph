<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from 'vue'
import { useTypedStore } from '@/store'
import SalesChart from '@/components/SalesChart.vue'
import SKUTable from '@/components/SKUTable.vue'
const { state, dispatch, getters } = useTypedStore()

const day = ref(7)
const selectedColumns = ref<string[]>([])
const currentPage = ref(1)
const pageSize = ref(30)

const handleColumnSelect = (indexes: number[]) => {
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

watchEffect(() => {
  dispatch('fetchDailySalesSKUList', {
    marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
    sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
    salesDate: selectedColumns.value[0],
    salesDate2: selectedColumns.value[1],
    pageSize: pageSize.value,
    pageNumber: currentPage.value,
    isDaysCompare: 1,
  })
})
watch(
  () => day.value,
  () => {
    fetchSales()
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
          <div class="flex flex-row gap-1">
            <select class="p-2 border border-gray-300 rounded" name="cars" id="cars" v-model="day">
              <option :value="7">Last 7 Days</option>
              <option :value="14">Last 14 Days</option>
              <option :value="30">Last 30 Days</option>
              <option :value="60">Last 60 Days</option>
            </select>
          </div>
        </div>
      </div>

      <SalesChart :data="getters.getDailySalesOverview" @columnSelect="handleColumnSelect" />
      <SKUTable
        :skuList="getters.getDailySalesSKUList"
        :pageSize="10"
        @getNextPages="currentPage++"
      />
    </div>
  </div>
</template>
