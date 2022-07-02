<template>
  <div class="card">
    <div class="img">
      <img :src="poster" alt=" " />
    </div>
    <div class="film-infos">
      <div class="top-level">
        <p class="author">{{ authorUsername }}</p>
        <p class="side-text">{{ sideText }}</p>
      </div>
      <div class="title">{{ title }}</div>
      <div class="description">{{ resume }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    authorUsername: String(),
    title: String(),
    resume: String(),
    sideText: String(),
    poster: String(),
  },
};
</script>
<style scoped>
.card {
  width: 220px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  height: 304px;
  gap: 1em;
  cursor: pointer;
  transition: all ease-out 0.2s;
}

.card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: scale(1.05);
}
.film-infos {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  height: 152px;
  padding: 0 16px;
}

img {
  width: inherit;
  height: 152px;
  border-radius: inherit;
  border: none;
}
.img {
  height: 152px;
  width: 100%;
  background: linear-gradient(#ffe1e1, #f8ddff);
  border: none !important;
  border-radius: 16px 16px 0px 0px;
}

.top-level {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Montserrat", sans-serif;
  height: 24px;
  width: 190px;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 500;
}

.description {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 300;
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  margin: 0 auto;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 190px;
}

.comments {
  font-size: 10px;
}
</style>
