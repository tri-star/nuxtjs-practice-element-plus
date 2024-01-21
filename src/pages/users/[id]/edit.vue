<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { registerUser } from '~/domain/users/api/register-user'
import { newUserFormSchema } from '~/domain/users/user'
import { retrieveChangeEventValue, toErrorString } from '~/utils/form-utils'

const router = useRouter()

const isRegisterInpgorgress = ref(false)
const registerError = ref<string | undefined>(undefined)

const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    password: '',
  },
  validatorAdapter: zodValidator,
  onSubmit: async ({ value: formData }) => {
    isRegisterInpgorgress.value = true
    try {
      await registerUser(formData)
      ElMessage({
        type: 'success',
        message: 'ユーザーの登録が完了しました。',
      })
      router.go(-1)
    } catch (e) {
      console.error(e)
      registerError.value = (e as Error).message
    } finally {
      isRegisterInpgorgress.value = false
    }
  },
})

form.provideFormContext()

function handleCancel() {
  router.go(-1)
}
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <ElForm ref="formRef" label-width="100" class="flex flex-col gap-3" style="width: 600px">
      <form.Field name="name" :validators="{ onChange: newUserFormSchema.shape.name }">
        <template #default="{ field }">
          <ElFormItem label="氏名" :error="toErrorString(field.state.meta.errors)">
            <NpInput
              :name="field.name"
              :value="field.state.value"
              @input="(e: Event) => field.handleChange(retrieveChangeEventValue(e))"
              @blur="field.handleBlur"
            />
          </ElFormItem>
        </template>
      </form.Field>
      <form.Field name="email" :validators="{ onChange: newUserFormSchema.shape.email }">
        <template #default="{ field }">
          <ElFormItem label="メールアドレス" :error="toErrorString(field.state.meta.errors)">
            <NpInput
              :name="field.name"
              :value="field.state.value"
              @input="(e: Event) => field.handleChange(retrieveChangeEventValue(e))"
              @blur="field.handleBlur"
            />
          </ElFormItem>
        </template>
      </form.Field>
      <form.Field name="password" :validators="{ onChange: newUserFormSchema.shape.password }">
        <template #default="{ field }">
          <ElFormItem label="パスワード" :error="toErrorString(field.state.meta.errors)">
            <NpInput
              type="password"
              auto-complete="new-password"
              :name="field.name"
              :value="field.state.value"
              @input="(e: Event) => field.handleChange(retrieveChangeEventValue(e))"
              @blur="field.handleBlur"
            />
          </ElFormItem>
        </template>
      </form.Field>
      <div class="flex justify-center">
        <ElButton type="primary" :loading="isRegisterInpgorgress" @click="form.handleSubmit">登録</ElButton>
        <ElButton type="default" @click="handleCancel">キャンセル</ElButton>
      </div>
    </ElForm>
  </div>
</template>
