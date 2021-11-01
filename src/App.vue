<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" class="kaikai" @update-data="updateData" />
    <button @click="change">{{provideTitle}}</button>
    <p>{{emitData}}</p>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';

import { provide, readonly, ref } from "vue";

let provideTitle = ref("provideTitle ++++++++++")
// 直接使用 provide 的 api
provide("provide-title", readonly(provideTitle));
let change = () => {
  provideTitle.value = "520520";
  console.log("provideTitle ==>",provideTitle);
}

const emitData = ref("mm");
const updateData = (payload) => {
  emitData.value = payload.age
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md

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
