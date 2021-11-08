<template>
  <v-app>
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
  export default {
    name: 'DefaultLayout'
  }
</script>