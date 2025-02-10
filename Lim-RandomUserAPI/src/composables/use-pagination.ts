import { ref, computed, watch } from 'vue'

export function usePagination<T>(itemsGetter: () => T[], itemsPerPage = 10) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(itemsGetter().length / itemsPerPage))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return itemsGetter().slice(start, end)
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  watch(itemsGetter, () => {
    currentPage.value = 1
  })

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
  }
}
