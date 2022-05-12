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
  background-color: transparent;
  border: 3px solid #9461ff;
  color: #9461ff;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 500;
  padding: 0.5em;
  cursor: pointer;
  border-radius: 16px;
  margin: 0.5em;
}

button:hover,
button:focus {
  background-color: #9461ff;
  color: white;
}
</style>
