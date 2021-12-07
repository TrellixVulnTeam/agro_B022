<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1" v-if="product.id">{{product.name}}</h1>
    <h1 class="display-1" v-else>
      Новая продукция
      <span v-if="folderMeta.current_folder">
        в папке "{{ folderMeta.current_folder }}"
      </span>
    </h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row class="form-grid">
      <v-col cols="7">
        <v-row>
          <v-col cols="9">
            <v-text-field label="Наименование" outlined v-model="product.name"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Код" outlined v-model="product.classification_number"></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="9">
            <v-text-field label="Файл" outlined v-model="product.files"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Родитель" outlined v-model.number="product.parent_id"></v-text-field>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12">
            <v-textarea label="Описание" outlined v-model="product.description"></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          class="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </v-col>
    </v-row>
    <div v-if="product.id">
      <v-btn x-large depressed color="success" @click="updateProduct" class="mr-3">Обновить</v-btn>
      <v-btn x-large depressed color="light-red" @click="deleteProduct" class="">Удалить продукцию</v-btn>
    </div>
    <div v-else>
      <v-btn x-large depressed color="success" @click="createProduct" class="mr-3">Создать</v-btn>
    </div>

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Product',
  props: ['id', 'parent'],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
          url: '#',
          thumbnailWidth: 150,
          thumbnailHeight: 150,
          maxFilesize: 1,
          dictDefaultMessage: "<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",
          headers: { "Header": "header value" }
      }
    }
  },
  methods: {
    updateProduct () {
      this.$store.dispatch('updateProduct')
    },
    createProduct () {
      this.product.parent_id =  parseInt(this.parent)
      this.$store.dispatch('createProduct')
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    product() {
      return this.$store.getters.product
    },
    folderMeta() {
      return this.$store.getters.folderMeta
    }
  },
  created() {
    if (!isNaN(this.id)) {
      this.$store.dispatch('getProduct', this.id)
    }
    this.$store.dispatch('getFolderMeta', this.parent)
  },
  beforeDestroy () {
    this.$store.commit('setProduct', {})
  }
}
</script>

<style lang="scss">
  .form-grid {
    margin-bottom: 0px;
    .row {
      margin-top: 0;
    }
    .col {
      padding-top: 0;
      padding-bottom: 0;
    }
    textarea {
      height: 216px;
    }
  }
  .dropzone {
    min-height: 300px;
  }
</style>
