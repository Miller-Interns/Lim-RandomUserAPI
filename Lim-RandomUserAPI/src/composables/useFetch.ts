import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

export function useFetch() {
  const userStore = useUserStore()

  const fetchUsers = async (refresh: boolean = false) => {
    if (!refresh && userStore.users.length > 0) {
      return
    }

    try {
      userStore.loading = true
      if (refresh) {
        userStore.users = []
      }

      const response = await fetch(`https://randomuser.me/api/?results=${userStore.totalResults}`)
      const data = await response.json()

      if (data.results) {
        userStore.users = data.results
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      userStore.loading = false
    }
  }

  return {
    users: computed(() => userStore.users),
    fetchUsers,
    loading: computed(() => userStore.loading),
  }
}
