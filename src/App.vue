<script setup lang="ts">
import Game from "./components/Game.vue";
import Help from "./components/Help.vue";
</script>

<template>
  <TresCanvas window-size clear-color="Black">
    <Game></Game>
  </TresCanvas>
  <Help></Help>
</template>
