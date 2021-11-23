<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5">
    <template #no-data>
      <h5>There are no credits.</h5>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: 'Date', value: 'carbs' },
        {
          text: 'Vintage',
          value: 'calories',
          sortable: true,
        },
        { text: 'Serial number', value: 'fat' },
        { text: 'Quantity', value: 'ssa', sortable: true },
        { text: 'Product', value: 'carbs' },
        { text: 'Status', value: 'ss' },
        { text: 'Notes', value: 'protein' },
        { text: 'Actions', value: 'iron' },
      ],
      items: [],
    }
  },
})
</script>

<style scoped>
</style>