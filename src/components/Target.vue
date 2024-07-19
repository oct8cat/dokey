<script setup lang="ts">
import { Color, MeshToonMaterial, Vector3 } from "three";
import ShipSection from "./ShipSection.vue";

const cyanMaterial = new MeshToonMaterial({
  color: new Color(Color.NAMES.cyan),
  wireframe: false,
});
const whiteMaterial = new MeshToonMaterial({
  color: new Color(Color.NAMES.white),
  wireframe: false,
});
</script>

<template>
  <TresGroup :position="new Vector3(0, 0, 10)">
    <ShipSection
      :length="6"
      :radius-start="2"
      :radius-end="2"
      :z="0"
      :material="cyanMaterial"
    />
    <ShipSection
      :length="0.2"
      :radius-start="1.8"
      :radius-end="2"
      :z="-3.1"
      :material="whiteMaterial"
    />
    <ShipSection
      :length="0.4"
      :radius-start="1"
      :radius-end="1"
      :z="-3.4"
      :material="cyanMaterial"
    />
    <ShipSection
      :length="0.2"
      :radius-start="2"
      :radius-end="1.8"
      :z="3.1"
      :material="whiteMaterial"
    />
  </TresGroup>
</template>
