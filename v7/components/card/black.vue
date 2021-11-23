<template>
  <v-card
    class="black-card"
    href="https://footprint.wwf.org.uk/#/"
    target="_blank"
  >
    <div class="content">
      <v-icon class="ticon">mdi-pencil-ruler</v-icon>
      <p class="text">WWF UK CARBON FOORPRINT CALCULATOR</p>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.black-card {
  $side: 370px;
  padding: 2%;
  background: #000;
  height: $side;
  width: $side;
  * {
    color: #fff;
  }

  &:hover {
    cursor: pointer;
    background: var(--primary);
    * {
      color: #000;
      font-weight: bold;
    }
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ticon {
      font-size: 3.5rem;
    }
    .text {
      margin-top: 20px;
    }
  }
}
</style>