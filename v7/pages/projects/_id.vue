<template>
  <v-container class="pt-5">
    <section>
      <v-parallax
        height="250"
        width="100%"
        class="d-flex align-center pl-8"
        src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        lazy-src="/logo.png"
      >
        <h1 class="white--text">Project title here</h1>
      </v-parallax>
    </section>

    <section>
      <div class="row">
        <div class="col-md-2 col-lg-3">
          <div class="d-flex flex-md-column flex-lg-row">
            <div class="col">
              <h4>GS ID</h4>
              <p>11256</p>
            </div>
            <div class="col">
              <h4>REGION</h4>
              <p>11256</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="product-box">
            <h4>PRODUCT</h4>
            <div class="row">
              <div class="col-4">
                <v-icon>mdi-cube</v-icon>
                <p>NONE</p>
              </div>
              <div class="col-4">
                <v-icon color="primary">mdi-pound</v-icon>
                <p>ISSUED</p>
              </div>
              <div class="col-4">
                <v-icon color="primary">mdi-pound</v-icon>
                <p>RETIRED</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5">
          <div class="row">
            <div class="col-md-4">
              <h4>PLANNED SDG IMPACTS</h4>
              <div class="row mt-5">
                <div
                  class="col-4 col-md-6 d-flex justify-center"
                  v-for="i in 3"
                  :key="i"
                >
                  <card-little></card-little>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 d-flex flex-column align-center">
              <h4>PROJECT TYPE</h4>
              <v-icon class="myicon">mdi-weather-sunny</v-icon>
              <p>Geothermal</p>
            </div>
            <div class="col-6 col-md-4 d-flex flex-column align-center">
              <h4>STATUS</h4>
              <v-icon class="myicon">mdi-weather-sunny</v-icon>
              <p>Listed</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <table-project-infos></table-project-infos>
        </div>
        <div class="col-md-4">
          <h3>Description</h3>
          <p class="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
            Lorem ipsum dolor sit amet, consectetur adipiscing el effective.

              Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
              Lorem ipsum dolor sit amet, consectetur adipiscing el effective.
              Lorem ipsum dolor sit amet, consectetur adipiscing el effective!
        
        
          </p>
        </div>
      </div>
    </section>
    <section>
      <h2 class="section-title">ISSUANCE LIST</h2>
      <table-insuance></table-insuance>
    </section>
    <section>
      <h2 class="section-title">CERTIFICATION DOCUMENTS</h2>
      <a v-if="$vuetify.breakpoint.name == 'xs'"
        >VIEW CERTIFICATION DOCUMENTS</a
      >
      <v-btn color="primary" outlined x-large v-else
        >VIEW CERTIFICATION DOCUMENTS</v-btn
      >
    </section>
    <section>
      <h2 class="section-title">RETIREMENTS</h2>
      <table-retirements></table-retirements>
    </section>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style scoped lang="scss">
.myicon {
  font-size: 3em;
  margin-top: 20px;
  margin-bottom: 20px;
}
.product-box {
  .col-4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .v-icon {
    font-size: 2em;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>