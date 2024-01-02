<script setup lang="ts">
import SideBar from '@/layouts/default/SideBar.vue'
</script>

<template>
  <ElContainer class="flex min-h-full h-full bg-gray-200">
    <ElHeader
      class="flex items-center fixed top-0 left-0 right-0 z-20 p-2 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg"
      ><h1 class="text-2xl">LOGO</h1>
    </ElHeader>
    <ElContainer class="flex h-full">
      <ElAside class="bg-white" style="padding-top: var(--header-height)"><SideBar /></ElAside>
      <ElContainer class="h-full flex justify-center">
        <div class="w-8/12 h-full" style="padding-top: var(--header-height)">
          <ElMain class="h-full flex justify-center flex-col">
            <ElContainer class="h-full bg-white p-5">
              <slot />
            </ElContainer>
          </ElMain>
        </div>
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>
