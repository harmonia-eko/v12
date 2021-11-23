<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 2 : 0" class="customer-card">
      <v-icon color="primary" class="customer-icon"
        >mdi-format-quote-open</v-icon
      >
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
        corrupti hic asperiores at consectetur, aperiam
      </p>
      <div class="d-flex">
        <div>
          <v-avatar class="mr-3">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div>
          <h4>JOHN DOE</h4>
          <p>Responsable</p>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.customer-card {
  padding: 10px;
  .customer-icon {
    font-size: 3.5em;
  }
}
</style>