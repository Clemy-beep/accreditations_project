<template>
  <popup-modal ref="popup">
    <h2 style="margin-top: 0">{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="btns">
      <secondary-button
        class="cancel-btn"
        @click="_cancel"
        :text="cancelButton"
        >{{ cancelButton }}</secondary-button
      >
      <primary-button class="ok-btn" @click="_confirm" :text="okButton">{{
        okButton
      }}</primary-button>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from "./ModalComponent.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

export default {
  name: "ConfirmDialog",

  components: { PopupModal, PrimaryButton, SecondaryButton },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: "Annuler", // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open();
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },

    _cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "Popins", sans-serif;
  color: #9461ff;
  font-size: 30px;
  text-align: center;
  padding: 0.5em;
}
p {
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  padding: 0.5em;
  text-align: justify;
}
.btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
</style>
