<template>
  <div id="app">
    <AddLink @new-url-added="addUrl" />
    <div id="parent-link-container">
      <div v-for="url in urls" :key="url.id">
        <Link @url-deleted="deleteUrl" :link="url" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AddLink from "./Components/AddLink.vue";
import Link from "./Components/Links.vue";
import { UrlAPI } from "./api/urlApi";
import { IApiResponse } from "./types";

export default Vue.extend({
  name: "App",
  components: { AddLink, Link },
  data() {
    return {
      urls: [] as any[],
      isModalVisible: false,
    };
  },
  async mounted() {
    const results = await UrlAPI.getAllUrls();
    this.urls = results;
  },
  methods: {
    addUrl(newUrlObject: IApiResponse) {
      this.urls.push(newUrlObject);
    },
    deleteUrl(urlId: string) {
      const newUrls = this.urls.filter((url) => url.id !== urlId);
      this.urls = newUrls;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

<style>
body {
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#parent-link-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1rem;
  grid-auto-rows: 1fr;
}
</style>
