<template>
  <div class="container">
    <div id="tiitle-container">
      <h1>
        <span class="material-symbols-outlined"> badge </span> Vos abonnements
      </h1>
      <span id="followees-list-link">en voir plus</span>
    </div>
    <div id="followees-list">
      <div v-for="followee in user.followees" :key="followee.id">
        <p class="followee-username">{{ followee.username }}</p>
        <img class="followee-avatar" :src="followee.avatar" alt="avatar" />
        <button>Se désabonner</button>
      </div>
    </div>
  </div>
</template>
<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
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
    this.getFollowees();
    this.user = this.currentUser;
  },

  methods: {
    ...mapActions(userStore, ["fetchFollowedAccounts"]),
    getFollowees: async function () {
      this.fetchFollowedAccounts(this.currentUser.id);
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 28px;
  vertical-align: middle;
  color: #9461ff;
}
#followees-list-link {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #9461ff;
  cursor: pointer;
}

#tiitle-container {
  width: 80vw;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

h1 {
  display: inline;
}

.followee-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

#followees-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  justify-content: center;
  gap: 1em;
  width: clamp(100%, 0, 1000px);
  margin: 32px auto;
}

.followee-username {
  font-weight: 500;
  margin: 0;
}

button {
  background-color: white;
  border: none;
  text-decoration: underline;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  display: block;
}
</style>
