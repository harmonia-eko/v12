<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3">
        <!-- <q-select
          v-model="model"
          :options="['name', 'description', 'active', 'action']"
          label="Filtrer"
        ></q-select> -->

        <!-- <q-select filled v-model="model" :options="options" label="Filled" /> -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-xl-3" v-for="(item, i) in itemsToShow" :key="i">
        <card-project :item="item"></card-project>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="page" :max="paginationLength" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
} from "vue";
import CardProject from "@/components/card/Project.vue";

import { AxiosInstance } from "axios";
import { initWallet, useWallet } from "@solana/wallet-adapter-vue";
import { getPhantomWallet, WalletName } from "@solana/wallet-adapter-wallets";
export default defineComponent({
  components: {
    CardProject,
  },
  setup() {
    const axios = inject("axios") as AxiosInstance;

    const state = reactive({
      items: [],
      page: 1,
    });

    onBeforeMount(async () => {
      const { data } = await axios.get("projects");
      state.items = data;
      const wallets = [getPhantomWallet()];
      initWallet({ wallets, autoConnect: true });
      const { select } = useWallet();
      select(WalletName.Phantom);
    })

    const perPage = computed(() => {
      return 5;
      // switch (app.vuetify.framework.breakpoint.name) {
      //   case "xs":
      //   case "sm":
      //     return 4;
      //   case "lg":
      //     return 6;
      //   default:
      //     return 8;
      // }
    });

    const paginationLength = computed(() =>
      Math.round(state.items.length / perPage.value)
    );

    const itemsToShow = computed(() =>
      state.items.slice(
        (state.page - 1) * perPage.value,
        perPage.value * state.page
      )
    );

    const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

    return {
      options,
      paginationLength,
      itemsToShow,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
</style>