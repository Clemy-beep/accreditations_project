<template>
  <LoggedHeader />
  <UserInfos />
  <div id="creation-actions">
    <SecondaryButton :text="'Voir mes infos'" />
    <PrimaryButton :text="'Créer une liste'" />
    <PrimaryButton :text="'Créer une fiche'" />
  </div>
  <UserFolloweesList />
  <div id="user-lists"></div>
  <div id="user-pins"></div>
</template>
<script>
import PrimaryButton from "@/components/visual-components/PrimaryButton.vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
import UserInfos from "@/components/user-component/UserInfos.vue";
import SecondaryButton from "@/components/visual-components/SecondaryButton.vue";
import UserFolloweesList from "@/components/user-component/UserFolloweesList.vue";
export default {
  components: {
    LoggedHeader,
    PrimaryButton,
    UserInfos,
    SecondaryButton,
    UserFolloweesList,
  },
};
</script>
