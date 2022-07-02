<template>
  <LoggedHeader />
  <WeekPins />
</template>
<script>
import { defineComponent } from "vue";
import LoggedHeader from "@/components/LoggedHeader.vue";
import { mapActions, mapState } from "pinia";
import { userStore } from "@/stores/userStore";
import WeekPins from "@/components/pins-components/WeekPins.vue";
export default defineComponent({
  components: {
    LoggedHeader,
    WeekPins,
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
