<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import type { AccessTokenResponse } from '@/types/api/oauth'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
const { dispatch } = useStore()

const router = useRouter()

const email = ref('')
const password = ref('')
const displayError = ref(false)
const loading = ref(false)

const login = () => {
  console.log(email.value, password.value)
  if (email.value.length === 0 || password.value.length === 0) {
    displayError.value = true
    return
  }
  displayError.value = false
  loading.value = true
  dispatch('login', {
    email: email.value,
    password: password.value,
  })
    .then((resp: AccessTokenResponse) => {
      if (resp.ApiStatusCode === 200) {
        console.log('correct!', resp)
        router.push('/chart')
      } else {
        console.log('wrong!', resp)
        displayError.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<template>
  <div class="mx-8 my-12 h-full">
    <div class="flex flex-col justify-center items-center h-full w-full gap-8">
      <h1 class="text-3xl font-bold">Login page</h1>

      <form class="flex flex-col gap-4 max-w-[400px] mx-auto w-full" @submit.prevent="login">
        <div class="flex flex-col gap-1">
          <input
            v-model="email"
            class="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Email"
          />
          <span class="text-red-500" v-if="email.length === 0">Email is required</span>
        </div>
        <div class="flex flex-col gap-1">
          <input
            v-model="password"
            class="p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
          />
          <span class="text-red-500" v-if="password.length === 0">Password is required</span>
        </div>
        <div class="flex flex-col gap-1">
          <button
            class="p-2 px-4 bg-blue-500 text-white rounded cursor-pointer flex flex-row items-center gap-1"
            type="submit"
            :disabled="loading"
          >
            <LoadingSpinner v-if="loading" />
            <span>{{ loading ? 'Loading...' : 'Login' }}</span>
          </button>
          <span class="text-red-500" v-if="displayError">Invalid email or password</span>
        </div>
      </form>
    </div>
  </div>
</template>
