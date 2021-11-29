<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Приемка {{ acceptance.uuid }} от {{ acceptance.acceptance_date | moment('DD.MM.YYYY') }}</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-alert type="success" class="mb-8" outlined text v-if="acceptancesMessage">
      <v-row>
        <v-col>
          Приемка успешно создана!
        </v-col>
        <v-col class="text-right">
          <v-btn
            depressed
            color="success"
            @click="openResearch"
            outlined
          >
            + Cоздать новое исследование
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

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
              v-model.number="acceptance.blocks_id"
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
      <v-col cols="5">
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          class="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </v-col>
    </v-row>

    <!-- Research creating dialog -->
    <v-dialog
      v-model="researchDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <h1 class="display-1">Новое исследование</h1>
        </v-card-title>
        <v-divider class="mb-8"></v-divider>

        <v-card-text class="pb-0">
          <v-row class="form-grid">
            <v-col cols="7">
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
            <v-col cols="5">
              <vue-dropzone
                ref="myVueDropzone"
                id="dropzone"
                class="dropzone small"
                :options="dropzoneOptions"
              ></vue-dropzone>
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
export default {
  components: {
    vueDropzone: vue2Dropzone
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
        url: '#',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFilesize: 1,
        dictDefaultMessage: "<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",
        headers: { "Header": "header value" }
      },
      researchDialog: false
    }
  },
  methods: {
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
      // this.$store.commit('setResearch', {})
    }
  },
  computed: {
    acceptance () {
      return this.$store.getters.acceptance
    },
    acceptances() {
      return this.$store.getters.acceptances.data
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
    acceptancesMessage () {
      return this.$store.getters.acceptancesMessage
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.$store.dispatch('getAcceptance', this.id)
    this.$store.dispatch('getAcceptances')
    this.getQuarters()
    this.getEmployees()
  },
  beforeDestroy () {
    this.$store.commit('setAcceptancesMessage', false)
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
      this.getRow(this.acceptance.blocks_id)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropzone {
    min-height: 400px;
    &.small {
      min-height: 228px !important;
    }
  }
</style>
