<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Сведения о организации (Реквизиты компании) </h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <div class="contractor-info">
      <v-row>
        <v-col>
          <h3>Полное название организации</h3>
          <span class="value">{{contractor.account_name}}</span>

          <h3>Юридический адрес</h3>
          <span class="value">{{contractor.legal_address}}</span>

          <h3>Почтовый адрес</h3>
          <span class="value">{{contractor.real_address}}</span>

          <h3>ФИО руководителя организации</h3>
          <span class="value">{{contractor.full_name}}</span>

          <h3>ОГРН</h3>
          <span class="value">{{contractor.ogrn}}</span>

          <h3>ИНН</h3>
          <span class="value">{{contractor.inn}}</span>

          <h3>КПП</h3>
          <span class="value">{{contractor.kpp}}</span>

          <h3>БИК</h3>
          <span class="value">{{contractor.bik}}</span>

          <h3>Наименование банка</h3>
          <span class="value">{{contractor.bank_name}}</span>

          <h3>Расчетный счет</h3>
          <span class="value">{{contractor.billing_account}}</span>

          <h3>Корреспондентский счет</h3>
          <span class="value">{{contractor.bank_account}}</span>

        </v-col>

        <v-col class="text-right">
          <v-btn
            fab
            icon
            outlined
            rounded
            class="ml-4">
            <v-icon>mdi-application-edit-outline</v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            rounded
            class="ml-4">
            <v-icon>mdi-tray-arrow-down</v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            rounded
            class="ml-4">
            <v-icon>mdi-printer-outline</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    contractor() {
      return this.$store.getters.contractor
    }
  },
  created () {
    this.$store.dispatch('getContractor', 1)
  }
}
</script>

<style scoped lang="scss">
  .contractor-info {
    h3 {
      font-weight: bold;
      font-size: 15px;
      line-height: 20px;
      color: #8E8E8E;
      margin-bottom: 5px;
    }
    .value {
      display: inline-block;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .v-btn--rounded {
      border-radius: 16px;
    }
  }
</style>
