<template>
  <div>
    <img :src="imgURL" alt="avatar" id="avatar" />
    <div>
      <h1>{{ user.username }}</h1>
      <p>{{ user.followersCount }} followers</p>
    </div>
    <BadgeComponent />
  </div>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      imageURL: "",
      user: {},
    };
  },
  computed: {
    ...mapState(userStore, {
      getUser: "user",
      getId: "id",
    }),
    currentUser() {
      return this.getUser;
    },
  },
  created() {
    this.getimg();
    this.user = this.currentUser || this.fetcheUser();
  },
  methods: {
    ...mapActions(userStore, ["fetchAvatar", "fetchUser"]),
    getimg: async function () {
      this.imageURL = await this.fetchAvatar(this.currentUser.id);
    },
  },
};
</script>
