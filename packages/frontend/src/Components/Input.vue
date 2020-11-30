<template>
  <input
    :value="urlToShorten"
    :placeholder="placeholder"
    v-on:input="inputChanged"
    v-on:keyup.enter="$emit('input-submitted')"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    placeholder: String,
    urlToShorten: String
  },
  methods: {
    inputChanged(event: { target: HTMLInputElement }) {
      this.$emit("input-changed", event.target.value);
    }
  }
});
</script>
