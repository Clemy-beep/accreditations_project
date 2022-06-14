<template>
  <LoggedHeader />
  <SubmitPinForm />
</template>

<script>
import SubmitPinForm from "@/components/forms/SubmitPinForm.vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
export default {
  name: "SubmitPinView",
  components: {
    LoggedHeader,
    SubmitPinForm,
  },
};
</script>
