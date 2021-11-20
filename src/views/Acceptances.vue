<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Приемки</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- Acceptance creating dialog -->
    <v-dialog
      v-model="acceptanceDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          color="light-grey"
          v-bind="attrs"
          v-on="on"
          class="mb-4"
          @click="openAcceptance"
        >
          + Добавить приемку
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="display-1">Новая приемка</h1>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="pb-0">

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

          <v-text-field label="Номер" outlined v-model="acceptance.uuid"></v-text-field>

          <!-- <v-select
            :items="warehouses"
            v-model.number="acceptance.warehouse_id"
            outlined
            label="Место хранения"
            item-text="name"
            item-value="id"
          ></v-select> -->

          <v-text-field label="Значение" outlined v-model.number="acceptance.value"></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="createAcceptance" class="mr-3">Создать</v-btn>
          <v-btn depressed color="light-grey" @click="closeAcceptance" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Acceptance creating dialog -->

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Дата
        </v-col>
        <v-col cols="3">
          Работник
        </v-col>
        <v-col cols="1">
          Кол-во
        </v-col>
        <v-col cols="3">
          Контрагент
        </v-col>
        <v-col cols="2">
          Склад
        </v-col>
      </v-row> 

      <v-row class="tree-row tree-folders" v-for="item in acceptances" :key="item.id" @click="goToAcceptance(item.id)">
        <v-col cols="2">
          {{ item.acceptance_date | moment('DD.MM.YYYY') }}
        </v-col>
        <v-col cols="3">
          {{ item.employee_fio }}
        </v-col>
        <v-col cols="1">
          {{ item.quantity }}
        </v-col>
        <v-col cols="2">
          {{ item.contractor }}
        </v-col>
        <v-col cols="3">
          {{ item.warehouse_name }}
        </v-col>
        <v-col cols="1" class="text-right">
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
        @input="getAcceptances()"
      ></v-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Acceptances',
  data() {
    return {
      acceptanceDialog: false,
      activePicker: null,
      date: null,
      menu: false,
      id: 0
    }
  },
  methods: {
    getAcceptances() {
      this.$store.dispatch('getAcceptances')
    },
    goToAcceptance(id) {
      this.$router.push('/acceptance/' + id)
    },
    createAcceptance () {
      this.acceptanceDialog = false
      this.date = null
      this.$store.dispatch('createAcceptance')
    },
    openAcceptance () {
      this.$store.commit('setAcceptance', {})
    },
    closeAcceptance () {
      this.date = null
      this.acceptanceDialog = false
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.acceptance.acceptance_date = day.toISOString()
    }
  },
  computed: {
    acceptances() {
      return this.$store.getters.acceptances.data
    },
    acceptance() {
      return this.$store.getters.acceptance
    },
    paginator() {
      return this.$store.getters.acceptances.paginator
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getAcceptances()
  },
  watch:{
  }
}
</script>

<style lang="scss">
  .row {
    cursor: pointer;
  }
</style>
