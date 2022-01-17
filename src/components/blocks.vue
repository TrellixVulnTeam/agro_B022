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
          <v-text-field label="Размер" outlined v-model="block.size"></v-text-field>
          <v-textarea label="Описание" outlined v-model="block.description"></v-textarea>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn depressed color="light-grey" @click="closeBlock" class="mr-3">Закрыть</v-btn>
          <v-btn depressed color="light-grey" @click="updateBlock" class="mr-3">Обновить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Block creating dialog -->

    <v-container class="tree-box" fluid>
      <v-row class="tree-header">
        <v-col cols="2">
          Блок
        </v-col>
        <v-col cols="10">
          Виды плодовой продукции
        </v-col>
      </v-row>
      <v-row class="tree-row" v-for="block in blocks" :key="block.id">
        <!-- <v-col cols="2" @click="openBlock(block.id)"> -->
        <v-col cols="2">
          <div>
            Название: {{ block.block_name }}
          </div>
          <div>
            Размер: {{ block.block_size }}
          </div>
          <div>
            {{ block.block_description }}
          </div>
          <v-icon
            small
            class="mr-2"
            @click="editItem(block)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(block)"
          >
            mdi-delete
          </v-icon>
        </v-col>
        <v-col cols="10">
          <!-- Component with table of rows -->
          <rows :block="block"></rows>
          <!-- / Component with table of rows -->
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
import rows from '@/components/rows'
// import { nameTheLandingSchemas } from '@/helpers/helpers.js'
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
  props: [ 'quarter_id'],
  components: {
    rows
  },
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
      .catch(() => {
        this.$store.commit('setLoading', false)
      })
    },
    editItem (block) {
      console.log(block)
      this.blockDialog = true
      this.$store.commit('setBlock', block)
    },
    deleteItem (block) {
      confirm('Вы уверены что хотите удалить блок? Вернуть его уже будет нельзя!') && this.$store.dispatch('deleteBlock', block)
      setTimeout(() => {
        this.getBlocks()
      }, 500)
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
    },
    openBlock (id) {
      this.$router.push('/blocks/' + id)
    },
    getLandingSchemas() {
      this.$store.dispatch('getLandingSchemas')
    },
    getRootstocks() {
      this.$store.dispatch('getRootstocks')
    }
  },
  computed: {
    block () {
      return this.$store.getters.block
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getBlocks()
    this.getLandingSchemas()
    this.getRootstocks()
  },
  watch: {
    // blocks() {
    //   this.blocks.forEach(block => {
    //     block.landing_schema = nameTheLandingSchemas(block, this.landingSchemas.data)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .tree-box {
    .tree-row {
      cursor: default;
      border-bottom: 1px solid #DEDEDE;
      &:last-child {
        border: none;
      }
      &:nth-child(odd) {
        background: none !important;
      }
      &:hover {
        background: none !important;
      }
    }
  }
</style>
