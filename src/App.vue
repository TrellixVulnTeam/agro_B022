<template>
  <v-app>
    <alerts></alerts>
    <v-navigation-drawer app>
      <v-app-bar>
        app-bar
      </v-app-bar>
      navigation-drawer
    </v-navigation-drawer>

    <v-app-bar app>
      app-bar
    </v-app-bar>

    <v-main>

      MAIN

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      Footer
    </v-footer>
  </v-app>
</template>

<script>
const alerts = () => import('@/components/alerts')
export default {
  name: 'App',
  components: {
    alerts
  },
  data: () => ({
    //
  }),
};
</script>
