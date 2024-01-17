<script setup lang="ts">
import { RouterView } from 'vue-router'

import Header from '@/components/Header.vue';

import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

// Auth check
</script>

<template>
  <Header />
  <RouterView />
</template>
