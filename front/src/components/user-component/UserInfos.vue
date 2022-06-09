<template>
  <div id="user-container">
    <img :src="imgURL" alt="avatar" id="avatar" />
    <div>
      <h1>{{ user.username }}</h1>
      <p>{{ user.followersNum }} followers</p>
    </div>
  </div>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      imgURL: "",
      user: {},
    };
  },
  computed: {
    ...mapState(userStore, {
      getUser: "user",
    }),
    currentUser() {
      return this.getUser;
    },
  },
  created() {
    this.getimg();
    this.user = this.currentUser;
    this.getFollowers();
  },
  methods: {
    ...mapActions(userStore, ["fetchAvatar", "fetchFollowers"]),
    getimg: async function () {
      this.imgURL = await this.fetchAvatar(this.currentUser.id);
    },
    getFollowers: async function () {
      this.fetchFollowers(this.currentUser.id);
    },
  },
};
</script>

<style scoped>
#avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

#user-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
</style>
