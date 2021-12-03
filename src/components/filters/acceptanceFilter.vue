<template>
  <div class="filter">
    <v-row>
      <v-col cols="2">
        <v-autocomplete
          :items="searchedContractors"
          v-model.number="acceptanceFilter.contractor_id"
          outlined
          rounded
          dense
          clearable
          label="Контрагент"
          item-text="name"
          item-value="id"
          @input.native="searchСontractor($event)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="acceptanceFilter.uuid"
          label="Номер приемки"
          outlined
          rounded
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-autocomplete
          :items="searchedProducts"
          v-model.number="acceptanceFilter.product_id"
          outlined
          rounded
          dense
          clearable
          label="Продукция"
          item-text="name"
          item-value="id"
          @input.native="searchProduct($event)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-menu
          ref="fromDateMenu"
          v-model="fromDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fromDate"
              label="Начиная с даты"
              outlined
              rounded
              dense
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="cleanFromDate"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fromDate"
            :active-picker.sync="activePicker"
            @change="saveFromDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-menu
          ref="toDateMenu"
          v-model="toDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="toDate"
              label="Заканчивая датой"
              outlined
              rounded
              dense
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="cleanToDate"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="toDate"
            :active-picker.sync="activePicker"
            @change="saveToDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="light-grey"
          dense
          rounded
          outlined
          block
          @click="getAcceptances"
        >Фильтровать</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AcceptanceFilter',
  data() {
    return {
      activePicker: null,
      fromDate: null,
      fromDateMenu: false,
      toDate: null,
      toDateMenu: false,
    }
  },
  methods: {
    getAcceptances () {
      this.$store.dispatch('getAcceptances')
    },
    searchProduct (e) {
      this.$store.dispatch('searchProduct', e.target.value)
    },
    searchСontractor (e) {
      this.$store.dispatch('searchСontractor', e.target.value)
    },
    saveFromDate (fromDate) {
      this.$refs.fromDateMenu.save(fromDate)
      let day = new Date(this.fromDate)
      this.acceptanceFilter.from_date = day.toISOString()
    },
    cleanFromDate () {
      this.acceptanceFilter.from_date = null
    },
    saveToDate (toDate) {
      this.$refs.toDateMenu.save(toDate)
      let day = new Date(this.toDate)
      this.acceptanceFilter.to_date = day.toISOString()
    },
    cleanToDate () {
      this.acceptanceFilter.to_date = null
    }
  },
  computed: {
    acceptanceFilter () {
      return this.$store.getters.acceptanceFilter
    },
    searchedProducts () {
      return this.$store.getters.searchedProducts
    },
    searchedContractors () {
      return this.$store.getters.searchedContractors
    },
  },
  created() {
  }
}
</script>

<style lang="scss">
  .filter {
    background: #f3f3f3;
    margin-bottom: 20px;
    border-radius: 32px;
    height: 72px;
    padding: 16px;
    .v-btn {
      height: 40px !important;
    }
  }
</style>