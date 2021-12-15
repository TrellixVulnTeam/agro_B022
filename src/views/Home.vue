<template>
  <div>
    <h1 class="display-1 mb-4">Главная</h1>

    <v-card
      class="mx-auto dashboard-navigation pa-6"
      elevation="0"
    >
      <v-container fluid>
        <v-row>
          <v-col>
            <h2 class="mb-6">
              <v-icon
                small
                class="mr-1"
                color="blue"
              >
                mdi-format-list-bulleted
              </v-icon>
              Исследования
            </h2>
            <h3 class="mb-2">Последние исследования:</h3>
            <ul class="mb-8">
              <li v-for="item in researches" :key="item.id">
                <router-link :to="'/research/' + item.id">{{ item.uuid }} от {{ item.research_date | moment('DD.MM.YYYY') }}</router-link>
              </li>
            </ul>
            <router-link to="/researches">все исследования</router-link>
          </v-col>
          <v-col>
            <h2 class="mb-6">
              <v-icon
                small
                class="mr-1"
                color="blue"
              >
                mdi-format-list-bulleted
              </v-icon>
              Приемки
            </h2>
            <h3 class="mb-2">Последние приемки:</h3>
            <ul class="mb-8">
              <li v-for="item in acceptances" :key="item.id">
                <router-link :to="'/acceptance/' + item.id">{{ item.uuid }} от {{ item.acceptance_date | moment('DD.MM.YYYY') }}</router-link>
              </li>
            </ul>
            <router-link to="/acceptances">все приемки</router-link>
          </v-col>
        </v-row>

      </v-container>
    </v-card>

    <h2 class="mt-8 mb-6">
      <v-icon
        small
        class="mr-1"
        color="blue"
      >
        mdi-format-list-bulleted
      </v-icon>
      Справочники
    </h2>
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="catalogue">
            <router-link to="/">Ряды блоков</router-link>
            <router-link to="/">Блоки квартала</router-link>
            <router-link to="/">Кварталы сада</router-link>
            <router-link to="/gardens">Сады</router-link>
            <router-link to="/indicators">Показатели исследований</router-link>
          </div>
        </v-col>
        <v-col>
          <div class="catalogue">
            <router-link to="/">Контрагенты</router-link>
            <router-link to="/warehouses">Склады</router-link>
            <router-link to="/">Сорта</router-link>
            <router-link to="/rootstocks">Подвои</router-link>
            <router-link to="/">Типы продукции</router-link>
          </div>
        </v-col>
        <v-col>
          <div class="catalogue">
            <router-link to="/products">Продукция</router-link>
            <router-link to="/garden_types">Типы садов</router-link>
            <router-link to="/landing_schemas">Схемы посадки</router-link>
            <router-link to="/">Единицы измерений</router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    researches () {
      return this.$store.getters.researches.data
    }
  },
  created () {
    this.$store.dispatch('getResearches')
    this.$store.dispatch('getAcceptances')
  }
}
</script>

<style scoped lang="scss">
  .dashboard-navigation {
    background: #F3F6FA !important;
    color: #444 !important;
    a {
      color: #444 !important;
    }
    ul {
      font-size: 18px;
      li {
        margin-bottom: 8px;
      }
    }
  }
  .catalogue {
    a {
      display: block;
      font-size: 18px;
      color: #444;
      margin-bottom: 6px;
    }
  }
</style>
