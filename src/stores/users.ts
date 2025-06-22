import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { computed, ref } from "vue"
import { toTypedSchema } from "@vee-validate/zod"
import { AccountType, type User } from "@/types/User.ts"
import { z } from "zod"

export const useUsersStore = defineStore("users", () => {
  const usersStorage = useStorage<User[]>("users", [])
  const users = ref([...usersStorage.value])
  const getUsers = computed(() => users.value)

  const addUserForm = () =>
    users.value.push({
      id: Date.now().toString(),
      tags: "",
      type: AccountType.LOCAL,
      login: "",
      password: "",
    })

  const validationSchema = toTypedSchema(
    z.object({
      tags: z.string().max(50, { message: "Максимум 50 символов" }).optional(),
      type: z.nativeEnum(AccountType),
      login: z
        .string()
        .min(1, { message: "Введите логин" })
        .max(100, { message: "Максимум 100 символов" }),
      password: z
        .string()
        .min(1, { message: "Введите пароль" })
        .max(100, { message: "Максимум 100 символов" })
        .nullable(),
    }),
  )

  const deleteUser = (user: User) => {
    users.value = users.value.filter((u) => u.id !== user.id)
    usersStorage.value = [...users.value]
  }

  const saveUser = async (validateFn: () => Promise<{ valid: boolean }>, user: User) => {
    const { valid } = await validateFn()
    if (!valid) return

    const index = usersStorage.value.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      usersStorage.value[index] = user
    } else {
      usersStorage.value.push(user)
    }
  }

  return {
    getUsers,
    addUserForm,
    validationSchema,
    saveUser,
    deleteUser,
  }
})
