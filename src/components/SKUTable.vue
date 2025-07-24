<script setup lang="ts">
import type { DailySalesSKUListResponse } from '@/types/api/sales-analytics'
import { ref } from 'vue'

defineProps<{ skuList: DailySalesSKUListResponse['Data']; pageSize: number }>()
defineEmits(['getNextPages'])
const currentPage = ref(1)
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Qty</th>
          <th>Shipping Amount</th>
          <th>Amount</th>
          <th>Refund Percantage</th>
          <th>Qty2</th>
          <th>Amount2</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sku in skuList.item.skuList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize,
          )"
          :key="sku.sku"
        >
          <td>{{ sku.sku }}</td>
          <td>{{ sku.productName }}</td>
          <td>{{ sku.qty }}</td>
          <td>{{ sku.shippingAmount }}</td>
          <td>{{ sku.amount }}</td>
          <td>{{ sku.refundPercantage }}</td>
          <td>{{ sku.qty2 }}</td>
          <td>{{ sku.amount2 }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center gap-2">
      <button
        class="p-2 border border-gray-300 rounded"
        @click="currentPage--"
        v-if="currentPage > 1"
      >
        {{ '<' }}
      </button>
      <button class="p-2 border border-gray-300 rounded">
        {{ currentPage }}
      </button>
      <button
        class="p-2 border border-gray-300 rounded"
        @click="
          () => {
            if (currentPage < skuList.item.skuList.length / pageSize) {
              currentPage++
            } else {
              $emit('getNextPages', currentPage * pageSize)
            }
          }
        "
      >
        {{ '>' }}
      </button>
    </div>
  </div>
</template>
