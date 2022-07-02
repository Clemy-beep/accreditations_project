<template>
  <div id="modal-overlay">
    <div id="modal-container">
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <PrimaryButton :text="btntext" @click="closeModal()" />
    </div>
  </div>
</template>
<script>
import PrimaryButton from "./PrimaryButton.vue";
export default {
  components: {
    PrimaryButton,
  },
  props: {
    title: String(),
    text: String(),
    btntext: String(),
  },
  methods: {
    closeModal: function () {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
#modal-container {
  width: fit-content;
  height: fit-content;
  padding: 16px 24px;
  border-radius: 16px;
  margin: auto;
  background-color: white;
}

#modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #00000045;
}

h1 {
  text-align: center;
}
</style>
