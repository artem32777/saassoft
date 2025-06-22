<script setup lang="ts">
import { Form } from "@/components/ui/form"
import { Plus, Trash2 } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { useUsersStore } from "@/stores/users.ts"
import { storeToRefs } from "pinia"
import UsersFormField from "@/components/UsersFormField.vue"
import UsersFormSelect from "@/components/UsersFormSelect.vue"
import UsersFormTagsField from "@/components/UsersFormTagsField.vue"
import { AccountType } from "@/types/User.ts"

const store = useUsersStore()
const { getUsers } = storeToRefs(store)
const { addUserForm, deleteUser, saveUser, validationSchema } = store
</script>

<template>
  <section class="space-y-2">
    <div
      v-for="user in getUsers"
      :key="user.id"
    >
      <Form
        :validation-schema="validationSchema"
        class="animate-in fade-in slide-in-from-top-2 flex w-full items-center gap-2 rounded-lg border bg-gray-50 px-2 py-5 shadow-sm duration-500"
        v-slot="{ validate }"
      >
        <UsersFormTagsField
          name="tags"
          v-model="user.tags"
          @blur="saveUser(validate, user)"
        />
        <UsersFormSelect
          name="type"
          v-model="user.type"
          @update:model-value="
            (val) => {
              user.password = val === AccountType.LDAP ? null : ''
              saveUser(validate, user)
            }
          "
        />
        <UsersFormField
          name="login"
          v-model="user.login"
          @blur="saveUser(validate, user)"
        />
        <div
          v-show="user.type === AccountType.LOCAL"
          class="grow"
        >
          <UsersFormField
            name="password"
            type="password"
            v-model="user.password"
            @blur="saveUser(validate, user)"
          />
        </div>
        <Button
          variant="destructive"
          @click="deleteUser(user)"
          class="h-9"
        >
          <Trash2 />
          Удалить
        </Button>
      </Form>
    </div>
    <Button @click="addUserForm">
      <Plus />
      Добавить учетную запись
    </Button>
  </section>
</template>
