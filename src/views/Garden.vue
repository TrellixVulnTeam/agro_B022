<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1" v-if="garden.id">Редактирование сада</h1>
    <h1 class="display-1" v-else><h1 class="display-1">Новый сад</h1></h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row class="form-grid">
      <v-col cols="7">
        <v-text-field label="Наименование" outlined v-model="garden.name"></v-text-field>
        <v-select
          :items="garden_types"
          v-model="garden.garden_type_id"
          outlined
          label="Тип сада"
          item-text="name"
          item-value="id"
        ></v-select>
        <v-text-field label="Размер участка в га" outlined v-model.number="garden.area_size"></v-text-field>
        <v-text-field label="Кадастровый номер" outlined v-model="garden.cadastr_number"></v-text-field>
        <!-- <v-textarea label="Описание" outlined v-model="garden.description"></v-textarea> -->
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
    <div v-if="garden.id">
      <v-btn x-large depressed color="light-grey" @click="updateGarden" class="mr-3">Обновить</v-btn>
      <v-btn x-large depressed color="light-red" @click="deleteGarden" class="">Удалить сад</v-btn>
    </div>
    <div v-else>
      <v-btn x-large depressed color="light-grey" @click="createGarden" class="mr-3">Создать</v-btn>
    </div>

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Garden',
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
    updateGarden () {
      this.$store.dispatch('updateGarden')
    },
    createGarden () {
      this.$store.dispatch('createGarden')
    },
    deleteGarden () {
      console.log(this.garden)
      this.$store.dispatch('deleteGarden', this.garden)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    garden() {
      return this.$store.getters.garden
    },
    garden_types() {
      return this.$store.getters.garden_types.data
    }
  },
  created() {
    this.$store.dispatch('getGarden_types')
    if (!isNaN(this.id)) {
      this.$store.dispatch('getGarden', this.id)
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
  }
  .dropzone {
    min-height: 300px;
  }
</style>
