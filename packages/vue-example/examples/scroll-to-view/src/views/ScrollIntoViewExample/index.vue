<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import type { Ref } from "vue";

import type { Datas, Refs, HighlightId } from "./types";
import useDatas from "../../use/useDatas";
import Scroller from "./Scroller.vue";
import Sidebar from "./Sidbar.vue";

const datas = useDatas();
const state = reactive<{
  datas: Datas;
  refs: Refs;
  highlightId: HighlightId;
}>({
  datas: [],
  refs: reactive(new Map<number, Ref<HTMLDivElement | null>>()),
  highlightId: null,
});

onMounted(() => {
  state.datas = datas;
});

watch(
  () => [...state.refs],
  () => {
    if (state.highlightId === null && state.datas.length > 0) {
      state.highlightId = state.datas[0].id;
    }
  }
);
</script>

<template>
  <div :class="$style.wrapper">
    <aside :class="$style.aside">
      <Sidebar
        v-model="state.highlightId"
        :datas="state.datas"
        :refs="state.refs"
      ></Sidebar>
    </aside>

    <div :class="$style.scrollerContainer"></div>
    <Scroller
      v-model="state.highlightId"
      :datas="state.datas"
      :refs="state.refs"
    ></Scroller>
  </div>
</template>

<style module>
.wrapper {
  height: 800px;
  display: flex;
}

.aside {
  width: 300px;
  height: 100%;
  overflow-y: auto;
}

.scrollerContainer {
  flex: 1;
}
</style>
