<script setup lang="ts">
import type { HighlightId, Datas, Refs } from "./types";

defineProps<{
  modelValue: HighlightId;
  datas: Datas;
  refs: Refs;
}>();
const emits = defineEmits(["update:modelValue"]);

function handleScrollToView(id: number, element?: HTMLDivElement | null) {
  if (element) {
    element.scrollIntoView();
    emits("update:modelValue", id);
  }
}
</script>

<template>
  <ul>
    <li
      v-for="data in datas"
      :key="data.id"
      @click="handleScrollToView(data.id, refs.get(data.id)?.value)"
      :class="{ [$style['list-active']]: data.id === modelValue }"
    >
      {{ data.title }}
    </li>
  </ul>
</template>

<style module>
.list-active {
  color: blue;
}
</style>
