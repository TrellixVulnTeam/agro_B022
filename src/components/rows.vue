<template>
  <div>

    <v-btn
      depressed
      color="light-grey"
      class="mb-4"
      @click="newRow"
    >
      + Вид плодовой продукции
    </v-btn>

    <v-dialog
      v-model="rowDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="row.id">Редактирование вида плодовой продукции</span>
          <span class="text-h5" v-else><h1 class="display-1">Новый вид плодовой продукции</h1></span>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="pb-0">

          <productSelector @returnItem="setProduct" :product="row.product" class="mb-7" />

          <v-select
            :items="rootstocks"
            v-model="row.rootstock_id"
            outlined
            label="Подвой"
            item-text="name"
            item-value="id"
          ></v-select>

          <v-select
            :items="landingSchemas.data"
            v-model.number="row.landing_schemas_id"
            outlined
            label="Схема посадки(м)"
            item-text="name"
            item-value="id"
          ></v-select>
          <v-text-field label="Количество деревьев" outlined v-model.number="row.trees_count"></v-text-field>

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
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <div v-if="row.id">
            <v-btn depressed color="light-grey" @click="closeRow" class="mr-3">Закрыть</v-btn>
            <v-btn depressed color="light-grey" @click="updateRow" class="mr-3">Обновить</v-btn>
          </div>
          <div v-else>
            <v-btn depressed color="light-grey" @click="closeRow" class="mr-3">Закрыть</v-btn>
            <v-btn depressed color="light-grey" @click="createRow" class="mr-3">Создать</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Продукция
        </v-col>
        <v-col cols="2">
          Описание
        </v-col>
        <v-col cols="2">
          Схема посадки
        </v-col>
        <v-col cols="1">
          Дата
        </v-col>
        <v-col cols="2">
          Подвой
        </v-col>
        <v-col cols="2">
          Количество деревьев
        </v-col>
        <v-col cols="1" class="text-right">
        </v-col>
      </v-row>

      <v-row class="tree-row product_rows" v-for="row in block.rows" :key="row.id">
        <v-col cols="2">
          {{ row.product_name }}
        </v-col>
        <v-col cols="2">
          {{ row.description }}
        </v-col>
        <v-col cols="2">
          {{ row.row_landing_schema_name }}
        </v-col>
        <v-col cols="1">
          {{ row.plant_date | moment('MM.YYYY') }}
        </v-col>
        <v-col cols="2">
          {{ row.rootstock_name }}
        </v-col>
        <v-col cols="2">
          {{ row.trees_count }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="$router.push('/quarters/row/' + row.id + '/' + row.product_name + '/' + row.product_id )"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteRow(row)"
            >
              mdi-delete
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import productSelector from '@/components/selectors/productSelector'
export default {
  name: 'rows',
  props: ['block'],
  components: {
    productSelector
  },
  data() {
    return {
      rowDialog: false,
      activePicker: null,
      date: null,
      menu: false
    }
  },
  methods: {
    editRow (row) {
      this.rowDialog = true
      // this.$store.commit('setRow', {})
      this.$store.dispatch('getRow', row.id)
    },
    newRow () {
      this.rowDialog = true
      this.$store.commit('setRow', {})
      this.$store.commit('setRowBlock', this.block.block_id)
    },
    updateRow () {
      this.$store.dispatch('updateRow')
      this.rowDialog = false
    },
    createRow () {
      delete this.row.product
      this.$store.dispatch('createRow')
      this.rowDialog = false
    },
    closeRow () {
      this.rowDialog = false
    },
    deleteRow (row) {
      confirm('Вы уверены что хотите удалить ряд? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteRow', row)
      this.rowDialog = false
    },
    setProduct (payload) {
      this.row.product_id = payload.id
    },
    save (date) {
      this.$refs.menu.save(date)
      let day = new Date(this.date)
      this.row.plant_date = day.toISOString()
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
      this.row.product = {
        name: this.row.product_name,
        id: this.row.product_id
      }
      this.date = this.$moment.utc(this.row.plant_date).format('YYYY-MM')
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  #app {
    .tree-box {
      .tree-row.product_rows {
        cursor: default;
        .actions {
          display: none !important;
        }
        &:hover {
          .actions {
            display: block !important;
          }
        }
      }
    }
  }
</style>
