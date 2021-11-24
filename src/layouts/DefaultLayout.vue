<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list class="theme-elevation">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/11.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user_name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user_email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in links"
          :key="item.title"
          @click="$router.push(item.link)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <span>
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white theme-elevation">
      <v-container id="input-usage" fluid>
        <v-row>
          <v-col cols="11">
            <v-text-field
              class="searchBar"
              v-model="searchQuery"
              placeholder="Поиск..."
              prepend-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-8">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data () {
      return {
        searchQuery: '',
        links: [
          { title: 'Главная', link: '/' },
          { title: 'Продукция', link: '/products' },
          { title: 'Склады', link: '/warehouses' },
          { title: 'Сады', link: '/quarters' },
          { title: 'Приемки', link: '/acceptances' },
          { title: 'Исследования', link: '/researches' }
        ],
        right: null,
        user_email: localStorage.getItem("user_email"),
        user_name: localStorage.getItem("user_name")
      }
    },
  }
</script>

<style lang="scss">
  .v-toolbar.v-app-bar {
    height: 82px !important;
  }
  .v-main {
    padding-top: 82px !important;
  }
  .v-list--nav {
    padding: 0 !important;
    .v-list-item {
      margin: 0 !important;
      padding: 10px 20px !important;
      border-radius: 0 !important;
      border-bottom: 2px solid #F1F1F1;
      span {
        color: #000000;
        font-size: 18px;
        text-decoration: none;
        line-height: 24px;
        font-weight: normal;
      }
    }
  }
  .searchBar {
    padding-top: 34px !important;
    .v-input__slot:before {
      border: 0 !important;
    }
  }
</style>