<template>
  <LoggedHeader />
  <div>
    <h1>Hello</h1>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
import { mapActions, mapState } from "pinia";
import { userStore } from "@/stores/userStore";
export default defineComponent({
  components: {
    LoggedHeader,
  },
  data() {
    return {
      imageURL: "",
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
  },
  methods: {
    ...mapActions(userStore, ["fetchAvatar"]),
    getimg: async function () {
      this.imageURL = await this.fetchAvatar(this.currentUser.id);
    },
  },
});
</script>
