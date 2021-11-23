<template>
  <div>

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

          <v-text-field label="Партия" outlined v-model="acceptance.batch_name"></v-text-field>

          <v-text-field label="Значение" outlined v-model.number="acceptance.value"></v-text-field>

          <v-select
            :items="employees"
            v-model.number="acceptance.employee_id"
            outlined
            label="Сотрудник"
            item-text="fio"
            item-value="id"
          ></v-select>

          <v-autocomplete
            :items="contractors"
            v-model.number="acceptance.contractor_id"
            outlined
            label="Контрагент"
            item-text="name"
            item-value="id"
            @input.native="searchСontractor($event)"
          ></v-autocomplete>

          <v-autocomplete
            :items="products"
            v-model.number="acceptance.product_id"
            outlined
            label="Продукция"
            item-text="name"
            item-value="id"
            @input.native="searchProduct($event)"
          ></v-autocomplete>

          <v-autocomplete
            :items="warehouses"
            v-model.number="acceptance.warehouse_id"
            outlined
            label="Склад"
            item-text="name"
            item-value="id"
            @input.native="searchWarehouse($event)"
          ></v-autocomplete>

          <h3>Расположение</h3>
          <hr class="mb-6">

          <v-select
            :items="gardens"
            v-model.number="garden_id"
            outlined
            label="Сад"
            item-text="name"
            item-value="id"
          ></v-select>

          <v-select
            :items="quarters"
            v-model.number="quarter_id"
            outlined
            label="Квартал"
            item-text="name"
            item-value="id"
            :disabled="!garden_id"
          ></v-select> 

          <v-select
            :items="blocks"
            v-model.number="block_id"
            outlined
            label="Блок"
            item-text="name"
            item-value="id"
            :disabled="!quarter_id"
          ></v-select> 

          <v-select
            :items="rows"
            v-model.number="acceptance.blocks_id"
            outlined
            label="Ряд"
            item-text="name"
            item-value="id"
            :disabled="!block_id"
          ></v-select> 
          <hr>

        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="createAcceptance" class="mr-3">Создать</v-btn>
          <v-btn depressed color="light-grey" @click="closeAcceptance" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Acceptance creating dialog -->
  </div>
</template>

<script>
export default {
  name: 'newAcceptance',
  data() {
    return {
      acceptanceDialog: false,
      activePicker: null,
      date: null,
      menu: false,
      id: 0,
      searchquery: '',
      garden_id: 1,
      quarter_id: null,
      block_id: null,
      row_id: null
    }
  },
  methods: {
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
    }
  },
  computed: {
    acceptance () {
      return this.$store.getters.acceptance
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
    employees () {
      return this.$store.getters.employees
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getQuarters()
    this.getEmployees()
  },
  watch:{
    quarter_id () {
      this.getBlocks()
    },
    block_id () {
      this.getRows()
    }
  }
}
</script>

<style lang="scss">
</style>
