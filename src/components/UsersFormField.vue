<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

defineProps<{
  name: string
  type?: "text" | "password"
}>()

const model = defineModel<string | number | null | undefined>()
</script>

<template>
  <FormField
    :name="name"
    v-model.trim="model"
    v-slot="{ componentField }"
  >
    <FormItem class="grow">
      <FormControl>
        <Input
          :type="type"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
