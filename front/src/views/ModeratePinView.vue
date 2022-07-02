<template>
  <LoggedHeader />
  <ModeratePin />
</template>
<script>
import LoggedHeader from "@/components/LoggedHeader.vue";
import ModeratePin from "@/components/moderator-components/ModeratePin.vue";
export default {
  components: {
    LoggedHeader,
    ModeratePin,
  },
};
</script>
<style scoped></style>
