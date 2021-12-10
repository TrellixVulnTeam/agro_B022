<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Сотрудники/пользователи</h1>
      </v-col>
      <v-col cols="4" class="text-right">
      </v-col>
    </v-row>

    <v-divider class="mt-2 mb-8"></v-divider>

    <!-- Employee creating dialog -->
    <v-dialog
      v-model="employeesDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <h1 class="display-1">Новый пользователь</h1>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>

        <v-card-text class="pb-0">
          <v-row>
            <v-col class="pb-0">
              <v-text-field label="ФИО" outlined v-model="employee.fio"></v-text-field>
              <v-text-field label="Телефон" outlined v-model="employee.phone"></v-text-field>
              <v-text-field label="Email" outlined v-model="employee.email"></v-text-field>
              <v-text-field label="Роль" outlined v-model="employee.role"></v-text-field>
            </v-col>
            <v-col class="pb-0">
              <v-text-field label="Департамент" outlined v-model="employee.department"></v-text-field>
              <v-text-field label="Должность" outlined v-model="employee.position"></v-text-field>
              <v-textarea label="Описание" outlined v-model="employee.description"></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeEmployees" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-grey" @click="createEmployees" class="mr-3">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Employee creating dialog -->

    <v-row class="tree-row mb-4" v-for="dep in employeesByDepts" :key="dep.id">
      <v-col cols="10">
        <span class="headline mr-4">{{ dep.department }}</span>
        <v-btn depressed color="light-grey" @click="openEmployeeDialog(dep.department)">+ Добавить Пользователя</v-btn>
      </v-col>
      <v-col cols="12">
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <!-- Component with table of Employees -->
        <departamentBlock :employees="dep.Employees"></departamentBlock>
        <!-- / Component with table of Employees -->
      </v-col>
    </v-row>

  </div>
</template>

<script>
const departamentBlock = () => import('@/components/departamentBlock')
export default {
  name: 'Empl',
  components: {
    departamentBlock
  },
  data() {
    return {
      employeesDialog: false,
    }
  },
  methods: {
    getEmployeesByDepts() {
      this.$store.dispatch('getEmployeesByDepts')
    },
    // editQuarter(quarter) {
    //   this.$router.push('/quarter/' + quarter.id)
    // },
    // deleteQuarter(quarter) {
    //   this.$store.dispatch('deleteQuarter', quarter)
    // },
    // createQuarter () {
    //   this.quarterDialog = false
    //   this.quarter.garden_id = parseInt(this.garden_id)
    //   this.$store.dispatch('createQuarter', this.quarter)
    // },
    // closeQuarter () {
    //   this.quarterDialog = false
    //   this.quarter.name = ''
    // },
    openEmployeeDialog (department) {
      this.employeesDialog = true
      this.employee.department = department
    },
    createEmployees () {
      this.employeesDialog = false
      this.$store.dispatch('createEmployees')
    },
    closeEmployees () {
      this.employeesDialog = false
      this.$store.commit('setEmployees', {})
    },
  },
  computed: {
    employeesByDepts() {
      return this.$store.getters.employeesByDepts
    },
    employee() {
      return this.$store.getters.employee
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getEmployeesByDepts()
  },
  watch:{
  }
}
</script>

<style lang="scss">
</style>
