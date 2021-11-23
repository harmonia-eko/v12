<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 2 : 0">
      <div class="text-center px-xl-4 pb-5" max-width="100">
        <v-img height="150" :src="image" width="300" contain></v-img>
        <h2 v-text="title"></h2>
        <p class="mt-4" v-text="body"></p>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['image', 'body', 'title'],
})
</script>

<style scoped>
</style>