<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="btnclick"></v-btn>
        <p class="red--text">{{ entrada }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    entrada: 0
  }),
  methods: {
    btnclick() {
      this.entrada = this.entrada+1;
    }
  }
}
</script>
