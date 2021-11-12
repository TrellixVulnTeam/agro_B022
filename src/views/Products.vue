<template>
  <div>
    <h1 class="display-1">Плоды</h1>
    <v-divider class="mt-2 mb-4"></v-divider>
    <v-btn @click="$router.push('/products/new')" depressed color="light-grey" class="mb-4 mr-4">+ Добавить продукт</v-btn>

    <folder parent_id="0" id=""></folder>

    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Наименование
        </v-col>
        <v-col cols="1">
          Код
        </v-col>
        <v-col cols="2">
          Описание
        </v-col>
        <v-col cols="2">
          Файл
        </v-col>
        <v-col cols="2">
          Файл описание
        </v-col>
        <v-col cols="2">
          Ед. измер.
        </v-col>
      </v-row>
      <v-row class="tree-row tree-folders" v-for="folder in folders" :key="folder.id">
        <v-col cols="3">
          <router-link :to="'/products/folder/' + folder.id">
            <v-icon color="blue">folder</v-icon>
            {{ folder.folder_name }}
          </router-link>
        </v-col>
        <v-col cols="1">
          {{ folder.id }}
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id">
        <v-col cols="3">
          <router-link :to="'/products/' + item.id">
            <v-icon>mdi-file-outline</v-icon>
            {{ item.name }}
          </router-link>
        </v-col>
        <v-col cols="1">
          {{ item.classification_number.slice(0, 7) }}
        </v-col>
        <v-col cols="2">
          {{ item.description.slice(0, 40) }}
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
        <v-col cols="2">
          ...
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const folder = () => import('@/components/folder')
export default {
  name: 'Products',
  data() {
    return {
    }
  },
  components: {
    folder
  },
  methods: {
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    folders() {
      return this.$store.getters.products.data.folders
    },
    items() {
      return this.$store.getters.products.data.data
    }
  },
  created() {
    this.$store.dispatch('getProducts', '')
  }
}
</script>

<style lang="scss">
</style>
