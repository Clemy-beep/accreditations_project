<template>
  <div>
    {{ text }}
  </div>
</template>
<script>
export default {
  props: {
    text: String(),
  },
};
</script>
<style scoped>
div {
  height: 48px;
  padding: 0 0.5em;
  background: linear-gradient(#dac8fe, #f8ddff);
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  border-radius: 32px;
}
</style>
