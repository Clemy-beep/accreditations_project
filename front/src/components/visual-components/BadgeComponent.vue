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
  height: 38px;
  padding: 0.2em 0.5em;
  background: linear-gradient(#dac8fe, #f8ddff);
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  border-radius: 32px;
  text-align: center;
  line-height: 38px;
  width: fit-content;
}
</style>
