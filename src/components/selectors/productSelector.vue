<template>
  <div>

    <div v-if="title" class="catalog-selector" @click="openProductsDialog">
      <div class="catalog-selector-label">Продукция</div>
      {{title}}
    </div>
    <div v-else>
      <v-btn
        block
        depressed
        color="light-grey"
        class="mb-4"
        x-large
        @click="openProductsDialog"
      >
        Выбрать продукцию
      </v-btn>
    </div>    

    <v-dialog
      v-model="productsDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"><h1 class="display-1">Выбор продукции</h1></span>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>
        <v-card-text class="pb-0">

          <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
          <v-container class="tree-box" fluid>
            <v-row class="tree-header">
              <v-col cols="4">Наименование </v-col>
              <v-col cols="1">Код </v-col>
              <v-col cols="6">Описание </v-col>
              <v-col cols="1"> </v-col>
            </v-row>
            <v-row
              class="tree-row tree-folders"
              v-for="folder in folders"
              :key="folder.id"
            >
              <v-col cols="4" @click="openFolder(folder.id)">
                <span class="folder-name">
                  <v-icon color="blue">folder</v-icon>
                  {{ folder.folder_name }}
                </span>
              </v-col>
              <v-col cols="1"> </v-col>
              <v-col cols="6"> </v-col>
            </v-row>

            <v-row class="tree-row tree-folders" v-for="item in items" :key="item.id" @click="selectItem(item)">
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

        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeProductsDialog" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      productsDialog: '',
      title: ''
    };
  },
  props: ["folder_id"],
  methods: {
    selectItem (item) {
      this.title = item.name
      this.$emit('returnItem', item)
      this.productsDialog = false;
    },
    openFolder(id) {
      this.$router.push("/products/" + id);
    },
    getProducts(id) {
      this.$store.dispatch("getProducts", id);
    },
    openProductsDialog () {
      this.productsDialog= true
    },
    closeProductsDialog () {
      this.productsDialog= false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    folders() {
      return this.$store.getters.products.folders;
    },
    folder() {
      return this.$store.getters.folder;
    },
    items() {
      return this.$store.getters.products.data;
    },
    meta() {
      return this.$store.getters.products.meta;
    },
    paginator() {
      return this.$store.getters.products.paginator;
    },
    folderModels() {
      return this.$store.getters.folderModels;
    },
  },
  created() {
    this.getProducts(this.folder_id);
    this.$store.dispatch("getFolderModels");
  },
  watch: {
    $route() {
      this.getProducts(this.folder_id);
    },
  },
};
</script>

<style lang="scss">
  .tree-box {
    .row {
      cursor: pointer;
    }
  }
  .catalog-selector {
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    line-height: 38px;
    padding: 8px 12px 8px;
    border: 1px solid rgba(0, 0, 0, 0.42);

    .catalog-selector-label {
    position: absolute;
    left: 10px;
    top: -11px;
    padding: 0 2px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    font-size: 12px;
    background: white;
    }
  }
</style>
