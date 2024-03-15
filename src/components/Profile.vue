<script lang="ts" setup>
import {  ref } from 'vue';
import axios from 'axios';

  axios.get('api/auth', {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then((response) => { 
      userInfo.value = response.data
      
  })


const userInfo = ref({
  photo: '',
  quote: '',
  username: ''
})
const emit = defineEmits(['show-profile']);
const resetToken = () => { 
  localStorage.setItem('token', '');
  emit('show-profile', false);
}

</script>

<template>
  <figure class="profile">
    <img class="profile-photo" :src="userInfo.photo" alt="" width="300" height="512">
    <div class="profile-details">
      <blockquote>
        <p class="profile-quote font-medium">
          {{ userInfo.quote }}
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-sky-500">
          {{ userInfo.username }}
        </div>
      </figcaption>
    </div>
  </figure>
    <div class="right">
      <button @click="resetToken">Logout</button>
    </div>
</template>

<style scoped>
.profile {
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-color: #3b82f680;
  --tw-bg-opacity: 1;
  display: flex;
  overflow: hidden;
  padding: 0;
  justify-content: center;
  border-radius: 0.75rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  --un-bg-opacity: 1;
  background-color:rgb(30 41 59/var(--tw-bg-opacity));
}
.right {
  display: flex;
  flex-direction: row-reverse;
}

.profile-photo {
  border-radius: 0;
  width: 12rem;
  height: auto;
}

.profile-details {
  margin-top: 1rem;
  padding: 2rem;
  text-align: left;
}
.font-medium {
  font-weight: 500;
}
.profile-quote {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sky-500 {
  --un-text-opacity: 1;
  color: rgba(14, 165, 233, var(--un-text-opacity));
}

</style>
