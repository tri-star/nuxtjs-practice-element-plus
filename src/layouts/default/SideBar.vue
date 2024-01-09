<script setup lang="ts"></script>

<template>
  <ElRow class="fixed">
    <ElCol>
      <ElMenu :router="true">
        <ElMenuItem index="/">
          <NuxtLink to="/">
            <ElIcon><ElIconHouse /></ElIcon>
            <span>ダッシュボード</span>
          </NuxtLink>
        </ElMenuItem>
        <ElMenuItem index="/users">
          <NuxtLink to="/users">
            <ElIcon><ElIconUser /></ElIcon>
            <span>ユーザー管理</span>
          </NuxtLink>
        </ElMenuItem>
      </ElMenu>
    </ElCol>
  </ElRow>
</template>
