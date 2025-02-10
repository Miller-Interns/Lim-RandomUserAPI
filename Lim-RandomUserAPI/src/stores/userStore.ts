import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import type { User } from '@/types/User'

export const useUserStore = defineStore('userStore', () => {
  // State
  const users = ref<User[]>([])
  const totalResults = ref<number>(50)
  const loading = ref<boolean>(false)

  // Load users from localStorage on initialization
  const fetchData = () => {
    try {
      const storedUsers = localStorage.getItem('randomUsers')
      if (storedUsers) {
        users.value = JSON.parse(storedUsers) as User[]
      }
    } catch (error) {
      console.error('Failed to load users from localStorage:', error)
    }
  }

  onMounted(() => {
    users.value = []
    localStorage.removeItem('randomUsers')
  })

  fetchData()

  watch(
    () => users.value,
    (newUsers) => {
      localStorage.setItem('randomUsers', JSON.stringify(newUsers))
    },
    { deep: true },
  )

  return {
    users,
    totalResults,
    loading,
  }
})
