<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <v-row>
      <v-col>
        <h1 class="display-1">Приемки</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn
          depressed
          color="light-grey"
          class="mb-4"
          @click="$router.push('/newacceptance')"
        >
          + Добавить приемку
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <acceptanceFilter />

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="1">
          Дата
        </v-col>
        <v-col cols="1">
          Номер
        </v-col>
        <v-col cols="3">
          Продукция
        </v-col>
        <v-col cols="2">
          Работник
        </v-col>
        <v-col cols="1">
          Кол-во
        </v-col>
        <v-col cols="2">
          Контрагент
        </v-col>
        <v-col cols="2">
          Склад
        </v-col>
      </v-row>

      <v-row class="tree-row tree-folders" v-for="item in acceptances" :key="item.id" @click="goToAcceptance(item.id)">
        <v-col cols="1">
          {{ item.acceptance_date | moment('DD.MM.YYYY') }}
        </v-col>
        <v-col cols="1">
          {{ item.uuid }}
        </v-col>
        <v-col cols="3">
          {{ item.product_name }}
        </v-col>
        <v-col cols="2">
          {{ item.employee_fio }}
        </v-col>
        <v-col cols="1">
          {{ item.quantity }}
        </v-col>
        <v-col cols="2">
          {{ item.contractor }}
        </v-col>
        <v-col cols="2">
          {{ item.warehouse_name }}
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
import acceptanceFilter from '@/components/filters/acceptanceFilter'
export default {
  name: 'Acceptances',
  components: {
    acceptanceFilter
  },
  data() {
    return {
    }
  },
  methods: {
    getAcceptances() {
      this.$store.dispatch('getAcceptances')
    },
    goToAcceptance(id) {
      this.$router.push('/acceptance/' + id)
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
