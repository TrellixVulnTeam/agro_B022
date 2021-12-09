<template>
  <div>
    <h1 class="display-1">Структура сада</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-btn @click="$router.push('/garden/new')" depressed color="light-grey" class="mb-4 mr-4">+ Добавить сад</v-btn>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="4">
          Наименование
        </v-col>
        <v-col cols="2">
          Размер в га
        </v-col>
        <v-col cols="3">
          Кадастровый номер
        </v-col>
        <v-col cols="2">
          Тип сада
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in gardens" :key="item.id">
        <v-col cols="4" @click="$router.push('/quarters/' + item.id)">
          <v-icon>mdi-file-outline</v-icon>
          {{ item.name }}
        </v-col>
        <v-col cols="2">
          {{ item.area_size }}
        </v-col>
        <v-col cols="3">
          {{ item.cadastr_number }}
        </v-col>
        <v-col cols="2">
          {{ item.type }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getProducts()"
      ></v-pagination>
    </div> -->
  </div>
</template>

<script>
import { nameTheGrdnsType } from '@/helpers/helpers.js'
export default {
  name: 'Gardens',
  data() {
    return {
    }
  },
  methods: {
    getGardens() {
      this.$store.dispatch('getGardens')
    },
    editItem(item) {
      this.$router.push('/garden/' + item.id)
    },
    deleteItem(item) {
      this.$store.dispatch('deleteGarden', item)
    }
  },
  computed: {
    gardens() {
      return this.$store.getters.gardens
    },
    garden_types() {
      return this.$store.getters.garden_types.data
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getGardens()
    this.$store.dispatch('getGarden_types')
  },
  watch:{
    gardens() {
      this.gardens.forEach(garden => {
        garden.type = nameTheGrdnsType(garden, this.garden_types)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-row {
    cursor: pointer;
  }
</style>
