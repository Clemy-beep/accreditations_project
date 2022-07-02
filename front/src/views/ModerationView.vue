<template>
  <LoggedHeader />
  <h1>
    <span class="material-symbols-outlined"> gavel </span> Modérer les fiches
  </h1>
  <WaitingPins id="waiting-pins" />
</template>
<script>
import LoggedHeader from "@/components/LoggedHeader.vue";
import WaitingPins from "@/components/moderator-components/WaitingPins.vue";
export default {
  components: {
    LoggedHeader,
    WaitingPins,
  },
};
</script>
<style scoped>
.material-symbols-outlined {
  font-size: 32px;
  color: #9461ff;
  vertical-align: middle;
  text-align: left;
}

h1 {
  text-align: left;
  max-width: 1000px;
  width: 80vw;
  margin: 64px auto;
}

#waiting-pins {
  min-height: 64vh;
}
</style>
