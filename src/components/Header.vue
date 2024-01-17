<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import Logo from '@/assets/img/logo.png';

const authStore = useAuthStore();

const isSubmenuOpen = ref(false);
</script>

<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__brand">
        <img :src="Logo" alt="Logo" class="header__brand-img" />
        <h1 class="hidden">
          jdR Forge
        </h1>
      </router-link>
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li class="header__menu-item">
            <router-link to="/" class="header__menu-link">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </router-link>
          </li>
          <li class="header__menu-item" @mouseover="isSubmenuOpen = true" @mouseleave="isSubmenuOpen = false">
            <a href="#" class="header__menu-link" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </a>
            <div v-if="isSubmenuOpen" class="header__submenu-container">
              <ul v-if="authStore.isAuth" class="header__submenu">
                <li class="header__submenu-item">
                  <router-link to="/profile" class="header__submenu-link">
                    Profile
                  </router-link>
                </li>
                <li class="header__submenu-item">
                  <router-link to="/profile" class="header__submenu-link">
                    Logout
                  </router-link>
                </li>
              </ul>
              <ul v-else class="header__submenu">
                <li class="header__submenu-item">
                  <router-link to="/login" class="header__submenu-link">
                    Login
                  </router-link>
                </li>
                <li class="header__submenu-item">
                  <router-link to="/register" class="header__submenu-link">
                    Register
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #333742;

  .header__container {
    width: 90%;
    max-width: 1200px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0 auto;
    padding: 15px 0;
  }

  .header__brand {
    max-width: 150px;

    img {
      width: 100%;
      height: 100%;

      object-fit: contain;
    }
  }

  .header__menu-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .header__menu-item {
    width: 40px;
    height: 40px;

    position: relative;

    padding: 10px;

    color: #333742;
    background-color: #252a36;

    border: 1px solid #333742;
    border-radius: 50%;

    list-style: none;
  }

  .header__menu-link {
    width: 100%;
    height: 100%;    
  }

  .header__submenu-container {
    min-width: 100px;

    position: absolute;
    top: 100%;
    right: 0;
  }

  .header__submenu {
    display: flex;
    flex-direction: column;

    margin: 10px 0 0 0;

    background-color: #252a36;
    border: 1px solid #333742;
    border-radius: 5px;

    list-style: none;
  }

  .header__submenu-item {
    width: 100%;

    padding: 10px;

    border-bottom: 1px solid #333742;

    &:last-child {
      border-bottom: none;
    }
  }
}

.hidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
</style>
