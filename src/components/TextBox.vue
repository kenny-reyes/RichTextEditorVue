<template>
  <v-textarea v-model="localValue" :label="label" :height="height" :rules="rules" dense outlined />
</template>

<script>
import vmodelMixin from '@/mixins/vmodel.mixin';

export default {
  mixins: [vmodelMixin],
  props: {
    label: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
    };
  },
};
</script>
