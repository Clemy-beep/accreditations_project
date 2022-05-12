<template>
  <button>{{ text }}</button>
</template>
<script>
export default {
  props: {
    text: String(),
  },
};
</script>

<style scoped>
button {
  background: linear-gradient(#9461ff, #e47afe);
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 500;
  padding: 0.6em;
  cursor: pointer;
  border-radius: 16px;
  border: none;
  margin: 0.5em;
}

button:hover,
button:focus {
  box-shadow: 0px 0px 8px 2px #00000035;
}
</style>
