<template>
  <div>
    <v-row>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <v-select
          :items="['name', 'description', 'active', 'action']"
          label="Filtrer"
        ></v-select>
      </div>
    </v-row>
    <v-row>
      <div class="col-md-4 col-xl-3" v-for="(item, i) in itemsToShow" :key="i">
        <card-project></card-project>
      </div>
    </v-row>
    <div class="w-100 text-center mt-4">
      <v-pagination
        v-model="page"
        :length="paginationLength"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_) {
    const { app } = useContext()

    // console.log(vuetify.breakpoint.name)

    const items = new Array(30)

    const page = ref(1)

    const perPage = computed(() => {
      switch (app.vuetify.framework.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 4
        case 'lg':
          return 6
        default:
          return 8
      }
    })

    const paginationLength = computed(() =>
      Math.round(items.length / perPage.value)
    )

    const itemsToShow = computed(() =>
      items.slice((page.value - 1) * perPage.value, perPage.value * page.value)
    )

    return {
      page,
      paginationLength,
      itemsToShow,
    }
  },
})
</script>

<style scoped>
</style>