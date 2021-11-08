<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row
          class="mt-6"
          no-gutters
        >
          <v-col md="6" offset-md="3">
           <slot/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>