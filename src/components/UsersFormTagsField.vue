<script setup lang="ts">
import { computed } from "vue"
import { Input } from "@/components/ui/input"
import type { UserTag } from "@/types/User.ts"
import { FormControl, FormItem, FormMessage, FormField } from "@/components/ui/form"

const props = defineProps<{
  modelValue: string | UserTag[]
  name: string
}>()

const emit = defineEmits<{ (e: "update:modelValue", value: UserTag[]): void }>()

const tags = computed({
  get() {
    if (typeof props.modelValue === "string") return props.modelValue
    return props.modelValue.map((tag) => tag.text).join("; ")
  },
  set(newValue: string) {
    if (!newValue.trim()) {
      emit("update:modelValue", [])
      return
    }
    const formattedTags = newValue.split(";").map((tag) => ({ text: tag.trim() }))
    emit("update:modelValue", formattedTags)
  },
})
</script>

<template>
  <FormField
    :name="name"
    v-model.trim="tags"
    v-slot="{ componentField }"
  >
    <FormItem class="min-w-1/3">
      <FormControl>
        <Input v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
