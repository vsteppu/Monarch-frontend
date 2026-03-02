<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <div class="flex-1 mt-14">
      <slot />
    </div>
    <NavigationFooter />
  </div>
</template>
<script setup>
import NavBar from '@/components/nav-bar.vue';
import NavigationFooter from '@/components/footer.vue';
</script>