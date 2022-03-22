<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import useGetDataSource from "./useGetDataSource";

const container = ref<HTMLDivElement>();

const { dataSource } = useGetDataSource();
const state = reactive({
  itemHeight: 24,
  pageNumber: 1,
  pageSize: 20,
});
const listHeight = computed(
  () => dataSource.value.length * state.itemHeight + "px"
);

/** 获取当前页码 */
function getPageNumber(params: {
  scrollTop: number;
  pageSize: number;
  itemHeight: number;
}) {
  // 每页高度
  const pageHeight = params.pageSize * params.itemHeight;
  return Math.floor(params.scrollTop / pageHeight) + 1;
}

function handleScroll(e: UIEvent) {
  const containerEl = container.value;
  if (!containerEl) {
    return;
  }

  const newPageNum = getPageNumber({
    scrollTop: containerEl.scrollTop,
    pageSize: state.pageSize,
    itemHeight: state.itemHeight,
  });

  if (newPageNum === state.pageNumber) {
    return;
  }
  state.pageNumber = newPageNum;
}

const dataStartIndex = computed(() =>
  Math.max((state.pageNumber - 2) * state.pageSize, 0)
);
const dataEndIndex = computed(() =>
  Math.min((state.pageNumber + 1) * state.pageSize, dataSource.value.length)
);
const showDataSource = computed<
  {
    id: number;
    name: string;
  }[]
>(() => dataSource.value.slice(dataStartIndex.value, dataEndIndex.value + 1));
</script>

<template>
  <div class="scroll" ref="container" @scroll="handleScroll">
    <div class="list">
      <div
        class="list-item"
        v-for="item in showDataSource"
        :key="item.id"
        :style="{ top: `${item.id * state.itemHeight}px` }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll {
  height: 480px;
  width: 480px;
  overflow: auto;
  border: 1px solid black;
}

.list {
  position: relative;
  width: 100%;
  height: v-bind(listHeight);
}

.list-item {
  position: absolute;
  height: 24px;
  width: 100%;
  padding: 0;
}
</style>
