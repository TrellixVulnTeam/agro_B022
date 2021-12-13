<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1" v-if="warehouse.id">Редактирование склада</h1>
    <h1 class="display-1" v-else><h1 class="display-1">Новый склад</h1></h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row class="form-grid">
      <v-col cols="7">
        <v-text-field label="Наименование" outlined v-model="warehouse.name"></v-text-field>
        <v-select
          :items="warehouses_types"
          v-model="warehouse.warehouses_type_id"
          outlined
          label="Тип склада"
          item-text="name"
          item-value="id"
        ></v-select>
        <v-text-field label="Объем хранения" outlined v-model.number="warehouse.volume"></v-text-field>
        <!-- <v-text-field label="Работник" outlined v-model="warehouse.employee_id"></v-text-field> -->
        <v-textarea label="Описание" outlined v-model="warehouse.description"></v-textarea>
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
    <div v-if="warehouse.id">
      <v-btn x-large depressed color="light-grey" @click="updateWarehouse" class="mr-3">Обновить</v-btn>
      <v-btn x-large depressed color="light-red" @click="deleteWarehouse" class="">Удалить склад</v-btn>
    </div>
    <div v-else>
      <v-btn x-large depressed color="light-grey" @click="createWarehouse" class="mr-3">Создать</v-btn>
    </div>

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Warehouse',
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
    updateWarehouse () {
      this.$store.dispatch('updateWarehouse')
    },
    createWarehouse () {
      this.$store.dispatch('createWarehouse')
    },
    deleteWarehouse () {
      this.$store.dispatch('deleteWarehouse', this.warehouse)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    warehouse() {
      return this.$store.getters.warehouse
    },
    warehouses_types() {
      return this.$store.getters.warehouses_types.data
    }
  },
  created() {
    this.$store.dispatch('getWarehouses_types')
    if (!isNaN(this.id)) {
      this.$store.dispatch('getWarehouse', this.id)
    }
  },
  beforeDestroy () {
    this.$store.commit('setWarehouse', {})
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
