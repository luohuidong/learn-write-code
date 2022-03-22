<script setup lang="ts">
import { ref } from "vue";

import arrayMoveTo from "./arrayMoveTo";
import todoData from "./data.json";
import type { Todo, ExchangeEventParams } from "./types";
import ListItem from "./ListItem.vue";

const datas = ref<Todo[]>(todoData);

function handleExchagne({ from, to }: ExchangeEventParams) {
  console.group();
  console.log("from", from);
  console.log("to", to);
  console.groupEnd();

  datas.value = arrayMoveTo<Todo>(datas.value, from.index, to.index);
}
</script>

<template>
  <div :class="$style.container">
    <template v-for="(data, index) in datas" :key="data.id">
      <ListItem :data="data" :index="index" @exchange="handleExchagne" />
    </template>
  </div>
</template>

<style module>
.container {
  width: 800px;
  margin: 0 auto;
}
</style>
