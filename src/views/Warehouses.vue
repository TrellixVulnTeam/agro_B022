<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Склады</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-btn @click="$router.push('/warehouse/new/' + folder_id)" depressed color="light-grey" class="mb-4 mr-4">+ Добавить склад</v-btn>

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
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="pb-0">

          <v-text-field label="Наименование" outlined v-model="folder.folder_name"></v-text-field>

          <!-- <v-select
            v-if="!folder.id"
            :items="folderModels"
            v-model="folder.model"
            outlined
            label="Модель папки"
            item-text="model_name"
          ></v-select> -->

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
        <v-col cols="3">
          Наименование
        </v-col>
        <v-col cols="2">
          Поля складов
        </v-col>
        <v-col cols="4">
          Описание
        </v-col>
        <v-col cols="2">
          Тип сада
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
      <v-row class="tree-row tree-folders" v-for="folder in folders" :key="folder.id">
        <v-col cols="3" @click="openFolder(folder.id)">
          <span class="folder-name">
            <v-icon color="blue">folder</v-icon>
            {{ folder.folder_name }}
          </span>
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="4">
        </v-col>
        <v-col cols="2">
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
        <v-col cols="3">
          <v-icon>mdi-file-outline</v-icon>
          {{ item.name }}
        </v-col>
        <v-col cols="2">
          {{ item.volume }}
        </v-col>
        <v-col cols="4">
          {{ item.description.slice(0, 40) }}
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
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getWarehouses()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { nameTheWrhsType } from '@/helpers/helpers.js'
export default {
  name: 'Warehouses',
  data() {
    return {
      folderDialog: false
    }
  },
  props: [ 'folder_id' ],
  methods: {
    openFolder(id) {
      this.$router.push('/warehouses/' + id)
    },
    getWarehouses(id) {
      this.$store.dispatch('getWarehouses', id)
    },
    editFolder(folder) {
      this.folderDialog = true
      this.$store.dispatch('getFolder', folder)
    },
    editItem(item) {
      this.$router.push('/warehouse/' + item.id)
    },
    deleteItem(item) {
      confirm('Вы уверены что хотите удалить склад? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteWarehouse', item)
    },
    updateFolder () {
      this.folderDialog = false
      this.$store.dispatch('updateFolder')
    },
    createFolder () {
      this.folderDialog = false
      this.folder.model = 'warehouses'
      this.$store.dispatch('createFolder', this.folder_id)
    },
    deleteFolder (folder) {
      this.folderDialog = false
      folder.model = 'warehouses'
      confirm('Вы уверены что хотите удалить папку? Вернуть ее уже будет нельзя!') && this.$store.dispatch('deleteWarehouseFolder', folder)
    },
    closeFolder () {
      this.folderDialog = false
      this.$store.dispatch('getFolder', {})
    }
  },
  computed: {
    folders() {
      return this.$store.getters.warehouses.folders
    },
    items() {
      return this.$store.getters.warehouses.data
    },
    paginator() {
      return this.$store.getters.warehouses.paginator
    },
    folder() {
      return this.$store.getters.folder
    },
    folderModels() {
      return this.$store.getters.folderModels
    },
    warehouses_types() {
      return this.$store.getters.warehouses_types.data
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getWarehouses(this.folder_id)
    this.$store.dispatch('getWarehouses_types')
    this.$store.dispatch('getFolderModels')
  },
  watch:{
    items() {
      this.items.forEach(wrh => {
        wrh.type = nameTheWrhsType(wrh, this.warehouses_types)
      })
    },
    $route() {
      this.getWarehouses(this.folder_id)
    }
  }
}
</script>

<style lang="scss">
</style>
