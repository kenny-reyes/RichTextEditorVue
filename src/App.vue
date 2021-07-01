<template>
  <div id="app">
    <RichText v-model="lessonItem.text" />
    <v-spacer />
    <TextBox :value.sync="lessonItem.text" :label="label" :rules="rule.text" />
    <span>{{ lessonItem.text }}</span>

    <div class="ql-container ql-snow" style="border-width: 0">
      <div class="ql-editor" v-html="lessonItem.text"></div>
    </div>
    <div class="ql-editor" v-html="lessonItem.text"></div>
    <HelloWorld :entrada="lessonItem.text"></HelloWorld>
  </div>
</template>

<script>
import RichText from "./components/RichText.vue";
import TextBox from "./components/TextBox";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    TextBox,
    RichText,
    HelloWorld

  },
  data() {
    return {
      lessonItem: {
        id: 0,
        code: "",
        name: "",
        description: "",
        text: "",
        difficulty: "",
        order: 0,
        topicId: 0,
        programId: 0,
        duration: "00:10:00",
      },
      label: "Hola",
    };
  },
  computed: {
    rule() {
      return {
        text: [(v) => !!v || "common.rules.required"],
      };
    },
  },
  watch: {
    lesson: {
      handler: function (lesson) {
        let lessonAux;
        lessonAux.form.text = "Hola";
        this.lessonItem = Object.assign({}, lesson);
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
