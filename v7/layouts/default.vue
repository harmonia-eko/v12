<template>
  <v-app dark app>
    <v-app-bar fixed app>
      <v-container class="d-flex align-center">
        <img src="/logo.png" alt="" height="80px" @click="$router.push('/')" />
        <!-- <v-img src="/logo.png" width="30" height="25" contain></v-img> -->
        <v-spacer />
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main app>
      <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-title>Panier</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <div class="w-100 d-flex flex-column flex-md-row align-center">
        <div>
          <img src="/logo.png" alt="" height="160px" />
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon>
            <v-icon x-large>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon x-large>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon x-large>mdi-instagram</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="w-100 d-flex justify-center mt-3">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    fluid: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
