<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Приемка {{ acceptance.acceptance_date | moment('DD.MM.YYYY') }}</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-row>
      <v-col cols="4">
        <h6 class="headline">Продукт:</h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ product.name }}</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Склад: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ warehouse.name }}</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Количество: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ acceptance.quantity }}</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Контрагент: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ contractor.account_name }}</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Блок: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ block.name }}</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Работник: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">Dev Denis</h6>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <h6 class="headline">Комментарий: </h6>
      </v-col>
      <v-col cols="4">
        <h6 class="headline">{{ acceptance.comment }}</h6>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'acceptance',
  props: ['id'],
  data() {
    return {
    }
  },
  methods: {

  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    acceptance () {
      return this.$store.getters.acceptance
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
    }
  },
  created() {
    this.$store.dispatch('getAcceptance', this.id)
  },
  watch: {
    acceptance () {
      this.$store.dispatch('getProduct', this.acceptance.product_id)
      this.$store.dispatch('getWarehouse', this.acceptance.warehouse_id)
      this.$store.dispatch('getContractor', this.acceptance.contractor_id)
      this.$store.dispatch('getBlock', this.acceptance.blocks_id)
      // this.$store.dispatch('getEmployee', this.acceptance.employee_id)
    }
  }
}
</script>

<style lang="scss">
</style>
