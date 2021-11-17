<template>
  <div class="blocks">

    <!-- Block creating dialog -->
    <v-dialog
      v-model="blockDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"><h1 class="display-1">Редактирование блока</h1></span>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>

        <v-card-text class="pb-0">
          <v-text-field label="Наименование" outlined v-model="block.name"></v-text-field>
          <v-select
            :items="landingSchemas.data"
            v-model.number="block.landing_schemas_id"
            outlined
            label="Схема посадки(м)"
            item-text="name"
            item-value="id"
          ></v-select>
          <v-textarea label="Описание" outlined v-model="block.description"></v-textarea>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="updateBlock" class="mr-3">Обновить</v-btn>
          <v-btn depressed color="light-grey" @click="closeBlock" class="mr-3">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Block creating dialog -->

    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="3">
          Наименование
        </v-col>
        <v-col cols="2">
          Схема посадки(м)
        </v-col>
        <v-col cols="6">
          Описание
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
      <v-row class="tree-row" v-for="item in blocks" :key="item.id">
        <v-col cols="3">
          {{ item.name }}
        </v-col>
        <v-col cols="2">
          {{ item.landing_schema }}
        </v-col>
        <v-col cols="6">
          {{ item.description }}
        </v-col>
        <v-col cols="1" class="text-right actions">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="mt-4">
      <v-pagination
        depressed
        v-model="paginator.current_pages"
        :length="paginator.total_pages"
        @input="getQuarters()"
      ></v-pagination>
    </div> -->
  </div>
</template>
<script>
import { nameTheLandingSchemas } from '@/helpers/helpers.js'
export default {
  name: 'Blocks',
  data() {
    return {
      blockDialog: false,
      blocks: [],
      paginator: {
        total_pages: 1,
        current_pages: 1,
        total_items: 1
      }
    }
  },
  props: [ 'quarter_id' ],
  methods: {
    getBlocks () {
      this.$store.commit('setLoading', true)
      this.$http
      .get('blocks_units?quarter=' + this.quarter_id + '&page=' + 1)
      .then(response => {
        this.blocks = response.data.data
        this.blocks.paginator = response.paginator
        this.$store.commit('setLoading', false)
      })
      .catch(error => {
        this.$store.commit('setLoading', false)
        if (error.response.status === 401) {
          // REFRESH
          this.$router.push('/signin')
          this.$store.commit('setError', error.response.data.message)
        }
        this.$store.commit('setError', error.response.data.message)
      })
    },
    getLandingSchemas() {
      this.$store.dispatch('getLandingSchemas')
    },
    editItem (block) {
      this.blockDialog = true
      this.$store.commit('setBlock', block)
    },
    deleteItem (block) {
      this.$store.dispatch('deleteBlock', block)
      setTimeout(() => {
        this.getBlocks()
      }, 300)
    },
    updateBlock () {
      this.blockDialog = false
      this.$store.dispatch('updateBlock')
      setTimeout(() => {
        this.getBlocks()
      }, 300)
    },
    closeBlock () {
      this.blockDialog = false
      this.$store.commit('setBlock', {})
    }
  },
  computed: {
    block () {
      return this.$store.getters.block
    },
    landingSchemas () {
      return this.$store.getters.landingSchemas
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getBlocks()
    this.getLandingSchemas()
  },
  watch:{
    blocks() {
      this.blocks.forEach(block => {
        block.landing_schema = nameTheLandingSchemas(block, this.landingSchemas.data)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
