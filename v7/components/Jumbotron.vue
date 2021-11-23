<template>
  <v-img
    :src="require('~/assets/images/back.jpg')"
    height="500"
    width="100%"
    class="d-flex align-center"
  >
    <div class="content">
      <h2 class="t1">OFFSET</h2>
      <h2 class="font-weight-medium font-italic">your emissions</h2>
      <h3 class="font-weight-regular mt-8">
        After reducing your climate impact, offsetting is an effective way to
        reduce emissions globally and create sustainable development benefits
        for communities around the world. And why not aim high? Go Climate+
        rather than simply carbon neutral and offset more than your footprint.
      </h3>
    </div>
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.content {
  color: #fff;
  width: 70%;
  margin: 0 auto;

  .t1 {
    font-size: 2em;
  }
  .text {
    margin-top: 30px;
  }
}
</style>