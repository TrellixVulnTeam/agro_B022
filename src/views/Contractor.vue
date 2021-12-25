<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <h1 class="display-1">Контрагент</h1>
    <v-divider class="mt-2 mb-8"></v-divider>

    <div class="contractor-info">
      <v-row>
        <v-col class="info-fields">
          <div class="field-row">
            <h3 class="field-name">Полное название организации</h3>
            <v-text-field class="field-value" v-model="contractor.account_name" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Cокращенное наименование организации</h3>
            <v-text-field class="field-value" v-model="contractor.short_name" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Юридический адрес</h3>
            <v-textarea class="field-value" v-model="contractor.requisites.legal_address" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-textarea>
          </div>
          <div class="field-row">
            <h3 class="field-name">Почтовый адрес</h3>
            <v-textarea class="field-value" v-model="contractor.requisites.real_address" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-textarea>
          </div>
          <div class="field-row">
            <h3 class="field-name">ФИО руководителя организации</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.full_name" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Должность руководителя</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.director_role_name" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Телефон контактный</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.contact_phone" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Email руководителя</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.director_email" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">ОГРН</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.ogrn" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">ИНН</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.inn" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">КПП</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.kpp" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">БИК</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.bik" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Наименование банка</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.bank_name" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Расчетный счет</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.billing_account" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>
          <div class="field-row">
            <h3 class="field-name">Корреспондентский счет</h3>
            <v-text-field class="field-value" v-model="contractor.requisites.bank_account" placeholder="не указан" onfocus="this.placeholder=''" onblur="this.placeholder='не указан'" :disabled="!editable"></v-text-field>
          </div>

          <div v-if="editable">
            <v-btn depressed color="success" @click="updateContractor" class="mr-3">Обновить</v-btn>
            <v-btn depressed color="error" @click="deleteContractor" class="mr-3">Удалить</v-btn>
          </div>

        </v-col>

        <v-col class="text-right buttons">
          <v-btn
            fab
            icon
            outlined
            rounded
            @click="editable = !editable"
            :class="{ 'pressed' : editable == true}">
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
            @click="print()"
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
      editable: false,
      empty: 'не указан',
    }
  },
  methods: {
    updateContractor() {
      this.$store.dispatch('updateContractor')
      this.editable = false
    },
    deleteContractor() {
      confirm('Вы уверены что хотите удалить контрагента? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteContractor')
    },
    print() {
      window.print()
    }
  },
  computed: {
    contractor() {
      return this.$store.getters.contractor
    }
  },
  created () {
    this.$store.dispatch('getContractor', this.id)
  },
  beforeDestroy () {
    this.$store.commit('setContractor', {})
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
  .pressed {
    background-color: rgba(0, 0, 0, 0.54);
    border-color: rgba(0, 0, 0, 0.54);
    color: #fff !important;
  }
</style>
