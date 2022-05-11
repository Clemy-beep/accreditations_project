<template>
  <UnloggedHeader />

  <RegisterForm />
</template>
<script>
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import { userStore } from "@/stores/userStore";
export default {
  components: {
    UnloggedHeader,
    RegisterForm,
  },
  setup() {
    const store = userStore();
    store.$reset();
  },
};
</script>

<style scoped></style>
