<template>
  <div>
    <h1>{{ list.title }}</h1>
    <p class="author">{{ list.author.username }}</p>
    <h2>description</h2>
    <p class="list-description">{{ list.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
  },
};
</script>

<style scoped>
div {
  background-color: #dac8fe;
  font-family: "Montserrat", sans-serif;
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px #00000035;
  text-align: left;
  padding: 16px;
  margin: 16px;
  min-width: 150px;
  max-width: 250px;
  max-height: 200px;
  display: inline-block;
  overflow: hidden;
}
h1 {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}

h2 {
  font-size: 20px;
  font-weight: 400;
}
p {
  font-size: 14px;
  font-weight: 300;
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  margin: 0 auto;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
