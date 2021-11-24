<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Плоды</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-btn @click="$router.push('/product/new/' + folder_id)" depressed color="light-grey" class="mb-4 mr-4">+ Добавить продукт</v-btn>

    <v-dialog
      v-model="folderDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          color="light-grey"
          class="mb-4"
          v-bind="attrs"
          v-on="on"
        >
          + Добавить папку
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="folder.id">Редактирование папки</span>
          <span class="text-h5" v-else><h1 class="display-1">Новая папка</h1></span>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>
        <v-card-text class="pb-0">

          <v-text-field label="Наименование" outlined v-model="folder.folder_name"></v-text-field>

          <v-select
            v-if="!folder.id"
            :items="folderModels"
            v-model="folder.model"
            outlined
            label="Модель папки"
            item-text="model_name"
          ></v-select>

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="folder.id">
            <v-btn depressed color="light-grey" @click="closeFolder" class="mr-3">Закрыть</v-btn>
            <v-btn depressed color="light-grey" @click="updateFolder" class="mr-3">Обновить</v-btn>
          </div>
          <div v-else>
            <v-btn depressed color="light-grey" @click="closeFolder" class="mr-3">Закрыть</v-btn>
            <v-btn depressed color="light-grey" @click="createFolder" class="mr-3">Создать</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="4">
          Наименование
        </v-col>
        <v-col cols="1">
          Код
        </v-col>
        <v-col cols="6">
          Описание
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
      <v-row class="tree-row tree-folders" v-for="folder in folders" :key="folder.id">
        <v-col cols="4" @click="openFolder(folder.id)">
          <span class="folder-name">
            <v-icon color="blue">folder</v-icon>
            {{ folder.folder_name }}
          </span>
        </v-col>
        <v-col cols="1">
        </v-col>
        <v-col cols="6">
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="editFolder(folder)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteFolder(folder)"
            >
              mdi-delete
            </v-icon>
          </div>
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id">
        <v-col cols="4">
          <span class="name">
            <v-icon>mdi-file-outline</v-icon>
            {{ item.name }}
          </span>
        </v-col>
        <v-col cols="1">
          {{ item.classification_number.slice(0, 7) }}
        </v-col>
        <v-col cols="6">
          {{ item.description.slice(0, 40) }}
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
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getProducts()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      folderDialog: false
    }
  },
  props: [ 'folder_id' ],
  methods: {
    editItem(item) {
      this.$router.push('/product/' + item.id)
    },
    deleteItem(item) {
      this.$store.dispatch('deleteProduct', item)
    },
    openFolder(id) {
      this.$router.push('/products/' + id)
    },
    getProducts(id) {
      this.$store.dispatch('getProducts', id)
    },
    editFolder(folder) {
      this.folderDialog = true
      this.$store.dispatch('getFolder', folder)
    },
    updateFolder () {
      this.folderDialog = false
      this.$store.dispatch('updateFolder')
    },
    createFolder () {
      this.folderDialog = false
      this.$store.dispatch('createFolder', this.folder_id)
    },
    deleteFolder (folder) {
      this.folderDialog = false
      this.$store.dispatch('deleteFolder', folder)
    },
    closeFolder () {
      this.folderDialog = false
      this.$store.dispatch('getFolder', {})
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
      return this.$store.getters.folder
    },
    items() {
      return this.$store.getters.products.data
    },
    paginator() {
      return this.$store.getters.products.paginator
    },
    folderModels() {
      return this.$store.getters.folderModels
    }
  },
  created() {
    this.getProducts(this.folder_id)
    this.$store.dispatch('getFolderModels')
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
