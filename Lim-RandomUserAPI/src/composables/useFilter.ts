import { computed, ref, watch } from 'vue'
import { GenderFilter } from '@/enums/GenderFilter'
import type { User } from '@/types/User'
import { useUserStore } from '@/stores/userStore'
import { useFetch } from '@/composables/useFetch'

export function useFilter(users: { value: User[] }) {
  const selectedGender = ref<GenderFilter>(GenderFilter.ALL)
  const userStore = useUserStore()
  const { fetchUsers } = useFetch()

  const filteredUsers = computed(() => {
    if (selectedGender.value === GenderFilter.ALL) {
      return users.value
    }
    return users.value.filter((user: User) => user.gender === selectedGender.value)
  })

  watch(selectedGender, () => {
    localStorage.removeItem('randomUsers')
    userStore.users = []
    userStore.loading = true
    fetchUsers(true, selectedGender.value)
  })

  return { selectedGender, filteredUsers, loading: computed(() => userStore.loading) }
}
