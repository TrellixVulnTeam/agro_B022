<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Исследование {{ research.research_date | moment('DD.MM.YYYY hh:mm') }}</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-row class="form-grid">
      <v-col cols="7">
        <v-row>
          <v-col cols="5">
            <v-text-field label="Номер" outlined v-model="research.uuid"></v-text-field>
          </v-col>
          <v-col cols="7">
            <v-text-field label="Статус" outlined v-model="research.employee_id"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-text-field label="Партия" outlined v-model="research.acceptance_id"></v-text-field>
          </v-col>
          <v-col cols="7">
            <v-text-field label="Количество" outlined v-model="research.quantity"></v-text-field>
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

    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="indicatorsGroup in indicatorsGroups"
        :key="indicatorsGroup.id"
        @click="getResearchDataByIndicatorGroup(indicatorsGroup.id)"
      >
        {{ indicatorsGroup.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tabs-box">
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
                <v-text-field label="Значение" outlined v-model="RDataItem.value"></v-text-field>
                <v-select
                  :items="measurementUnits"
                  v-model="RDataItem.measurement_unit_id"
                  outlined
                  label="Единица измерения"
                  item-text="name"
                  item-value="id"
                ></v-select>

              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn depressed color="light-grey" @click="createRDataItem" class="mr-3">Создать</v-btn>
                <v-btn depressed color="light-grey" @click="closeRDataItem" class="mr-3">Закрыть</v-btn>
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
                <v-btn depressed color="light-grey" @click="createIndicator(indicatorsGroup.id)" class="mr-3">Создать</v-btn>
                <v-btn depressed color="light-grey" @click="closeIndicator" class="mr-3">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
          <v-container class="tree-box" fluid>
            <v-row class="tree-header">
              <v-col cols="2">
                Номер
              </v-col>
              <v-col cols="4">
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
              <v-col cols="4">
                {{ item.indicator_name }}
              </v-col>
              <v-col cols="3">
                {{ item.value }}
              </v-col>
              <v-col cols="3">
                {{ item.measurement_name }}
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
        measurement_unit_id: null,
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
    getResearch () {
      this.$store.dispatch('getResearch', this.id)
    },
    getResearchData () {
      this.$store.dispatch('getResearchData', this.id)
    },
    getMeasurementUnits () {
      this.$store.dispatch('getMeasurementUnits')
    },
    // getRDataItem (id) {
    //   this.$store.dispatch('getRDataItem', id)
    // },
    getResearchDataByIndicatorGroup (group_id) {
      this.researchDataByIndicatorGroup = this.researchData.filter(element => element.indicator_group_id == group_id)
    },
    getIndicators () {
      this.$store.dispatch('getIndicators')
    },
    getIndicatorsGroups () {
      this.$store.dispatch('getIndicatorsGroups')
    },
    createRDataItem () {
      this.RDataItem.research_id = this.id
      this.$store.dispatch('createRDataItem', this.RDataItem)
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
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    research () {
      return this.$store.getters.research
    },
    researchData () {
      return this.$store.getters.researchData.data
    },
    // rDataItem () {
    //   return this.$store.getters.rDataItem
    // },
    indicators () {
      return this.$store.getters.indicators
    },
    indicatorsGroups () {
      return this.$store.getters.indicatorsGroups.data
    },
    measurementUnits () {
      return this.$store.getters.measurementUnits.data
    }
  },
  created() {
    this.getResearch()
    this.getResearchData()
    this.getIndicators()
    this.getIndicatorsGroups()
    this.getMeasurementUnits()
  },
  watch: {
    researchData () {
      setTimeout(() => {
        this.getResearchDataByIndicatorGroup(this.indicatorsGroups[0].id)
      }, 200)
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
  .dropzone {
    min-height: 200px;
    margin-bottom: 20px;
  }
</style>
