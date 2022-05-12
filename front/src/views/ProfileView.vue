<template>
  <LoggedHeader />
  <div id="user-infos"></div>
  <div id="creation-actions">
    <PrimaryButton :text="'Créer une liste'" />
    <PrimaryButton :text="'Créer une fiche'" />
  </div>
  <div id="followees"></div>
  <div id="user-lists"></div>
  <div id="user-pins"></div>
</template>
<script>
import PrimaryButton from "@/components/visual-components/PrimaryButton.vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
export default {
  components: {
    LoggedHeader,
    PrimaryButton,
  },
};
</script>
