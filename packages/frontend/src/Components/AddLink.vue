<template>
  <div>
    <div id="add-link-container">
      <Input
        id="url-input"
        @input-changed="inputChanged"
        @input-submitted="inputSubmitted"
        placeholder="Enter a url to shorten"
        :urlToShorten="urlToShorten"
      />

      <p>Press Enter to submit</p>
    </div>
    <div>{{ error }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UrlAPI } from "../api/urlApi";
import Input from "./Input.vue";

export default Vue.extend({
  name: "AddLink",
  components: { Input },
  data() {
    return {
      urlToShorten: "",
      error: "",
    };
  },
  methods: {
    async inputSubmitted() {
      try {
        const newUrl = await UrlAPI.createShortenedURL(this.urlToShorten);
        this.$emit("new-url-added", newUrl);
        this.urlToShorten = "";
        this.error = "";
      } catch (err) {
        console.log(err);
        this.error = "Failed to create URL.";
      }
    },
    inputChanged(url: string) {
      this.urlToShorten = url;
    },
  },
});
</script>

<style>
#add-link-container {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}

#url-input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  margin: 5px 0px 0 5px;
  text-align: center;
  width: 100%;
}
</style>
