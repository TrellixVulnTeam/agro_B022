<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col>
        <h1 class="display-1">{{ acceptance.uuid }} от {{ acceptance.acceptance_date | moment('DD.MM.YYYY') }}</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn
          depressed
          color="light-grey"
          @click="openResearch"
        >
          + Cоздать новое исследование
        </v-btn>
      </v-col>

    </v-row>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row class="form-grid">
      <v-col cols="7">
        <v-row>
          <v-col cols="7">
            <v-text-field label="Номер" outlined v-model="acceptance.uuid"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Дата"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :active-picker.sync="activePicker"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="7">
            <v-text-field label="Партия" outlined v-model="acceptance.batch_name"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-autocomplete
              :items="products"
              v-model.number="acceptance.product_id"
              outlined
              label="Продукция"
              item-text="name"
              item-value="id"
              @input.native="searchProduct($event)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="7">
            <v-autocomplete
              :items="warehouses"
              v-model.number="acceptance.warehouse_id"
              outlined
              label="Склад"
              item-text="name"
              item-value="id"
              @input.native="searchWarehouse($event)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Количество" outlined v-model.number="acceptance.quantity"></v-text-field>
          </v-col>
          <v-col cols="7">
            <v-autocomplete
              :items="contractors"
              v-model.number="acceptance.contractor_id"
              outlined
              label="Контрагент"
              item-text="account_name"
              item-value="id"
              @input.native="searchСontractor($event)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="5">
            <v-select
              :items="employees"
              v-model.number="acceptance.employee_id"
              outlined
              label="Сотрудник"
              item-text="fio"
              item-value="id"
            ></v-select>
          </v-col>

          <!-- <v-col cols="3">
            <v-select
              :items="gardens"
              v-model.number="garden_id"
              outlined
              label="Сад"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="quarters"
              v-model.number="quarter_id"
              outlined
              label="Квартал"
              item-text="name"
              item-value="id"
              :disabled="!garden_id"
            ></v-select> 
          </v-col>
          <v-col cols="3">
            <v-select
              :items="blocks"
              v-model.number="block_id"
              outlined
              label="Блок"
              item-text="name"
              item-value="id"
              :disabled="!quarter_id"
            ></v-select> 
          </v-col> -->
          <v-col cols="7">
            <v-select
              :items="rows"
              v-model.number="acceptance.blockrow_id"
              outlined
              label="Ряд"
              item-text="name"
              item-value="id"
            ></v-select> 
          </v-col>
          <v-col cols="5">
            <v-text-field label="Комментарий" outlined v-model="acceptance.comment"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" v-if="acceptance.id">
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

    <line-chart :id="id" class="mt-10"></line-chart>

    <!-- Researches -->
    <h4 class="text-h5 mb-4 mt-8">Исследования</h4>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <div v-if="researches.length < 1">
      <div class="mb-2">Исследования для этой приемки еще не созданы.</div>
      <v-btn
        depressed
        color="light-grey"
        @click="openResearch"
      >
        + Cоздать новое исследование
      </v-btn>
    </div>
    <v-container class="tree-box" fluid v-else>
      <v-row class="tree-header">
        <v-col cols="2">
          Дата
        </v-col>
        <v-col cols="3">
          Номер
        </v-col>
        <v-col cols="2">
          Количество
        </v-col>
        <v-col cols="3">
          Статус
        </v-col>
      </v-row>

      <v-row class="tree-row" v-for="item in researches" :key="item.id" @click="goToResearch(item.id)">
        <v-col cols="2">
          {{ item.research_date | moment('DD.MM.YYYY') }}
        </v-col>
        <v-col cols="3">
          {{ item.uuid }}
        </v-col>
        <v-col cols="2">
          {{ item.quantity }}
        </v-col>
        <v-col cols="3">
          {{ item.status }}
        </v-col>
      </v-row>
    </v-container>
    <!-- / Researches -->

    <!-- Research creating dialog -->
    <v-dialog
      v-model="researchDialog"
      persistent
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <h1 class="display-1">Новое исследование</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-row class="form-grid">
            <v-col cols="12">
              <v-row>
                <v-col cols="7">
                  <v-text-field label="Номер" outlined v-model="research.uuid"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-menu
                    ref="researchMenu"
                    v-model="researchMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="researchDate"
                        label="Дата"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="researchDate"
                      :active-picker.sync="researchActivePicker"
                      @change="saveResearchDate"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="7">
                  <v-select
                    :items="acceptances"
                    v-model.number="research.acceptance_id"
                    outlined
                    label="Приемка"
                    item-text="uuid"
                    item-value="id"
                  ></v-select>
                </v-col>
                <v-col cols="5">
                  <v-text-field label="Количество" outlined v-model.number="research.quantity"></v-text-field>
                </v-col>
                <v-col cols="7">
                  <v-select
                    :items="employees"
                    v-model.number="research.employee_id"
                    outlined
                    label="Сотрудник"
                    item-text="fio"
                    item-value="id"
                  ></v-select>
                </v-col>
                <v-col cols="5">
                  <v-select
                    :items="researchStatuses"
                    v-model.number="research.status"
                    outlined
                    label="Статус"
                    item-text="name"
                    item-value="value"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed x-large color="success" @click="createResearch" class="mr-3">Создать исследование</v-btn>
          <v-btn depressed x-large color="light-grey" @click="closeResearch" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Research creating dialog -->

  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import LineChart from '@/components/LineChart'
export default {
  components: {
    vueDropzone: vue2Dropzone,
    LineChart
  },
  name: 'acceptance',
  props: ['id'],
  data() {
    return {
      activePicker: null,
      researchActivePicker: null,
      date: null,
      researchDate: null,
      menu: false,
      researchMenu: false,
      searchquery: '',
      garden_id: 1,
      quarter_id: null,
      block_id: null,
      row_id: null,
      dropzoneOptions: {
        url: 'http://64.225.100.175:8000/api/v1/file_upload',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFilesize: 1,
        method: 'PUT',
        dictDefaultMessage: "<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",
        headers: { 'Authorization': 'Bearer ' + localStorage.jwt }
      },
      researchDialog: false
    }
  },
  methods: {
    sendingFileEvent (file, xhr, formData) {
      formData.append('model', 'acceptance');
      formData.append('id', this.id);
    },
    completeFileEvent (info) {
      let response = JSON.parse(info.xhr.response)
      this.$store.commit('setMessage', response.human_data)
      this.$store.dispatch('getFiles', { model: 'acceptance', id: this.id })
    },
    download (url) {
      window.location.href = url;
    },
    deleteFile (name) {
      let payload = {
        product_id: this.id,
        file_name: name,
        model: 'acceptance'
      }
      confirm('Вы уверены что хотите файл? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteFile', payload)
    },
    isImage(file) {
      return file.match(/\.(jpg|jpeg|png|gif)$/)
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.acceptance.acceptance_date = day.toISOString()
    },
    saveResearchDate (researchDate) {
      this.$refs.researchMenu.save(researchDate)
      let day = new Date(this.researchDate)
      this.research.research_date = day.toISOString()
    },
    searchWarehouse (e) {
      this.$store.dispatch('searchWarehouse', e.target.value)
    },
    searchProduct (e) {
      this.$store.dispatch('searchProduct', e.target.value)
    },
    searchСontractor (e) {
      this.$store.dispatch('searchСontractor', e.target.value)
    },
    getQuarters () {
      this.$store.dispatch('getQuarters', this.garden_id)
      this.$store.dispatch('getAcceptanceBatches')
    },
    getBlocks () {
      this.$store.dispatch('getBlocks', this.quarter_id)
    },
    getRows () {
      this.$store.dispatch('getRows', this.block_id)
    },
    getEmployees () {
      this.$store.dispatch('getEmployees')
    },
    getRow (row_id) {
      this.$store.dispatch('getRow', row_id)
    },
    createResearch () {
      this.$store.dispatch('createResearch')
    },
    closeResearch () {
      this.researchDate = null
      this.researchDialog = false
    },
    openResearch () {
      // this.ResearchDate = null
      this.researchDialog = true
    },
    getFilteredResearches() {
      let params = {
        acceptance_id: this.id
      }
      this.$store.dispatch('getFilteredResearches', params)
    },
    goToResearch (id) {
      this.$router.push('/research/' + id)
    }
  },
  computed: {
    acceptance () {
      return this.$store.getters.acceptance
    },
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    researches () {
      return this.$store.getters.researches.data
    },
    product () {
      return this.$store.getters.product
    },
    warehouse () {
      return this.$store.getters.warehouse
    },
    contractor () {
      return this.$store.getters.contractor
    },
    block () {
      return this.$store.getters.block
    },
    employee () {
      return this.$store.getters.employee
    },
    warehouses () {
      return this.$store.getters.warehouses.data
    },
    products () {
      return this.$store.getters.products.data
    },
    contractors () {
      return this.$store.getters.contractors.data
    },
    gardens () {
      return [ {name: 'Первый', id: 1} ]
    },
    quarters () {
      return this.$store.getters.quarters.data
    },
    blocks () {
      return this.$store.getters.blocks.data
    },
    rows () {
      return this.$store.getters.rows.data
    },
    row () {
      return this.$store.getters.row
    },
    employees () {
      return this.$store.getters.employees
    },
    research () {
      return this.$store.getters.research
    },
    researchStatuses () {
      return this.$store.getters.researchStatuses
    },
    files () {
      return this.$store.getters.files
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.$store.dispatch('getAcceptance', this.id)
    this.$store.dispatch('getFiles', { model: 'acceptance', id: this.id })
    this.$store.dispatch('getAcceptances')
    this.getQuarters()
    this.getEmployees()
    this.getFilteredResearches()
  },
  beforeDestroy () {
    this.$store.commit('setAcceptance', {})
  },
  watch: {
    quarter_id () {
      this.getBlocks()
    },
    block_id () {
      this.getRows()
    },
    acceptance () {
      this.$store.dispatch('getProduct', this.acceptance.product_id)
      this.$store.dispatch('getWarehouse', this.acceptance.warehouse_id)
      this.$store.dispatch('getContractor', this.acceptance.contractor_id)
      this.getRow(this.acceptance.blockrow_id)
      this.date = this.$moment.utc(this.acceptance.acceptance_date).format('YYYY-MM-DD')
      // this.$store.dispatch('getEmployee', this.acceptance.employee_id)
    },
    acceptances () {
      this.research.acceptance_id = parseInt(this.id)
    },
    product () {
      this.products.push(this.product)
    },
    warehouse () {
      this.warehouses.push(this.warehouse)
    },
    contractor () {
      this.contractors.push(this.contractor)
    },
    row () {
      this.rows.push(this.row)
    },
    researches () {
      this.researches.forEach(research => {
        this.researchStatuses.forEach(status => {
          if (research.status == status.value) {
            research.status = status.name
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-row {
    cursor: pointer;
  }
  // .dropzone {
  //   min-height: 400px;
  //   &.small {
  //     min-height: 228px !important;
  //   }
  // }
</style>
