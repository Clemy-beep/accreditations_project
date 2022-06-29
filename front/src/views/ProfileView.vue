<template>
  <LoggedHeader />
  <UserInfos />
  <div id="creation-actions">
    <SecondaryButton :text="'Voir mes infos'" />
    <PrimaryButton @click="redirectToListCreation" :text="'Créer une liste'" />
    <PrimaryButton @click="redirectToPinCreation" :text="'Créer une fiche'" />
  </div>
  <UserFolloweesList />
  <UserLists />
  <UserPins />
  <div id="user-pins"></div>
</template>
<script>
import PrimaryButton from "@/components/visual-components/PrimaryButton.vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
import UserInfos from "@/components/user-component/UserInfos.vue";
import SecondaryButton from "@/components/visual-components/SecondaryButton.vue";
import UserFolloweesList from "@/components/user-component/UserFollowees.vue";
import UserLists from "@/components/lists-components/UserLists.vue";
import UserPins from "@/components/pins-components/UserPins.vue";
export default {
  components: {
    LoggedHeader,
    PrimaryButton,
    UserInfos,
    SecondaryButton,
    UserFolloweesList,
    UserLists,
    UserPins,
  },
  methods: {
    redirectToPinCreation: function () {
      this.$router.push("/submit-pin");
    },
    redirectToListCreation: function () {
      this.$router.push("/submit-list");
    },
  },
};
</script>
