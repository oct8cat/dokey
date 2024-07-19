<template>
  <TresGroup ref="root" v-bind="props">
    <ShipSection
      :length="0.2"
      :radius-start="0.75"
      :z="-1.1"
      :material="material"
    />
    <ShipSection :length="2" :radius-end="0.5" :material="material" />
    <ShipSection
      :length="0.2"
      :radius-start="0.5"
      :radius-end="0.25"
      :z="1.1"
      :material="material"
    />
    <TresArrowHelper ref="arrowHelper" />
    <slot></slot>
  </TresGroup>
</template>

<script setup lang="ts">
import { useLoop } from "@tresjs/core";

const props = defineProps();

import { ArrowHelper, Color, Mesh, MeshToonMaterial, Vector3 } from "three";
import { onMounted, ref } from "vue";
import ShipSection from "./ShipSection.vue";

const root = ref<Mesh>();
const arrowHelper = ref<ArrowHelper>();
const material = new MeshToonMaterial({
  color: new Color(Color.NAMES.orange),
  wireframe: false,
  opacity: 0.75,
  transparent: true,
});

const keys = new Set();
const acceleration = new Vector3();
const rotation = new Vector3();

const accelerate = (z: number) => {
  if (!root.value) return;
  acceleration.add(new Vector3(0, 0, z).applyEuler(root.value.rotation));
};
const roll = (z: number) => (rotation.z += z);
const pitch = (y: number) => (rotation.y += y);
const yaw = (x: number) => (rotation.x += x);

const { onBeforeRender } = useLoop();
const emit = defineEmits(["change:position"]);

onBeforeRender(({ delta }) => {
  if (!root.value) return;
  if (!arrowHelper.value) return;

  if (keys.has("r")) accelerate(1);
  if (keys.has("f")) accelerate(-1);

  if (keys.has("a")) pitch(1);
  if (keys.has("d")) pitch(-1);
  if (keys.has("q")) roll(-1);
  if (keys.has("e")) roll(1);
  if (keys.has("w")) yaw(1);
  if (keys.has("s")) yaw(-1);

  root.value.position.add(acceleration.clone().multiplyScalar(delta / 50));
  emit("change:position", root.value.position, acceleration);

  root.value.rotateX((rotation.x * delta) / 100);
  root.value.rotateZ((rotation.z * delta) / 100);
  root.value.rotateY((rotation.y * delta) / 100);

  const arrowHelperDirection = acceleration
    .clone()
    .applyQuaternion(root.value.quaternion.clone().conjugate())
    .normalize();
  const arrowHelperLength = acceleration.length() / 5;

  arrowHelper.value.setDirection(arrowHelperDirection);
  arrowHelper.value.setLength(arrowHelperLength);
});

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    keys.add(e.key);
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.key);
  });
});

defineExpose({ root });
</script>
