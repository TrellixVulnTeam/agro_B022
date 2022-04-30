<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">{{ research.uuid }} от {{ research.research_date | moment('DD.MM.YYYY') }}</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-row class="form-grid">
      <v-col cols="7">
        <v-row>
          <v-col cols="7">
            <v-text-field label="Номер" outlined v-model="research.uuid"></v-text-field>
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
            <v-select
              :items="acceptances"
              v-model.number="research.acceptance_id"
              outlined
              label="Приемка"
              item-text="acceptance_label"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Количество" outlined v-model="research.quantity"></v-text-field>
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
      <v-col cols="5" v-if="research.id">
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
      <!-- <v-col cols="12">
        <v-autocomplete
          :items="contractors"
          v-model.number="research.contractor_id"
          outlined
          label="Контрагент"
          item-text="name"
          item-value="id"
          @input.native="searchСontractor($event)"
        ></v-autocomplete>
      </v-col> -->
    </v-row>

    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab @click="getResearchDataByIndicatorGroup(0)">
        Все
      </v-tab>
      <v-tab
        v-for="indicatorsGroup in indicatorsGroups"
        :key="indicatorsGroup.id"
        @click="getResearchDataByIndicatorGroup(indicatorsGroup.id)"
      >
        {{ indicatorsGroup.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tabs-box">
      <v-tab-item>
        <v-card flat>
          <v-dialog
            v-model="rdDialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="light-grey"
                class="ma-4"
                v-bind="attrs"
                v-on="on"
              >
                + Добавить
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5"><h1 class="display-1">Новые данные</h1></span>
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
              <v-card-text class="pb-0">

                <v-select
                  :items="indicators.data"
                  v-model="RDataItem.indicator_id"
                  outlined
                  label="Показатель"
                  item-text="name"
                  item-value="id"
                ></v-select>
                <v-text-field label="Значение" outlined v-model.number="RDataItem.value"></v-text-field>
                <!-- <v-select
                  :items="measurementUnits"
                  v-model="RDataItem.measurement_unit_id"
                  outlined
                  label="Единица измерения"
                  item-text="name"
                  item-value="id"
                ></v-select> -->

              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn depressed color="light-grey" @click="closeRDataItem" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="light-grey" @click="createRDataItem" class="mr-3">Создать</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="light-grey"
                class="ma-4 ml-0"
                v-bind="attrs"
                v-on="on"
              >
                Еще
                <v-icon right>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title @click="openIndicatorDialog">Добавить показатель</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu> -->

          <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
          <v-container class="tree-box" fluid>
            <v-row class="tree-header">
              <v-col cols="2">
                Номер
              </v-col>
              <v-col cols="3">
                Показатель
              </v-col>
              <v-col cols="3">
                Значениие показателя
              </v-col>
              <v-col cols="3">
                Ед.Измерения
              </v-col>
            </v-row>

            <v-row class="tree-row tree-folders" v-for="item in researchDataByIndicatorGroup" :key="item.id">
              <v-col cols="2">
                {{ item.indicator_id }}
              </v-col>
              <v-col cols="3">
                {{ item.indicator_name }}
              </v-col>
              <v-col cols="3">
                {{ item.value }}
              </v-col>
              <v-col cols="3">
                {{ item.measurement_name }}
              </v-col>
              <v-col cols="1" class="text-right">
                <div class="actions">
                  <v-icon small @click="deleteRDataItem(item)"> mdi-delete </v-icon>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab-item
        v-for="indicatorsGroup in indicatorsGroups"
        :key="indicatorsGroup.id"
      >
        <v-card flat>
          <v-dialog
            v-model="rdDialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="light-grey"
                class="ma-4"
                v-bind="attrs"
                v-on="on"
              >
                + Добавить
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5"><h1 class="display-1">Новые данные</h1></span>
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
              <v-card-text class="pb-0">

                <v-select
                  :items="indicators.data"
                  v-model="RDataItem.indicator_id"
                  outlined
                  label="Показатель"
                  item-text="name"
                  item-value="id"
                ></v-select>
                <v-text-field label="Значение" outlined v-model.number="RDataItem.value"></v-text-field>
                <!-- <v-select
                  :items="measurementUnits"
                  v-model="RDataItem.measurement_unit_id"
                  outlined
                  label="Единица измерения"
                  item-text="name"
                  item-value="id"
                ></v-select> -->

              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn depressed color="light-grey" @click="closeRDataItem" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="light-grey" @click="createRDataItem" class="mr-3">Создать</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="light-grey"
                class="ma-4 ml-0"
                v-bind="attrs"
                v-on="on"
              >
                Еще
                <v-icon right>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title @click="openIndicatorDialog">Добавить показатель</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>

          <v-dialog
            v-model="indicatorDialog"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5"><h1 class="display-1">Новый индикатор</h1></span>
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
              <v-card-text class="pb-0">

                <v-text-field label="Название" outlined v-model="indicator.name"></v-text-field>
                <v-select
                  :items="measurementUnits"
                  v-model="indicator.measurement_unit_id"
                  outlined
                  label="Единица измерения"
                  item-text="name"
                  item-value="id"
                ></v-select>

              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn depressed color="light-grey" @click="closeIndicator" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="light-grey" @click="createIndicator(indicatorsGroup.id)" class="mr-3">Создать</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
          <v-container class="tree-box" fluid>
            <v-row class="tree-header">
              <v-col cols="2">
                Номер
              </v-col>
              <v-col cols="3">
                Показатель
              </v-col>
              <v-col cols="3">
                Значениие показателя
              </v-col>
              <v-col cols="3">
                Ед.Измерения
              </v-col>
            </v-row> 

            <v-row class="tree-row tree-folders" v-for="item in researchDataByIndicatorGroup" :key="item.id">
              <v-col cols="2">
                {{ item.indicator_id }}
              </v-col>
              <v-col cols="3">
                {{ item.indicator_name }}
              </v-col>
              <v-col cols="3">
                {{ item.value }}
              </v-col>
              <v-col cols="3">
                {{ item.measurement_name }}
              </v-col>
              <v-col cols="1" class="text-right">
                <div class="actions">
                  <v-icon small @click="deleteRDataItem(item)"> mdi-delete </v-icon>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
      </v-tab-item>
    </v-tabs-items>

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
      researchDataByIndicatorGroup: [],
      RDataItem: {
        research_id: null,
        indicator_id: null,
        value: null
      },
      indicator: {
        name: '',
        indicator_group_id: null
        // measurement_unit_id: null
      },
      tab: null,
      rdDialog: false,
      indicatorDialog: false,
      dropzoneOptions: {
        url: 'http://64.225.100.175:8000/api/v1/file_upload',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFilesize: 1,
        method: 'PUT',
        dictDefaultMessage: "<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",
        headers: { 'Authorization': 'Bearer ' + localStorage.jwt }
      },
      activePicker: null,
      date: null,
      menu: false
    }
  },
  methods: {
    sendingFileEvent (file, xhr, formData) {
      formData.append('model', 'research');
      formData.append('id', this.id);
    },
    completeFileEvent (info) {
      let response = JSON.parse(info.xhr.response)
      this.$store.commit('setMessage', response.human_data)
      this.$store.dispatch('getFiles', { model: 'research', id: this.id })
    },
    download (url) {
      window.location.href = url;
    },
    deleteFile (name) {
      let payload = {
        product_id: this.id,
        file_name: name,
        model: 'research'
      }
      confirm('Вы уверены что хотите файл? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteFile', payload)
    },
    isImage(file) {
      return file.match(/\.(jpg|jpeg|png|gif)$/)
    },
    getResearch () {
      this.$store.dispatch('getResearch', this.id)
    },
    getResearchData () {
      this.$store.dispatch('getResearchData', this.id)
    },
    getMeasurementUnits () {
      this.$store.dispatch('getMeasurementUnits')
    },
    getAcceptances() {
      this.$store.dispatch('getAcceptances')
    },
    getResearchDataByIndicatorGroup (group_id) {
      if (group_id == 0) {
        this.researchDataByIndicatorGroup = this.researchData
      } else {
        this.researchDataByIndicatorGroup = this.researchData.filter(element => element.indicator_group_id == group_id)
      }
    },
    getIndicators () {
      this.$store.dispatch('getIndicators')
    },
    getIndicatorsGroups () {
      this.$store.dispatch('getIndicatorsGroups')
    },
    createRDataItem () {
      this.RDataItem.research_id = parseInt(this.id)
      this.$store.dispatch('createRDataItem', this.RDataItem)
      this.rDataItem = {}
      this.rdDialog = false
    },
    deleteRDataItem (item) {
      confirm('Вы уверены что хотите удалить данные исследования? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteRDataItem', item)
      item.research_id = parseInt(this.id)
      this.rdDialog = false
    },
    closeRDataItem () {
      this.rdDialog = false
    },
    createIndicator (rgoupId) {
      this.indicator.indicator_group_id = rgoupId
      this.$store.dispatch('createIndicator', this.indicator)
      this.indicatorDialog = false
    },
    closeIndicator () {
      this.indicatorDialog = false
    },
    openIndicatorDialog () {
      this.indicatorDialog = true
    },
    searchСontractor (e) {
      this.$store.dispatch('searchСontractor', e.target.value)
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.research.research_date = day.toISOString()
    },
    getEmployees () {
      this.$store.dispatch('getEmployees')
    }
  },
  computed: {
    research () {
      return this.$store.getters.research
    },
    researchData () {
      return this.$store.getters.researchData
    },
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    indicators () {
      return this.$store.getters.indicators
    },
    indicatorsGroups () {
      return this.$store.getters.indicatorsGroups.data
    },
    measurementUnits () {
      return this.$store.getters.measurementUnits.data
    },
    researchStatuses() {
      return this.$store.getters.researchStatuses
    },
    contractors () {
      return this.$store.getters.contractors.data
    },
    employees () {
      return this.$store.getters.employees
    },
    files () {
      return this.$store.getters.files
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getResearch()
    this.getResearchData()
    this.getIndicators()
    this.getIndicatorsGroups()
    this.getMeasurementUnits()
    this.getAcceptances()
    this.getEmployees()
    this.$store.dispatch('getFiles', { model: 'research', id: this.id })
  },
  beforeDestroy () {
    this.$store.commit('setResearch', {})
  },
  watch: {
    research () {
      this.date = this.$moment.utc(this.research.research_date).format('YYYY-MM-DD')  
    },
    researchData () {
      setTimeout(() => {
        this.getResearchDataByIndicatorGroup(0)
      }, 200)
    },
    acceptances () {
      this.acceptances.forEach(acceptance => {
        acceptance.acceptance_label = acceptance.uuid + " от " + this.$moment.utc(acceptance.acceptance_date).format('YYYY.MM.DD')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabs-box {
    border: 1px solid #DEDEDE;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .v-tabs {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .tree-box {
    border-left: 0 !important;
    border-right: 0 !important;
    border-bottom: 0 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
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
</style>
