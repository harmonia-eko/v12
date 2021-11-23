<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 2 : 0">
      <div class="text-center px-xl-4 pb-5">
        <v-img
          height="150"
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        ></v-img>
        <h2>Lorem ipsum dolor sit amet consectetur</h2>
        <p class="mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus est
          nam quisquam voluptas sint nostrum facilis minima praesentium
          voluptatem totam necessitatibus sapiente, deserunt sit voluptatibus
          illum qui id ipsum molestias?
        </p>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
</style>