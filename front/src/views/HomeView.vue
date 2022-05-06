<template>
  <div class="home">
    <UnloggedHeader />
    <transition appear name="fade">
      <HelloWorld />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    UnloggedHeader,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
