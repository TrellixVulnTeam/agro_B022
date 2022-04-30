<template>
  <div>
      <div @click="$router.back()" class="back-btn">
        <v-icon class="ml-0">chevron_left</v-icon>назад
      </div>
      <h1 class="display-1">Редактирование вида плодовой продукции {{productname}}</h1>
      <v-divider class="mt-2 mb-8"></v-divider>

      <v-row class="form-grid">
        <v-col cols="6">

          <!-- <v-text-field label="Наименование" outlined v-model="row.name"></v-text-field> -->
          <v-text-field label="Описание" outlined v-model="row.description"></v-text-field>

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
              type="month"
              :active-picker.sync="activePicker"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-text-field label="Количество деревьев" outlined v-model.number="row.trees_count"></v-text-field>

        </v-col>
        <v-col cols="6">
          <productSelector @returnItem="setProduct" :product="product" class="mb-7" />

          <v-select
            :items="landingSchemas.data"
            v-model.number="row.landing_schemas_id"
            outlined
            label="Схема посадки(м)"
            item-text="name"
            item-value="id"
          ></v-select>
          <v-select
            :items="rootstocks"
            v-model="row.rootstock_id"
            outlined
            label="Подвой"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-col>
      </v-row>
    <v-btn depressed color="light-grey" @click="updateRow" class="mr-3">Обновить</v-btn>
    <v-btn depressed color="light-grey" @click="deleteRow" class="mr-3">Удалить</v-btn>
  </div>
</template>

<script>
// import productSelector from '@/components/selectors/productSelector'
const productSelector = () => ({
  component: import('@/components/selectors/productSelector'),
  delay: 200,
  timeout: 3000
})

export default {
  name: 'rows',
  props: ['id', 'productname', 'productid'],
  components: {
    productSelector
  },
  data() {
    return {
      product: {},
      activePicker: null,
      date: null,
      menu: false
    }
  },
  methods: {
    getRow () {
      this.$store.dispatch('getRow', this.id)
    },
    updateRow () {
      this.$store.dispatch('updateRow')
    },
    createRow () {
      delete this.row.product
      this.$store.dispatch('createRow')
    },
    deleteRow () {
      confirm('Вы уверены что хотите удалить ряд? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteRow', this.row)
      this.$router.go(-1)
    },
    setProduct (payload) {
      this.row.product_id = payload.id
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.row.plant_date = day.toISOString()
    },
    getLandingSchemas() {
      this.$store.dispatch('getLandingSchemas')
    },
    getRootstocks() {
      this.$store.dispatch('getRootstocks')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    row () {
      return this.$store.getters.row
    },
    landingSchemas () {
      return this.$store.getters.landingSchemas
    },
    rootstocks () {
      return this.$store.getters.rootstocks.data
    }
  },
  watch: {
    row() {
      this.date = this.$moment.utc(this.row.plant_date).format('YYYY-MM')
    }
  },
  created() {
    this.product = {
      name: this.productname,
      id: this.productid
    }
    this.getRow()
    this.getLandingSchemas()
    this.getRootstocks()
  }
}
</script>

<style lang="scss" scoped>
</style>
