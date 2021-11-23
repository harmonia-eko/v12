<template>
  <div>
    <section>
      <jumbotron></jumbotron>
    </section>
    <v-container>
      <div class="d-flex align-center mb-8">
        <div class="col-md-5 calculator">
          <h2 class="title primary--text">
            HOW BIG IS YOUR ENVIRONMENTAL FOOTPRINT?
          </h2>
          <h3 class="subtitle">
            The planet is in crisis - from climate change to the pollution in
            our oceans and devastation of our forests. It's up to all of us to
            fix it. Take your first step with our environmental footprint
            calculator.
          </h3>
          <a
            v-show="isMobile"
            href="https://footprint.wwf.org.uk/#/"
            target="_blank"
            class="primary--text"
            >WWF UK CARBON FOORPRINT CALCULATOR</a
          >
        </div>
        <div class="col" v-show="!isMobile">
          <div class="d-md-flex justify-end">
            <card-black></card-black>
          </div>
        </div>
      </div>
      <grid-projects></grid-projects>
      <section class="mt-6">
        <h3 class="section-title">FEATURE YOUR PROJECT</h3>
        <p class="mt-md-10 mb-10">
          If you have a project that you would like to
          include on this page, please read our
          <a href="#">Terms & Conditions>></a>, fill in this
          <a href="#">project profile template>></a> and provide it to
          <a href="#"> Make An Impact>></a> along with at least three
          high-resolution images and your logo. If you would like to sell
          credits through our Project Marketplace, please email
          <a href="#">Make An Impact>></a>
          for more details.
        </p>
      </section>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    isMobile() {
      // @ts-ignore
      return ['xs', 'sm'].includes(this.$vuetify.breakpoint.name)
    },
  },
})
</script>

<style scoped lang="scss">
.calculator {
  .title {
    font-size: 2.2rem !important;
    line-height: 50px;
  }

  .subtitle {
    margin-top: 15px;
    font-size: 1.3em;
  }
}
</style>