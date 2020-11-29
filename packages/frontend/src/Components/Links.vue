<template>
  <div id="link-container">
    <div>
      <p>Full Url</p>
      <div>
        <a id="link" :href="link.fullUrl">{{ link.fullUrl }}</a>
      </div>
    </div>
    <div>
      <p>Short Url</p>
      <a id="link" :href="link.shortUrl">{{ link.shortUrl }}</a>
    </div>
    <h5 id="delete-button" v-on:click="() => onClick(link.id)">Delete</h5>
    <p>{{ deleteError }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UrlAPI } from "../api/urlApi";
import { IApiResponse } from "../types/index";

export default Vue.extend({
  props: {
    link: {
      type: Object as () => IApiResponse,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      deleteError: "",
    };
  },
  methods: {
    async onClick(linkId: string) {
      try {
        await UrlAPI.deleteURL(linkId);
        this.$emit("url-deleted", linkId);
      } catch (err) {
        console.log(err);
        this.$data.deleteError = "Failed to delete.";
      }
    },
  },
});
</script>

<style>
#link-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 0.2em 0.5em;
  margin: 2px;
  border: 1px solid #c9c9c9;
}

#link {
  overflow-wrap: break-word;
}

#delete-button {
  text-decoration: none;
  background-color: #d11a2a;
  color: #fff; /* white */
  padding: 0.5em 1em; /* vertical | horizontal */
  border-radius: 4px;
  width: fit-content;
  font-size: 1em;
}

#update-link {
  margin: 0.5em;
  padding: 0.5em;
  display: inline-block;
  border-radius: 4px;
  width: fit-content;
  background-color: #d11a2a;
}

#update-link:hover {
  cursor: pointer;
}
</style>
