<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTypedStore } from '@/store'
const { state, dispatch, getters } = useTypedStore()

const day = ref(7)

onMounted(() => {
  dispatch('fetchUserLoginInformation').then(() => {
    dispatch('fetchDailySalesOverview', {
      marketplace: state.userModule.userLoginInformation?.user.store[0].marketplaceName,
      sellerId: state.userModule.userLoginInformation?.user.store[0].storeId,
      requestStatus: 0,
      day: day.value,
      excludeYoYData: true,
    }).then(() => {
      console.log('Daily Sales Overview Fetched')
    })
  })
})
</script>
<template>
  <div class="mx-8 my-12 h-full">
    <h1>Chart page</h1>
    <p>{{ getters.getDailySalesOverview }}</p>
  </div>
</template>
