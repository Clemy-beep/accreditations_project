<template>
  <div class="about">
    <UnloggedHeader />
    <div>
      <h1>This is an about page</h1>
    </div>
  </div>
</template>
<script>
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    UnloggedHeader,
  },
});
</script>
<style scoped>
div {
  min-height: calc(100vh - 200px);
}
</style>
