<template>
  <UnloggedHeader />
  <FooterComponent />
</template>
<script>
import UnloggedHeader from "@/components/UnloggedHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    UnloggedHeader,
    FooterComponent,
  },
};
</script>
