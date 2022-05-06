<template>
  <UnloggedHeader />

  <RegisterForm />
</template>
<script>
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
export default {
  components: {
    UnloggedHeader,
    RegisterForm,
  },
};
</script>

<style scoped></style>
