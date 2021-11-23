<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5">
    <template #no-data>
      <h5>There are no issuances.</h5>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      headers: [
        {
          text: 'Vintage',
          value: 'calories',
          sortable: true,
        },
        { text: 'Quantity', value: 'fat', sortable: true },
        { text: 'Product', value: 'carbs' },
        { text: 'Insuance Dates', value: 'protein', sortable: true },
        { text: 'Actions', value: 'iron' },
      ],
      items: [],
    }
  },
})
</script>

<style scoped>
</style>