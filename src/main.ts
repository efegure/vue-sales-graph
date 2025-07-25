import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import Highcharts from 'highcharts'

Highcharts.setOptions({
  // This lang object provides the necessary context for number formatting.
  lang: {
    thousandsSep: ',',
    decimalPoint: '.',
    numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
  },
})

const app = createApp(App)

app.use(router)
app.use(store, key)

// for router guard
app.provide('store', store)

app.mount('#app')
