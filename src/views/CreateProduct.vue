<template>
  <div>
    <h1 class="display-1">Новая продукция</h1>
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
        <v-row>
          <v-col cols="9">
            <v-text-field label="Файл" outlined v-model="product.files"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Родитель" outlined v-model="product.parent_id"></v-text-field>
          </v-col>
        </v-row>
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

    <v-btn x-large depressed color="light-grey" @click="updateProduct" class="mr-3">Создать</v-btn>
    <v-btn x-large depressed color="light-red" @click="deleteProduct" class="">Удалить продукцию</v-btn>

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Product',
  props: ['id'],
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
    deleteProduct () {
      this.$store.dispatch('deleteProduct')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    product() {
      return this.$store.getters.product
    }
  },
  created() {
    this.$store.dispatch('getProduct', this.id)
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
  }
  .dropzone {
    min-height: 300px;
  }
</style>
