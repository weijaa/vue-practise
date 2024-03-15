<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import { ref, onMounted } from 'vue'
onMounted(async () => {
  document.documentElement.setAttribute('data-theme', 'dark')
  if (localStorage.getItem('token') !== '') { 
    isShowProfile.value = true
  }
});

const isShowProfile = ref<boolean>(false);
const showProfile = (bool: boolean) => { 
  isShowProfile.value = bool
}
</script>

<template>
  <Profile v-if="isShowProfile"  @show-profile="showProfile"/>
  <OtpVerify v-else @show-profile="showProfile" />
</template>
