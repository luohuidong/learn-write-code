<script setup lang="ts">
import { ref } from "vue";
import _ from "lodash";

import type { Refs, HighlightId, Datas } from "./types";
import ScrollItem from "./ScrollItem.vue";

const props = defineProps<{
  modelValue: HighlightId;
  datas: Datas;
  refs: Refs;
}>();

const emits = defineEmits(["update:modelValue"]);

const contentsRef = ref<HTMLDivElement>();
function handleWhell() {
  let tmpHighlightId: string | number | null = null;

  // 依据元素的 offsetTop 顺序排列
  const tmpRefs = [...props.refs].sort(
    ([aId, aElementRef], [bId, bElementRef]) => {
      if (aElementRef.value === null || bElementRef.value === null) {
        return 0;
      }
      return aElementRef.value.offsetTop - bElementRef.value.offsetTop;
    }
  );

  for (let [id, element] of tmpRefs) {
    if (
      contentsRef.value &&
      element.value &&
      element.value.offsetTop - contentsRef.value.scrollTop < 50
    ) {
      tmpHighlightId = id;
    }
  }

  emits("update:modelValue", tmpHighlightId);
}

const throttleHandleWheel = _.throttle(handleWhell, 500);
</script>

<template>
  <div :class="$style.contents" @wheel="throttleHandleWheel" ref="contentsRef">
    <template v-for="data in datas" :key="data.id">
      <ScrollItem :id="data.id" :data="data" :refs="refs">
        <template #default="slotProps">
          {{ slotProps.data.id }}: {{ slotProps.data.content }}
        </template>
      </ScrollItem>
    </template>
  </div>
</template>

<style module>
.contents {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
