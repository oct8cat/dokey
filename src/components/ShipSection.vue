<template>
  <TresMesh v-bind="props" :receive-shadow="true" :cast-shadow="true">
    <TresCylinderGeometry
      :args="[radiusStart || 1, radiusEnd || 1, length || 1, sides || 12]"
      :rotate-x="-Math.PI / 2"
      :translate="new Vector3(0, 0, z || 0)"
    />
  </TresMesh>
</template>

<script setup lang="ts">
import { Material, Vector3 } from "three";

const props = defineProps({
  radiusStart: Number,
  radiusEnd: Number,
  length: Number,
  sides: Number,
  material: Material,
  z: Number,
});
</script>
