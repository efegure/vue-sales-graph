<script setup lang="ts">
import { Chart } from 'highcharts-vue'
import { type Options, type PointClickEventObject } from 'highcharts'
import { computed, ref } from 'vue'
import type { DailySalesOverviewResponse } from '@/types/api/sales-analytics'

const selectedColumnIndexes = ref<number[]>([])

const props = defineProps<{
  data: DailySalesOverviewResponse['Data'] | null
}>()
const emit = defineEmits<{
  columnSelect: [indexes: number[]]
}>()

const handleColumnClick = (event: PointClickEventObject) => {
  const columnIndex = event.point.x
  const isSelected = selectedColumnIndexes.value.includes(columnIndex)

  if (isSelected) {
    selectedColumnIndexes.value = selectedColumnIndexes.value.filter((i) => i !== columnIndex)
  } else {
    if (selectedColumnIndexes.value.length < 2) {
      selectedColumnIndexes.value.push(columnIndex)
    } else {
      const newSelections = [...selectedColumnIndexes.value]
      newSelections.shift()
      newSelections.push(columnIndex)
      selectedColumnIndexes.value = newSelections
    }
  }
  emit('columnSelect', selectedColumnIndexes.value)
}

const chartOptions = computed<Options>(() => {
  const items = props.data?.item ?? []
  const currency = props.data?.Currency ?? ''
  const categories = items.map((d) => new Date(d.date).toLocaleDateString())

  const plotBands = selectedColumnIndexes.value.map((index) => ({
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
          selected: selectedColumnIndexes.value.includes(index),
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
          selected: selectedColumnIndexes.value.includes(index),
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
          selected: selectedColumnIndexes.value.includes(index),
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
        // debugger
        const currentData = items[this.index]
        const total = currentData.fbaAmount + currentData.fbmAmount
        // const point = this.point
        // const seriesName = this.series.name
        return `
        <span>Total Sales: <b>${total}</b></span>
        <span>Shipping: <b>${currentData.shippingAmount}</b></span>
        <span>Profit: <b>${currentData.profit}</b></span>
        <span>FBA Sales: <b>${currentData.fbaAmount}</b></span>
        <span>FBM Sales: <b>${currentData.fbmAmount}</b></span>
        `
      },
      //   headerFormat: '<b>{point.x}</b><br/>',
      //   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
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
  <!-- <strong>Selected Column Indexes:</strong> {{ selectedColumnIndexes.join(', ') }} -->
</template>
