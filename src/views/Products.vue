<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Плоды</h1>
    <v-divider class="mt-2 mb-4"></v-divider>
    <v-btn @click="$router.push('/product/new')" depressed color="light-grey" class="mb-4 mr-4">+ Добавить продукт</v-btn>

    <folder parent_id="folder" id=""></folder>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="4">
          Наименование
        </v-col>
        <v-col cols="1">
          Код
        </v-col>
        <v-col cols="5">
          Описание
        </v-col>
        <v-col cols="2">
          Файл
        </v-col>
      </v-row>
      <v-row class="tree-row tree-folders" v-for="folder in folders" :key="folder.id" @click="openFolder(folder.id)">
        <v-col cols="4">
          <v-icon color="blue">folder</v-icon>
          {{ folder.folder_name }}
        </v-col>
        <v-col cols="1">
        </v-col>
        <v-col cols="5">
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id">
        <v-col cols="4">
          <router-link :to="'/product/' + item.id">
            <v-icon>mdi-file-outline</v-icon>
            {{ item.name }}
          </router-link>
        </v-col>
        <v-col cols="1">
          {{ item.classification_number.slice(0, 7) }}
        </v-col>
        <v-col cols="5">
          {{ item.description.slice(0, 40) }}
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getProducts()"
      ></v-pagination>
    </div>
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
  props: [ 'folder_id' ],
  components: { folder },
  methods: {
    openFolder(id) {
      this.$router.push('/products/' + id)
    },
    getProducts(id) {
      this.$store.dispatch('getProducts', id)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    folders() {
      return this.$store.getters.products.folders
    },
    folder() {
      return this.$store.getters.products.folder
    },
    items() {
      return this.$store.getters.products.data
    },
    paginator() {
      return this.$store.getters.products.paginator
    }
  },
  created() {
    this.getProducts(this.folder_id)
  },
  watch:{
    $route() {
      this.getProducts(this.folder_id)
    }
  }
}
</script>

<style lang="scss">
</style>
