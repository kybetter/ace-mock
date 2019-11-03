<template>
  <div>
    <a-button @click="createApi">createApi</a-button>
    <a-button @click="testApi">testApi</a-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewApi",
  methods: {
    createApi() {
      this.$http.post("/create-normal-api").then(res => {
        console.log(res);
      });
    },
    testApi() {
      const http = axios.create({
        baseURL: "//localhost:12345",
        timeout: 10000
      });
      http.post("/demo").then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>
