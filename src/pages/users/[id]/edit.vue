<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { fetchCompanyList } from '~/domain/companies/api/fetch-company-list'
import { fetchUser } from '~/domain/users/api/fetch-user'
import { updateUser } from '~/domain/users/api/update-user'
import { editUserFormSchema } from '~/domain/users/user'
import { retrieveChangeEventValue, toErrorString } from '~/utils/form-utils'

const router = useRouter()
const route = useRoute()
const userId = String(route.params.id)

const isEditInpgorgress = ref(false)
const editError = ref<string | undefined>(undefined)

const { data } = await fetchUser(userId)
const { data: companies, error: companyListError } = await fetchCompanyList()

if (companyListError.value != null) {
  showError('会社一覧のロードに失敗しました')
}

const user = computed(() => data.value?.data)

const form = useForm({
  defaultValues: {
    name: user.value?.name ?? '',
    email: user.value?.email ?? '',
    companyId: user.value?.companyId ?? '',
  },
  validatorAdapter: zodValidator,
  onSubmit: async ({ value: formData }) => {
    isEditInpgorgress.value = true
    try {
      await updateUser(userId, formData)
      ElMessage({
        type: 'success',
        message: 'ユーザー情報の更新が完了しました。',
      })
      router.go(-1)
    } catch (e) {
      console.error(e)
      editError.value = (e as Error).message
    } finally {
      isEditInpgorgress.value = false
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
      <form.Field name="name" :validators="{ onChange: editUserFormSchema.shape.name }">
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
      <form.Field name="email" :validators="{ onChange: editUserFormSchema.shape.email }">
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
      <form.Field name="companyId" :validators="{ onChange: editUserFormSchema.shape.companyId }">
        <template #default="{ field }">
          <ElFormItem label="会社" :error="toErrorString(field.state.meta.errors)">
            <ElSelect
              :name="field.name"
              :model-value="field.state.value"
              value-key="id"
              filterable
              @change="(value) => field.handleChange(value)"
            >
              <ElOption
                v-for="company in companies?.data ?? []"
                :key="company.id"
                :label="company.name"
                :value="company.id"
              />
            </ElSelect>
          </ElFormItem>
        </template>
      </form.Field>
      <div class="flex justify-center">
        <ElButton type="primary" :loading="isEditInpgorgress" @click="form.handleSubmit">更新</ElButton>
        <ElButton type="default" @click="handleCancel">キャンセル</ElButton>
      </div>
    </ElForm>
  </div>
</template>
