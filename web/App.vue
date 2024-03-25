<template>
  <el-config-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import router from "./router";
onMounted(() => {
  console.log(789, '789');
  console.log(router.currentRoute.value, 'router.currentRoute.value');
})

</script>

<style></style>
