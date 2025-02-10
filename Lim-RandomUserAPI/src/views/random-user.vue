<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useFetch } from '@/composables/use-fetch'
  import { usePagination } from '@/composables/use-pagination'
  import { useFilter } from '@/composables/use-filter'
  import UserModal from '../components/UserModal.vue'
  import PaginationControls from '../components/PaginationControls.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import type { User } from '@/types/User'

  const selectedUser = ref<User | null>(null)
  const showModal = ref(false)

  //Fetch API
  const { users, fetchUsers, loading, totalResults } = useFetch()

  // Gender Filter
  const { selectedGender, filteredUsers } = useFilter(users)

  // Pagination
  const { currentPage, totalPages, paginatedItems, nextPage, prevPage } = usePagination(
    () => filteredUsers.value,
    10,
  )

  const refreshUsers = () => {
    fetchUsers(currentPage.value, totalResults.value, true, selectedGender.value)
  }

  // Modal functions
  const openModal = (user: User) => {
    selectedUser.value = user
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    selectedUser.value = null
  }

  onMounted(() => {
    fetchUsers(1, totalResults.value, false, selectedGender.value)
  })
</script>

<template>
  <div class="container">
    <h2>Random User List</h2>
    <div class="user-actions">
      <div class="gender-filter">
        <label>Filter by Gender:</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="selectedGender" value="all" />
            All
          </label>
          <label>
            <input type="radio" v-model="selectedGender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" v-model="selectedGender" value="female" />
            Female
          </label>
        </div>
      </div>
      <button class="refresh-btn" @click="refreshUsers">
        <font-awesome-icon :icon="['fas', 'sync-alt']" /> Refresh
      </button>
    </div>

    <!-- User Grid -->
    <div class="user-container">
      <ul class="user-list">
        <li v-for="user in paginatedItems" :key="user.login.uuid" class="user-card">
          <img :src="user.picture.large" alt="User Picture" />
          <p>{{ user.name.first }} {{ user.name.last }}</p>
          <button @click="openModal(user)">View Details</button>
        </li>
      </ul>
    </div>

    <!-- Pagination Component -->
    <PaginationControls
      :currentPage="currentPage"
      :totalPages="totalPages"
      :loading="loading"
      @next="nextPage"
      @prev="prevPage"
    />

    <!-- User Modal -->
    <UserModal :user="selectedUser" :showModal="showModal" @close="closeModal" />
  </div>
</template>

<style scoped>
  .container {
    max-width: 1200px;
    margin: 20px auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 90%;
    width: 90%;
  }

  h2 {
    font-weight: bold;
    font-family: sans-serif;
  }

  /*Controls*/
  .user-actions {
    display: flex;
    border-bottom: 1px solid black;
    align-items: center;
    justify-content: space-between;
  }

  .gender-filter {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .radio-group {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }

  .radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .radio-group input[type='radio'] {
    transform: scale(1.2);
  }

  .refresh-btn {
    margin-top: 10px;
    padding: 5px 12px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
  }

  .refresh-btn:hover {
    background-color: #0056b3;
  }

  /*User Container*/
  .user-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 10px;
    justify-content: center;
    padding: 10px;
    height: 75%;
  }

  .user-list {
    display: contents;
  }

  .user-card {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s ease-in-out;
  }

  .user-card:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .user-card img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-card p {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 5px;
  }

  button:hover {
    background: #0056b3;
  }
</style>
