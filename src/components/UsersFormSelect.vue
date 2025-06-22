<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

import { AccountType } from "@/types/User.ts"

defineProps<{ name: string }>()

const model = defineModel<AccountType>()

const userTypeOptions = [
  { value: AccountType.LOCAL, label: "Локальная" },
  { value: AccountType.LDAP, label: "LDAP" },
]
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    v-model="model"
    :name="name"
  >
    <FormItem>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger class="min-w-32">
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem
            v-for="option in userTypeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
