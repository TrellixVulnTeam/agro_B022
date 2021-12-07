<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Контрагент</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <div class="contractor-info">
      <v-row>
        <v-col>
          <h3>Полное название организации</h3>
          <v-text-field v-model="contractor.account_name" placeholder="Введите полное название организации"></v-text-field>

          <h3>Юридический адрес</h3>
          <v-text-field v-model="contractor.requisites.legal_address" placeholder="Введите юридический адрес"></v-text-field>

          <h3>Почтовый адрес</h3>
          <v-text-field v-model="contractor.requisites.real_address" placeholder="Введите почтовый адрес"></v-text-field>

          <h3>ФИО руководителя организации</h3>
          <v-text-field v-model="contractor.requisites.full_name" placeholder="Введите ФИО руководителя организации"></v-text-field>

          <h3>ОГРН</h3>
          <v-text-field v-model="contractor.requisites.ogrn" placeholder="Введите ОГРН"></v-text-field>

          <h3>ИНН</h3>
          <v-text-field v-model="contractor.requisites.inn" placeholder="Введите ИНН"></v-text-field>

          <h3>КПП</h3>
          <v-text-field v-model="contractor.requisites.kpp" placeholder="Введите КПП"></v-text-field>

          <h3>БИК</h3>
          <v-text-field v-model="contractor.requisites.bik" placeholder="Введите БИК"></v-text-field>

          <h3>Наименование банка</h3>
          <v-text-field v-model="contractor.requisites.bank_name" placeholder="Введите наименование банка"></v-text-field>

          <h3>Расчетный счет</h3>
          <v-text-field v-model="contractor.requisites.billing_account" placeholder="Введите расчетный счет"></v-text-field>

          <h3>Корреспондентский счет</h3>
          <v-text-field v-model="contractor.requisites.bank_account" placeholder="Введите корреспондентский счет"></v-text-field>

          <v-btn depressed color="success" @click="updateContractor" class="mr-3">Обновить</v-btn>
          <v-btn depressed color="error" @click="deleteContractor" class="mr-3">Удалить</v-btn>

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
  name: 'Contractor',
  props: ['id'],
  data() {
    return {
    }
  },
  methods: {
    updateContractor() {
      this.$store.dispatch('updateContractor')
    },
    deleteContractor() {
      this.$store.dispatch('deleteContractor')
    }
  },
  computed: {
    contractor() {
      return this.$store.getters.contractor
    }
  },
  created () {
    this.$store.dispatch('getContractor', this.id)
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
      margin-bottom: -15px;
    }
    .v-input  {
      // display: inline-block;
      font-size: 15px;
      margin-bottom: 10px;
    }
    .v-btn--rounded {
      border-radius: 16px;
    }
  }
</style>
