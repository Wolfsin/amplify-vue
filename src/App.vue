<script setup lang="ts">
import TodoList from './components/TodoList.vue'
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ signOut }">
        <TodoList />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
