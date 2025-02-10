<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue'
  import type { User } from '@/types/User'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  const props = defineProps<{
    user: User | null
    showModal: boolean
  }>()

  const emit = defineEmits(['close'])

  const formattedDob = computed(() => {
    return props.user?.dob.date
      ? new Date(props.user.dob.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'N/A'
  })
</script>

<template>
  <div v-if="showModal" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <!-- Close Button -->
      <button class="close-btn" @click="emit('close')">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>

      <!-- Modal Header -->
      <div class="modal-header">
        <img :src="user?.picture.large" alt="User Picture" class="profile-img" />
        <h2>{{ user?.name.title }}. {{ user?.name.first }} {{ user?.name.last }}</h2>
        <p class="user-username">@{{ user?.login.username }}</p>
      </div>

      <!-- Modal Sections -->
      <div class="modal-body">
        <!-- Profile Section -->
        <div class="user-section">
          <h4>Profile</h4>
          <p><strong>Gender:</strong> {{ user?.gender }}</p>
          <p>
            <strong>Date of Birth:</strong>
            {{ formattedDob }}
          </p>
          <p><strong>Age:</strong> {{ user?.dob.age }} years old</p>
          <p><strong>Nationality:</strong> {{ user?.nat }}</p>
        </div>

        <!-- Contact Section -->
        <div class="user-section">
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <p><strong>Phone:</strong> {{ user?.phone }}</p>
          <p><strong>Cell:</strong> {{ user?.cell }}</p>
        </div>

        <!-- Location Section -->
        <div class="user-section">
          <h4>Location</h4>
          <p>
            <strong>Address:</strong> {{ user?.location.street.number }}
            {{ user?.location.street.name }}
          </p>
          <p><strong>City:</strong> {{ user?.location.city }}</p>
          <p><strong>State:</strong> {{ user?.location.state }}</p>
          <p><strong>Country:</strong> {{ user?.location.country }}</p>
          <p><strong>Postcode:</strong> {{ user?.location.postcode }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  /* Modal Content */
  .modal-content {
    background: white;
    padding: 25px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    text-align: left;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-in-out;
  }

  /* Close Button */
  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #ff5b5b;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: transform 0.2s ease-in-out;
  }

  .close-btn:hover {
    transform: scale(1.2);
  }

  /* Modal Header */
  .modal-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    border: 3px solid #007bff;
  }

  .user-username {
    font-size: 14px;
    color: #555;
  }

  /* Modal Body */
  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* User Sections */
  .user-section {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }

  .user-section h4 {
    margin-bottom: 5px;
    color: #007bff;
    font-size: 16px;
  }
</style>
