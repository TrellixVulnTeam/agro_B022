<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Исследования</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- Research creating dialog -->
    <v-dialog
      v-model="researchDialog"
      persistent
      max-width="1200px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          color="light-grey"
          v-bind="attrs"
          v-on="on"
          class="mb-4"
          @click="openResearch"
        >
          + Добавить исследование
        </v-btn>
      </template>
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
                class="dropzone"
                :options="dropzoneOptions"
              ></vue-dropzone>
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
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed x-large color="success" @click="createResearch" class="mr-3">Принять продукцию</v-btn>
          <v-btn depressed x-large color="light-grey" @click="closeResearch" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Research creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Дата
        </v-col>
        <v-col cols="2">
          Приемка
        </v-col>
        <v-col cols="4">
          Количество
        </v-col>
        <v-col cols="2">
          Статус
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in researches" :key="item.id" @click="goToResearch(item.id)">
        <v-col cols="3">
          {{ item.research_date | moment('DD.MM.YYYY') }}
        </v-col>
        <v-col cols="2">
          {{ item.acceptance_id }}
        </v-col>
        <v-col cols="4">
          {{ item.quantity }}
        </v-col>
        <v-col cols="2">
          {{ item.status }}
        </v-col>
        <v-col cols="1" class="text-right actions">
          <!-- <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </div> -->
        </v-col>
      </v-row>
    </v-container>
    <div class="text-left mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getResearches()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
export default {
  name: 'Researches',
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      researchDialog: false,
      activePicker: null,
      date: null,
      menu: false,
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
    getResearches() {
      this.$store.dispatch('getResearches')
    },
    getAcceptances() {
      this.$store.dispatch('getAcceptances')
    },
    getEmployees () {
      this.$store.dispatch('getEmployees')
    },
    goToResearch (id) {
      this.$router.push('/research/' + id)
    },
    createResearch () {
      this.$store.dispatch('createResearch')
    },
    openResearch () {
      this.date = null
      this.$store.commit('setResearch', {})
    },
    closeResearch () {
      this.date = null
      this.researchDialog = false
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.research.research_date = day.toISOString()
    },
    searchСontractor (e) {
      this.$store.dispatch('searchСontractor', e.target.value)
    }
  },
  computed: {
    researches () {
      return this.$store.getters.researches.data
    },
    research () {
      return this.$store.getters.research
    },
    paginator() {
      return this.$store.getters.researches.paginator
    },
    researchStatuses() {
      return this.$store.getters.researchStatuses
    },
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    contractors () {
      return this.$store.getters.contractors.data
    },
    employees () {
      return this.$store.getters.employees
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getResearches()
    this.getAcceptances()
    this.getEmployees()
  },
  watch: {
    researches () {
      this.researches.forEach(research => {
        this.researchStatuses.forEach(status => {
          if (research.status == status.value) {
            research.status = status.name
          }
        })
      })
    },
    acceptances () {
      this.acceptances.forEach(acceptance => {
        acceptance.acceptance_label = this.$moment.utc(acceptance.acceptance_date).format('YYYY.MM.DD - hh:mm') + ' : ' + acceptance.contractor
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-row {
    cursor: pointer;
  }
  .dropzone {
    min-height: 228px;
    margin-bottom: 20px;
  }
</style>
