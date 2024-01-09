<script setup lang="ts">
import { Download, Plus } from '@element-plus/icons-vue'
import type { User, UserListResponse } from '~/domain/users/user'

const selection = ref<User[]>([])
const router = useRouter()

function handleSelection(selectedRows: User[]): void {
  selection.value = selectedRows
}

async function handleNewClick(): Promise<void> {
  await router.push('/users/new')
}

const { data, error, pending } = useFetch<UserListResponse>('/api/users')
</script>

<template>
  <div class="flex flex-col w-full gap-5">
    <div class="flex">
      <div class="flex gap-1">
        <ElButton type="primary" :icon="Plus" @click="handleNewClick" />
      </div>
      <div class="flex-1"></div>
      <div class="flex gap-2">
        <ElButton type="default" :icon="Download" />
      </div>
    </div>
    <div class="flex">
      <div v-if="error">ロード処理中にエラーが発生しました。</div>
      <div v-else class="w-full">
        <ClientOnly fallback="...">
          <ElTable
            v-loading="pending"
            :data="data?.data"
            max-height="100%"
            style="width: 100%"
            @selection-change="handleSelection"
          >
            <ElTableColumn type="selection" width="40" />
            <ElTableColumn prop="id" label="ID" min-width="100px" />
            <ElTableColumn prop="name" label="氏名" />
            <ElTableColumn prop="email" label="メールアドレス" min-width="200px" />
            <ElTableColumn prop="createdAt" label="登録日時" min-width="200px">
              <template #default="{ row }">
                {{ new Date(row.createdAt).toLocaleString() }}
              </template>
            </ElTableColumn>
          </ElTable>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
