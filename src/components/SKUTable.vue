<script setup lang="ts">
import type { DailySalesSKUListResponse, SKURefundRateResponse } from '@/types/api/sales-analytics'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { computed } from 'vue'

const props = defineProps<{
  skuList: DailySalesSKUListResponse['Data']
  skuRefundRate: SKURefundRateResponse['Data']
  pageSize: number
  currentPage: number
  nextPageLoading: boolean
  selectedDates: string[]
  isLastPage: boolean
}>()
const lang = window.navigator.language

defineEmits(['getNextPages', 'nextPage', 'prevPage'])
const displayAdditionalColumn = computed(() => props.selectedDates.length > 1)
</script>
<template>
  <div class="w-full">
    <table class="w-full">
      <thead>
        <tr class="bg-gray-200">
          <th class="text-left p-2">SKU</th>
          <th class="text-left p-2">Product Name</th>
          <th class="p-2">
            <div class="flex flex-col items-end text-end">
              <span>{{
                new Date(selectedDates[0]).toLocaleString(lang, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}</span>
              <span>Sales / Units</span>
              <span class="text-right">Average Selling Price</span>
            </div>
          </th>

          <th class="p-2" v-if="displayAdditionalColumn">
            <div class="flex flex-col items-end text-end">
              <span>{{
                new Date(selectedDates[1]).toLocaleString(lang, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}</span>
              <span>Sales / Units</span>
              <span class="text-right">Average Selling Price</span>
            </div>
          </th>
          <th class="p-2 text-right pr-2">
            <div class="flex flex-col items-end">
              <span>SKU Refund Rate</span>
              <span class="text-xs font-normal">( Last 30 days )</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="p-4 even:bg-gray-100"
          v-for="(sku, index) in skuList?.item?.skuList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize,
          )"
          :key="sku.sku"
        >
          <td class="p-2 text-sm">{{ sku.sku }}</td>
          <td class="p-2 text-sm">{{ sku.productName }}</td>

          <td class="p-2 justify-items-end">
            <div
              class="flex flex-col items-end font-medium"
              :class="{ 'text-red-500': sku.amount / sku.qty < 0 } + ' text-green-500'"
            >
              <div class="flex flex-row gap-2">
                <span>{{ skuList.Currency }} {{ sku.amount }}</span>
                <span>/</span>
                <span>{{ sku.qty }}</span>
              </div>
              <span>{{ sku.amount / sku.qty || '-' }}</span>
            </div>
          </td>

          <td v-if="displayAdditionalColumn" class="p-2">
            <div
              class="flex flex-col items-end font-medium"
              :class="{ 'text-red-500': sku.amount2 / sku.qty2 < 0 } + ' text-green-500'"
            >
              <div class="flex flex-row gap-2">
                <span>{{ skuList.Currency }} {{ sku.amount2 }}</span>
                <span>/</span>
                <span>{{ sku.qty2 }}</span>
              </div>
              <span>{{ sku.amount2 / sku.qty2 || '-' }}</span>
            </div>
          </td>
          <td class="p-2 font-medium text-sm text-right">
            {{ skuRefundRate[index]?.refundRate }}%
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center gap-2">
      <button
        class="p-2 border border-gray-300 rounded"
        @click="$emit('prevPage')"
        v-if="currentPage > 1"
      >
        {{ '<' }}
      </button>
      <button class="p-2 border border-gray-300 rounded">
        {{ currentPage }}
      </button>
      <button
        v-if="!isLastPage"
        class="p-2 border border-gray-300 rounded"
        @click="
          () => {
            if (nextPageLoading) return
            if (currentPage < skuList.item.skuList.length / pageSize) {
              $emit('nextPage')
            } else {
              $emit('getNextPages', currentPage * pageSize)
            }
          }
        "
      >
        <LoadingSpinner v-if="nextPageLoading" />
        <span v-else>{{ '>' }}</span>
      </button>
    </div>
  </div>
</template>
