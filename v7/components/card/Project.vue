<template>
  <v-card class="project-card" :elevation="elevation" max-width="500">
    <v-hover>
      <template v-slot:default="{ hover }">
        <div>
          <v-img
            :src="'https://picsum.photos/200/300'"
            lazy-src="/logo.png"
            height="300"
            max-width="450"
          >
            <v-badge
              inline
              content="$10.00 USD/TONNE"
              class="price"
              color="#000"
            ></v-badge>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#000">
                <v-btn :to="{ name: 'projects-id', params: { id: 1 } }"
                  >See more info</v-btn
                >
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </div>
      </template>
    </v-hover>
    <v-card-title class="primary--text">
      Adavikanda, Kuruwita Division Mini Hydro Power Project
    </v-card-title>
    <div style="padding: 0 16px">
      Travel to the best outdoor experience on planet Earth. A vacation you will
      never forget!
    </div>
    <v-card-actions v-if="!presentation">
      <div class="d-flex align-center w-100">
        <div class="col-md-3">
          <v-text-field class="my-input" outlined value="1"></v-text-field>
        </div>
        <div class="col-md-9">
          <v-btn block color="primary">Acheter</v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    elevation: {
      type: Number,
      default: 0,
    },
    presentation: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.project-card {
  padding-bottom: 15px;
  .my-input {
    .v-messages,
    .v-text-field__details {
      display: none;
    }

    .v-input__slot {
      margin-bottom: 0 !important;
      min-height: 0 !important;
    }
  }

  .price {
    position: absolute;
    right: 12px;
    top: 13px;

    * {
      height: auto !important;
      font-size: 1em !important;
    }
  }
}
</style>