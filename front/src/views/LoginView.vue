<template>
  <UnloggedHeader />
  <LoginForm />
</template>
<script>
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    UnloggedHeader,
    LoginForm,
  },
});
</script>

<style scoped>
h1 {
  line-height: 44px !;
  padding: 0;
}
</style>
