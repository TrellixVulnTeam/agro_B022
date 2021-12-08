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

      <v-list nav>
        <v-list-item link @click="$router.push('/')">
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$router.push('/documents')">
          <v-list-item-title>Документы</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$router.push('/reports')">
          <v-list-item-title>Отчеты</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$router.push('/exploration')">
          <v-list-item-title>Исследования</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-content @click="$router.push(item.link)">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            link
            v-for="child in item.items"
            :key="child.title"
            @click="$router.push(child.link)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <v-list
          nav
        >
          <v-list-item
            @click="logOut()"
          >
            <v-list-item-content>
              <v-list-item-title>
                Выход
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-app-bar app color="white theme-elevation">
      <!-- <v-container id="input-usage" fluid>
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
      </v-container> -->
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
        items: [
          {
            title: 'Справочники',
            link: '/catalog',
            // active: true,
            items: [
              { title: 'Показатели исследований', link: '/researches'},
              { title: 'Контрагенты', link: '/contractors'},
              { title: 'Продукция', link: '/products'}
            ],
          },
          {
            title: 'Организация',
            link: '/organization',
            items: [
              { title: 'Сведения об организации', link: '/organizationinfo'},
              { title: 'Структура сада', link: '/quarters/1'},
              { title: 'Склады', link: '/warehouses'},
              { title: 'Сотрудники/пользователи', link: '#'},
            ],
          }
        ],
        searchQuery: '',
        right: null,
        user_email: localStorage.getItem("user_email"),
        user_name: localStorage.getItem("user_name")
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>

<style lang="scss">
  .v-toolbar.v-app-bar {
    height: 82px !important;
  }
  .v-main {
    padding-top: 82px !important;
  }
  .bottom-nav {
    border-top: 2px solid #F1F1F1;
  }
  .v-list--nav {
    padding: 0 !important;
    .v-list-item {
      margin: 0 !important;
      padding: 10px 20px !important;
      border-radius: 0 !important;
      border-bottom: 2px solid #F1F1F1;
      color: #000000;
      font-size: 18px;
      text-decoration: none;
      line-height: 24px;
      font-weight: normal;
    }
    .v-list-group__items {
      .v-list-item {
        padding-left: 40px !important;
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