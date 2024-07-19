<template>
  <OrbitControls ref="controls" />
  <Ship ref="ship">
    <TresPerspectiveCamera ref="camera" :position="new Vector3(-5, 5, -5)" />
  </Ship>
  <Target></Target>
  <Stars :size="0.4"></Stars>
  <TresAmbientLight :intensity="0.03" />
  <TresDirectionalLight :position="new Vector3(2, 1, -1)" :cast-shadow="true" />
  <TresAxesHelper />
</template>

<script setup lang="ts">
import { OrbitControls, Stars } from "@tresjs/cientos";
import { useLoop } from "@tresjs/core";
import { Vector3 } from "three";
import { ref } from "vue";
import Ship from "./Ship.vue";
import Target from "./Target.vue";

const controls = ref();
const camera = ref();
const ship = ref();

const { onBeforeRender } = useLoop();

onBeforeRender(() => {
  if (controls.value) {
    controls.value.value.target.copy(ship.value.root.position.clone());
    controls.value.value.update();
  }
});
</script>
