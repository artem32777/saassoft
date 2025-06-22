<script setup lang="ts">
import { CircleHelp } from "lucide-vue-next";
</script>

<template>
  <h2>Учётные записи</h2>

  <div class="flex items-center gap-2 rounded-lg bg-blue-100 p-3 text-sm">
    <CircleHelp
      :size="20"
      class="text-blue-600"
    />
    Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
  </div>
</template>
