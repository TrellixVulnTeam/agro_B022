<template>
  <div class="blocks">
    <div @click="$router.push('/departments')" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>

    <v-row>
      <v-col cols="8">
        <h1 class="display-1">{{department.department}} / Сотрудники</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn depressed color="light-grey" @click="openEmployeeDialog(department.department)">+ Добавить Пользователя</v-btn>
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
          <h1 class="display-1">Редактирование пользователя</h1>
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
              <v-select
                :items="employeesByDepts"
                v-model="employee.department"
                outlined
                label="Департамент"
                item-text="department"
                item-value="department"
              ></v-select>
              <v-text-field label="Должность" outlined v-model="employee.position"></v-text-field>
              <v-textarea label="Описание" outlined v-model="employee.description"></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="employee.id">
          <v-btn depressed color="light-grey" @click="closeEmployee" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-grey" @click="updateEmployee" class="mr-3">Обновить</v-btn>
          </div>
          <div v-else>
          <v-btn depressed color="light-grey" @click="closeEmployee" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-grey" @click="createEmployee" class="mr-3">Создать</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Employee creating dialog -->

    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          ФИО
        </v-col>
        <v-col cols="3">
          Телефон
        </v-col>
        <v-col cols="3">
          Email
        </v-col>
        <v-col cols="2">
          Должность
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
      <v-row class="tree-row" v-for="employee in department.Employees" :key="employee.id">
        <v-col cols="3">
          <span class="folder-name">
            {{ employee.fio }}
          </span>
        </v-col>
        <v-col cols="3">
          {{ employee.phone }}
        </v-col>
        <v-col cols="3">
          {{ employee.email }}
        </v-col>
        <v-col cols="2">
          {{ employee.position }}
        </v-col>
        <v-col cols="1" class="text-right actions">
          <v-icon
            small
            class="mr-2"
            @click="editItem(employee)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(employee)"
          >
            mdi-delete
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      // employees: [],
      employeesDialog: false
    }
  },
  // props: [ 'department' ],
  methods: {
    openEmployeeDialog (department) {
      this.employeesDialog = true
      this.employee.department = department
    },
    createEmployee () {
      this.employeesDialog = false
      this.$store.dispatch('createEmployees')
    },
    // getEmployeesByDepts() {
    //   this.$store.dispatch('getEmployeesByDepts')
    // },
    editItem (employee) {
      this.employeesDialog = true
      this.$store.commit('setEmployee', employee)
    },
    deleteItem (employee) {
      confirm('Вы уверены что хотите удалить "' + employee.fio + '"? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteEmployee', employee)
    },
    updateEmployee () {
      this.employeesDialog = false
      this.$store.dispatch('updateEmployee')
    },
    closeEmployee () {
      this.employeesDialog = false
      this.$store.commit('setEmployees', {})
    },
  },
  computed: {
    employee () {
      return this.$store.getters.employee
    },
    employeesByDepts() {
      return this.$store.getters.employeesByDepts
    },
    department() {
      return this.$store.getters.department
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    // this.getEmployeesByDepts()
  },
  watch:{
    // employeesByDepts() {
    //   this.employees = this.employeesByDepts[this.id].Employees
    // }
  }
}
</script>

<style lang="scss">
</style>
