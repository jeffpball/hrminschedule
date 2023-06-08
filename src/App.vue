<script setup>
  import { Authenticator } from '@aws-amplify/ui-vue';
  import '@aws-amplify/ui-vue/styles.css';
  import ToDo from './components/ToDo.vue'
</script>

<template>
<div id="app">
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Account: {{ user.attributes.email }}</h1>
      <button @click="signOut">Sign Out</button>
      <ToDo></ToDo>
    </template>
  </authenticator>
    </div>
</template>
