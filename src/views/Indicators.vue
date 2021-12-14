<template>
  <div>
    <div @click="$router.back()" class="back-btn">
      <v-icon class="ml-0">chevron_left</v-icon>назад
    </div>
    <v-row>
      <v-col>
        <h1 class="display-1">Показатели исследований</h1>
      </v-col>
      <v-col class="text-right">
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
              @click="openIndicator()"
            >
              + Добавить показатель
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
              <!-- <v-text-field label="Цвет" outlined v-model="indicator.color"></v-text-field> -->

              <v-select
                :items="indicatorsGroups"
                v-model="indicator.indicator_group_id"
                outlined
                label="Группа индикаторов"
                item-text="name"
                item-value="id"
              ></v-select>

              <v-select
                :items="measurementUnits"
                v-model="indicator.measurement_unit_id"
                outlined
                label="Единица измерения"
                item-text="name"
                item-value="id"
              ></v-select>

              <v-color-picker
                hide-inputs
                width="600"
                swatches-max-height="200"
                v-model="selectedColor"
              ></v-color-picker>

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
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="indicatorsGroup in indicatorsGrouped"
        :key="indicatorsGroup.group_name"
      >
        {{ indicatorsGroup.group_name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tabs-box">
      <v-tab-item
        v-for="indicatorsGroup in indicatorsGrouped"
        :key="indicatorsGroup.group_name"
      >
        <v-card flat>
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

            <v-row class="tree-row" v-for="item in indicatorsGroup.Indicators" :key="item.id">
              <v-col cols="2">
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

        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
export default {
  name: 'indicators',
  data() {
    return {
      tab: null,
      indicatorDialog: false,
      selectedColor: ''
    }
  },
  methods: {
    getIndicatorsGrouped() {
      this.$store.dispatch('getIndicatorsGrouped')
    },
    getIndicatorsGroups() {
      this.$store.dispatch('getIndicatorsGroups')
    },
    createIndicator () {
      this.$store.dispatch('createIndicator')
      this.indicatorDialog = false
    },
    updateIndicator () {
      this.indicatorDialog = false
      this.$store.dispatch('updateIndicator')
    },
    openIndicator (item) {
      this.indicatorDialog = true
      if (item.id) {
        this.$store.commit('setIndicator', item)
      } else {
        this.$store.commit('setIndicator', {})
      }
    },
    deleteIndicator (item) {
      this.indicatorDialog = false
      confirm('Вы уверены что хотите удалить индикатор? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteIndicator', item)
    },
    closeIndicator () {
      this.indicatorDialog = false
      this.getIndicatorsGrouped()
    },
    getMeasurementUnits () {
      this.$store.dispatch('getMeasurementUnits')
    },
  },
  computed: {
    indicatorsGrouped () {
      return this.$store.getters.indicatorsGrouped
    },
    indicatorsGroups () {
      return this.$store.getters.indicatorsGroups.data
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
    this.getIndicatorsGrouped()
    this.getIndicatorsGroups()
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
