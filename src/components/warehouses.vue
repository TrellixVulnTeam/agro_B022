<template>
  <div>
    <!-- warehouse creating dialog -->
    <v-dialog
      v-model="warehouseDialog"
      persistent
      max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          color="light-grey"
          v-bind="attrs"
          v-on="on"
          class="mb-4"
          @click="warehouseDialog = true"
        >
          + Выбрать место хранения
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1">Выбор места хранения приемки</h1>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>

        <div @click="goToPrevFolder" class="back-btn">
          <v-icon class="ml-0">chevron_left</v-icon>назад
        </div>

        <v-card-text class="pb-0">

          <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
          <v-container class="tree-box" fluid>
            <v-row class="tree-header">
              <v-col cols="4">
                Наименование
              </v-col>
              <v-col cols="4">
                Размер участка
              </v-col>
              <v-col cols="3">
                Тип сада
              </v-col>
              <v-col cols="1">
              </v-col>
            </v-row>
            <v-row class="tree-row tree-folders" v-for="folder in folders" :key="folder.id">
              <v-col cols="12" @click="openFolder(folder.id)">
                <span class="folder-name">
                  <v-icon color="blue">folder</v-icon>
                  {{ folder.folder_name }}
                </span>
              </v-col>
            </v-row>

            <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id">
              <v-col cols="4">
                <v-icon>mdi-file-outline</v-icon>
                {{ item.name }}
              </v-col>
              <v-col cols="4">
                {{ item.volume }} га
              </v-col>
              <v-col cols="3">
                {{ item.type }}
              </v-col>
              <v-col cols="1" class="text-right">
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

      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn depressed color="light-grey" @click="warehouseDialog = false" class="mr-3">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- / warehouse creating dialog -->

  </div>
</template>

<script>
import { nameTheWrhsType } from '@/helpers/helpers.js'
export default {
  name: 'warehouses',
  data() {
    return {
      warehouseDialog: false
    }
  },
  props: [ 'folder_id' ],
  methods: {
    getWarehouses(id) {
      this.$store.dispatch('getWarehouses', id)
    },
    openFolder(id) {
      this.$store.dispatch('getWarehouses', id)
    },
    goToPrevFolder(id) {
      this.$store.dispatch('getWarehouses', id)
    },
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

<style lang="scss" scoped>
  .back-btn {
    margin: 0 0 12px 18px !important;
  }
</style>
