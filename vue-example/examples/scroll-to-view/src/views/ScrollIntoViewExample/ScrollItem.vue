<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { Datas, Refs } from "./types";

const props = defineProps<{
  id: number;
  data: Datas[number];
  refs: Refs;
}>();

const divRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
  props.refs.set(props.id, divRef);
});
</script>

<template>
  <div ref="divRef" :class="$style.content">
    <slot :data="data"></slot>
  </div>
</template>

<style module>
.content {
  margin-bottom: 50px;
  border: 1px solid black;
}
</style>
