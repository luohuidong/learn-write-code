<script setup lang="ts"></script>

<template>
  <header :class="$style.header">
    <div>
      <nav><router-link to="/">Home</router-link></nav>
    </div>
  </header>

  <main :class="$style.main">
    <router-view />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
}
</style>

<style module>
.header {
  height: 40px;
}

.main {
  height: calc(100vh - 40px);
  overflow: hidden;
}
</style>
