<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>Показатели исследований
    </div>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1">{{name}}</h1>
      </v-col>
      <v-col class="text-right" cols="4">
        <!-- indicator creating dialog -->
        <v-dialog
          v-model="indicatorDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="light-grey"
              v-bind="attrs"
              v-on="on"
              class="mb-4"
              @click="openIndicator({})"
            >
              + Добавить индикатор
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h1 class="display-1" v-if="indicator.id">Редактирование индикатора</h1>
              <h1 class="display-1" v-else>Новый индикатор</h1>
            </v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text class="pb-0">

              <v-text-field label="Название" outlined v-model="indicator.name"></v-text-field>
              <v-text-field label="Описание" outlined v-model="indicator.description"></v-text-field>
<!-- 
              <v-select
                :items="indicatorsGroups"
                v-model="indicator.indicator_group_id"
                outlined
                label="Группа индикаторов"
                item-text="name"
                item-value="id"
              ></v-select> -->

              <v-select
                :items="measurementUnits"
                v-model="indicator.measurement_unit_id"
                outlined
                label="Единица измерения"
                item-text="name"
                item-value="id"
              ></v-select>

              <!-- <v-color-picker
                hide-inputs
                width="600"
                swatches-max-height="200"
                v-model="selectedColor"
                mode="hexa"
              ></v-color-picker> -->

            </v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <div v-if="indicator.id">
                <v-btn depressed color="light-grey" @click="closeIndicator" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="success" @click="updateIndicator()" class="mr-3">Обновить</v-btn>
              </div>
              <div v-else>
                <v-btn depressed color="light-grey" @click="closeIndicator" class="mr-3">Закрыть</v-btn>
                <v-btn depressed color="success" @click="createIndicator()" class="mr-3">Создать</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- / indicator creating dialog -->

      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-8"></v-divider>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <!-- indicators list begin -->
    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Название
        </v-col>
        <v-col cols="1">
          Цвет
        </v-col>
        <v-col cols="6">
          Описание
        </v-col>
        <v-col cols="2">
          Единица измерения
        </v-col>
      </v-row> 

      <v-row class="tree-row" v-for="item in indicators" :key="item.id">
        <v-col cols="2">
          <v-icon>mdi-file-outline</v-icon>
          {{ item.name }}
        </v-col>
        <v-col cols="1">
          <v-chip
            :color="item.color"
            small
          >
          </v-chip>
        </v-col>
        <v-col cols="6">
          {{ item.description }}
        </v-col>
        <v-col cols="2">
          {{ item.measurement_name }}
        </v-col>
        <v-col cols="1" class="text-right">
          <div class="actions">
            <v-icon
              small
              class="mr-2"
              @click="openIndicator(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteIndicator(item)"
            >
              mdi-delete
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- indicators list end -->
  </div>
</template>

<script>
export default {
  name: 'Indicators',
  data() {
    return {
      tab: null,
      indicatorDialog: false,
      selectedColor: ''
    }
  },
  props: ['id', 'name'],
  methods: {
    getIndicators() {
      this.$store.dispatch('getIndicators')
    },
    getIndicatorsGroups() {
      this.$store.dispatch('getIndicatorsGroups')
    },
    createIndicator () {
      this.indicator.indicator_group_id = parseInt(this.id)
      this.$store.dispatch('createIndicator')
      this.indicatorDialog = false
    },
    updateIndicator () {
      this.indicatorDialog = false
      this.$store.dispatch('updateIndicator')
    },
    openIndicator (item) {
      this.indicatorDialog = true
      this.$store.commit('setIndicator', item)
      if (!item.name) {
        item.color = "#FF0202"
      }
    },
    deleteIndicator (item) {
      this.indicatorDialog = false
      confirm('Вы уверены что хотите удалить индикатор? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteIndicator', item)
    },
    closeIndicator () {
      this.indicatorDialog = false
      this.getIndicators()
    },
    getMeasurementUnits () {
      this.$store.dispatch('getMeasurementUnits')
    },
  },
  computed: {
    indicators () {
      let _all_indicators = this.$store.getters.indicators.data
      let _selected_indicators = []
      _all_indicators.forEach(indicator => {
        if (indicator.indicator_group_id == this.id) {
          _selected_indicators.push(indicator)
        }
      });
      return _selected_indicators
    },
    pagination () {
      return this.$store.getters.indicators.pagination
    },
    indicator () {
      return this.$store.getters.indicator
    },
    measurementUnits () {
      return this.$store.getters.measurementUnits.data
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getIndicators()
    this.getMeasurementUnits()
  },
  watch: {
    indicator () {
      this.selectedColor = this.indicator.color
    },
    selectedColor () {
      this.indicator.color = this.selectedColor
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
