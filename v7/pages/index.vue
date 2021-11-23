<template>
  <div>
    <section class="first">
      <div
        class="
          white--text
          my-jumbo
          d-flex
          flex-column
          justify-center
          align-center
          offset-md-2
          col-md-8
        "
        style="min-height: 600px"
      >
        <div>
          <h1 class="mx-md-10">
            The smartest CO2 offset marketplace
          </h1>
          <p>
            We do CO2e offsets.Your way.<br/><br/>

You can mitigate the climate crisis from your garage, backyard or even fingertips? Sell yours.      </p>
          <my-input
            placeholder="Recherche par numéro de projet, industrie ou bénéfices"
          >
            <template #prepend>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    large
                    text
                    dark
                    v-bind="attrs"
                    v-on="on"
                    style="border-right: 1px solid"
                  >
                    Europe
                    <v-icon> mdi-chevron-down </v-icon>
                    <!-- <v-icon v-else>mdi-chevron-up</v-icon> -->
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in ['name', 'label', 'router-link']"
                    :key="index"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template #append>
              <v-btn color="primary" rounded large>Search</v-btn>
            </template>
          </my-input>
        </div>
      </div>
    </section>
    <section>
      <h2 class="my-title">Our Focus</h2>

      <div class="row">
        <div class="offset-md-2 col-md-8">
          <div class="row">
            <div class="col-md-4" v-for="(f, i) in focus" :key="'tt-' + i">
              <card-focus
                :image="f.image"
                :body="f.body"
                :title="f.title"
              ></card-focus>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="offset-md-2 col-md-8">
        <h2 class="my-title">Built with</h2>
        <div class="w-100 d-flex mb-3">
          <v-hover v-slot="{ hover }" v-for="i in 5" :key="'zzz' + i">
            <v-card
              :elevation="hover ? 2 : 0"
              class="w-20 d-flex justify-center align-center"
              style="height: 150px"
            >
              <v-img :src="require('~/assets/logos/sol.png')" max-width="80px"/>
            </v-card>
          </v-hover>
        </div>
        <div class="d-flex justify-end">
          <a href="#">See all></a>
        </div>
      </div>
    </section>
    <section>
      <h2 class="my-title">Latest Projects</h2>
      <div class="offset-md-2 col-md-10">
        <div>
          <new-projects style="display:flex"></new-projects>
        </div>
        <div class="w-100 d-flex justify-space-between align-center">
          <v-btn color="primary" rounded large :to="{ name: 'projects' }"
            >All projects</v-btn>
          >
          <div>
            <v-btn outlined icon class="my-button-prev"
              ><v-icon>mdi-arrow-left </v-icon></v-btn
            >
            <v-btn icon outlined class="my-button-next"
              ><v-icon>mdi-arrow-right</v-icon></v-btn
            >
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="my-title">Offseters Tell You</h2>
      <div class="offset-md-2 col-md-8">
        <div class="row">
          <div class="col-md-4" v-for="i in 3" :key="'cleint' + i">
            <card-customer></card-customer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'fixed',
  data() {
    return {
      focus: [
        {
          image: '/own-forest.png',
          title: 'Safety',
          body: 'We aim to promote a wide range of offsets, including mild geo-engineering.',
        },
        {
          image: '/carbon-footprint.png',
          body: '',
          title: 'Decentralization and Automation',
        },
        {
          image: '/carbon-pollution.png',
          body: "Rewards are always meaningful, as proof of gratitude and care.", 
          title: 'User Experience and Reward',
        },
      ],
    }
  },
})
</script>


<style lang="scss" scoped>
.my-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 25px;
}

.first {
  width: 100%;
  background: url("@/../assets/images/river-surrounded-by-forests-cloudy-sky-thuringia-germany.png");
  background-size: cover;
  margin-top: 0 !important;
}
.my-jumbo {
  text-align: center;

  p,
  h1 {
    text-shadow: 1px 1px 2px #000;
  }
  h1 {
    font-size: 3.2em;
    line-height: 1.2em;
  }

  p {
    font-size: 1.2em;
    margin: 30px 0;
  }
}
</style>