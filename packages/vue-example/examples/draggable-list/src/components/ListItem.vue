<script setup lang="ts">
import type { ExchangeEventParams, Todo } from "./types";

const props = defineProps<{
  data: Todo;
  index: number;
}>();

const emits = defineEmits(["exchange"]);

function handleDragStart(event: DragEvent) {
  const dataTransfer = event.dataTransfer;
  if (dataTransfer) {
    dataTransfer.effectAllowed = "move";
    dataTransfer.setData(
      "data",
      JSON.stringify(Object.assign({}, props.data, { index: props.index }))
    );
  }
}

function handleDragover(event: DragEvent) {
  event.preventDefault();
}

function handleDragenter(event: DragEvent) {
  event.preventDefault();
  const dataTransfer = event.dataTransfer;
  if (dataTransfer) {
    dataTransfer.dropEffect = "move";
  }
}

function handleDrop(event: DragEvent) {
  interface Data extends Todo {
    index: number;
  }

  const dataTransfer = event.dataTransfer;
  if (dataTransfer) {
    const from: Data = JSON.parse(dataTransfer.getData("data"));
    const to = Object.assign({}, props.data, { index: props.index });

    if (from.id === to.id) {
      return;
    }

    const exchangeEventParams: ExchangeEventParams = {
      from,
      to,
    };

    emits("exchange", exchangeEventParams);
  }
}
</script>

<template>
  <div
    :draggable="true"
    :class="$style.container"
    @dragstart="handleDragStart"
    @dragover="handleDragover"
    @dragenter="handleDragenter"
    @drop="handleDrop"
  >
    {{ data.id + ":" + data.title }}
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  border: 1px solid;
  height: 40px;
  margin-bottom: 5px;
}
</style>
