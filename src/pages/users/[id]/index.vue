<script setup lang="ts">
import { useFetchResponse } from '~/composables/use-fetch-response'
import { fetchUser } from '~/domain/users/api/fetch-user'

const route = useRoute()
const router = useRouter()

const userId = String(route.params.id)
const { data: user, error, pending } = fetchUser(userId)
const { isNotFound, isError } = useFetchResponse(user, error)

function handleCancel() {
  router.go(-1)
}
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <template v-if="isNotFound">
      <p>ユーザーが見つかりません</p>
    </template>
    <template v-else-if="isError">
      <p>データ取得中にエラーが発生しました。</p>
    </template>
    <template v-else>
      <ElForm ref="formRef" label-width="100" class="flex flex-col gap-3" style="width: 600px">
        <ElFormItem label="ID">
          <p v-if="pending">-</p>
          <p v-else>{{ user?.data.id }}</p>
        </ElFormItem>
        <ElFormItem label="氏名">
          <p v-if="pending">-</p>
          <p v-else>{{ user?.data.name }}</p>
        </ElFormItem>
        <ElFormItem label="会社">
          <p v-if="pending">-</p>
          <p v-else>{{ user?.data.company.name }}</p>
        </ElFormItem>
        <div class="flex justify-center">
          <ElButton type="default">編集</ElButton>
          <ElButton type="default" @click="handleCancel">キャンセル</ElButton>
        </div>
      </ElForm>
    </template>
  </div>
</template>
