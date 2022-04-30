<template>
  <div>
    <div @click="$router.push('/products/' + product.parent_id)" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon> {{ folderMeta.current_folder }}
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
          <v-col cols="12">
            <v-textarea label="Описание" outlined v-model="product.description"></v-textarea>

            <div v-if="product.id">
              <v-btn x-large depressed color="success" @click="updateProduct" class="mr-3">Обновить</v-btn>
              <v-btn x-large depressed color="light-red" @click="deleteProduct" class="">Удалить продукцию</v-btn>
            </div>
            <div v-else>
              <v-btn x-large depressed color="success" @click="createProduct" class="mr-3">Создать</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" v-if="product.id">
        <v-card outlined class="files-card">
          <v-toolbar elevation="0">
            <v-toolbar-title>Документы</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text v-if="!files">
            Что бы загрузить документы перетащите их на зону ниже или просто кликните по ней
          </v-card-text>
          <v-list
            subheader
            two-line
          >
            <div
              v-for="(file, index) in files"
              :key="index"
            >
              <v-list-item>
                <v-list-item-avatar>
                  <img :src="file.url" alt="" v-if="isImage(file.url)" @click="download(file.url)" class="file-image-preview">
                  <v-icon
                    v-else
                    class="grey lighten-1 file-doc-preview"
                    dark
                    @click="download(file.url)"
                  >mdi-file</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="file.filename" @click="download(file.url)" class="file-name"></v-list-item-title>
                  <v-list-item-subtitle v-text="'Размер: ' + file.file_size + 'кб'"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="deleteFile(file.filename)">
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < files.length - 1"
                :key="index"
              ></v-divider>

            </div>
          </v-list>

          <vue-dropzone
            v-on:vdropzone-sending="sendingFileEvent"
            v-on:vdropzone-complete="completeFileEvent"
            :options="dropzoneOptions"
            ref="myVueDropzone"
            id="dropzone"
            class="dropzone"
          ></vue-dropzone>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Product',
  props: ['id', 'parent_id'],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://64.225.100.175:8000/api/v1/file_upload',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFilesize: 1,
        method: 'PUT',
        dictDefaultMessage: "<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",
        headers: { 'Authorization': 'Bearer ' + localStorage.jwt }
      }
    }
  },
  methods: {
    sendingFileEvent (file, xhr, formData) {
      formData.append('model', 'product');
      formData.append('id', this.id);
    },
    completeFileEvent (info) {
      let response = JSON.parse(info.xhr.response)
      this.$store.commit('setMessage', response.human_data)
      this.$store.dispatch('getFiles', { model: 'product', id: this.id })
    },
    download (url) {
      window.location.href = url;
    },
    updateProduct () {
      this.$store.dispatch('updateProduct')
    },
    createProduct () {
      this.product.parent_id = parseInt(this.parent_id)
      this.$store.dispatch('createProduct')
    },
    deleteProduct () {
      confirm('Вы уверены что хотите удалить продукцию? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteProduct', this.product)
    },
    deleteFile (name) {
      let payload = {
        product_id: this.id,
        file_name: name,
        model: 'product'
      }
      confirm('Вы уверены что хотите файл? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteFile', payload)
    },
    isImage(file) {
      return file.match(/\.(jpg|jpeg|png|gif)$/)
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
    },
    files() {
      return this.$store.getters.files
    }
  },
  created() {
    if (!isNaN(this.id)) {
      this.$store.dispatch('getProduct', this.id)
      this.$store.dispatch('getFiles', { model: 'product', id: this.id })
    } else {
      this.$store.dispatch('getFolderMeta', this.parent_id)
    }
  },
  beforeDestroy () {
    this.$store.commit('setProduct', {})
  },
  watch: {
    product () {
      this.$store.dispatch('getFolderMeta', this.product.parent_id)
    }
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
</style>
