<script setup lang="ts">
import { Chart } from 'highcharts-vue'
import { type Options, type PointClickEventObject } from 'highcharts'
import { computed } from 'vue'
import type { DailySalesOverviewResponse } from '@/types/api/sales-analytics'

const props = defineProps<{
  data: DailySalesOverviewResponse['Data'] | null
  selectedColumnIndexes: number[]
}>()
const emit = defineEmits<{
  columnSelect: [indexes: PointClickEventObject]
}>()

const handleColumnClick = (event: PointClickEventObject) => {
  emit('columnSelect', event)
}

const chartOptions = computed<Options>(() => {
  const items = props.data?.item ?? []
  const currency = props.data?.Currency ?? ''
  const categories = items.map((d) => new Date(d.date).toLocaleDateString())

  const plotBands = props.selectedColumnIndexes.map((index) => ({
    from: index - 0.5,
    to: index + 0.5,
    color: 'rgba(211,211,211,0.3)',
    zIndex: 1,
  }))

  const series = [
    {
      type: 'column',
      name: 'Profit',
      data: items.map((d, index) => {
        return {
          x: index,
          y: d.profit,
          selected: props.selectedColumnIndexes.includes(index),
        }
      }),
    },
    {
      type: 'column',
      name: 'FBA Sales',
      data: items.map((d, index) => {
        return {
          x: index,
          y: d.fbaAmount,
          selected: props.selectedColumnIndexes.includes(index),
        }
      }),
    },
    {
      type: 'column',
      name: 'FBM Sales',
      data: items.map((d, index) => {
        return {
          x: index,
          y: d.fbmAmount,
          selected: props.selectedColumnIndexes.includes(index),
        }
      }),
    },
  ]

  return {
    chart: {
      type: 'column',
      height: 400,
    },
    credits: {
      enabled: false,
    },
    lang: {
      thousandsSep: ',',
    },
    title: {
      text: '',
    },
    xAxis: {
      plotBands: plotBands,
      categories: categories,
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: `Amount (${currency})`,
      },
      stackLabels: {
        enabled: true,
      },
    },
    tooltip: {
      formatter: function () {
        const currentData = items[this.index]
        const total = currentData.fbaAmount + currentData.fbmAmount
        return `
        <span>Total Sales: <b>${total}</b></span>
        <span>Shipping: <b>${currentData.shippingAmount}</b></span>
        <span>Profit: <b>${currentData.profit}</b></span>
        <span>FBA Sales: <b>${currentData.fbaAmount}</b></span>
        <span>FBM Sales: <b>${currentData.fbmAmount}</b></span>
        `
      },
    },
    plotOptions: {
      series: {
        allowPointSelect: true,

        point: {
          events: {
            click: handleColumnClick,
          },
        },
        states: {
          inactive: {
            enabled: false,
          },
          select: {
            color: '#FFD700',
            borderColor: '#333',
            borderWidth: 2,
            backgroundColor: '#FFD700',
          },
        },
      },
      column: {
        stacking: 'overlap',
        dataLabels: {
          enabled: true,
          format: '{point.y:,.0f}',
        },
      },
    },
    series: series,
  } as Options
})
</script>

<template>
  <Chart :options="chartOptions" />
</template>
