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
  background-color: #ef09d8;
  border: 3px solid white;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 500;
  padding: 0.5em;
  cursor: pointer;
  border-radius: 16px;
  margin: 0.5em;
  width: fit-content;
}

button:hover,
button:focus {
  background-color: white;
  color: #ef09d8;
  border: 3ox solid #ef09d8;
}
</style>
