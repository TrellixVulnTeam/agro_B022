<template>
  <div>
    <div @click="$router.push('/organization')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Департаменты</h1>
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

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row
        class="tree-row tree-folders"
        v-for="(folder, index) in employeesByDepts"
        :key="index"
      >
        <v-col cols="12">
          <span class="folder-name" @click="goToDepartment(folder)">
            <v-icon color="blue">folder</v-icon>
            {{ folder.department }}
          </span>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
// const departamentBlock = () => import('@/components/departamentBlock')
export default {
  name: 'Departments',
  components: {
    // departamentBlock
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
    goToDepartment (folder) {
      this.$store.commit('setDepartment', folder)
      this.$router.push('/department/' + folder.department)
    }
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
