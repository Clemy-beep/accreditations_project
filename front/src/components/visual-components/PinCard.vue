<template>
  <div class="card">
    <div class="img">
      <img :src="imgUrl" alt=" " />
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
  box-shadow: 0px 0px 4px 4px #00000025;
  height: 304px;
  gap: 1em;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0px 0px 6px 6px #00000025;
  width: 226px;
}
.film-infos {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  height: 152px;
  padding: 0 16px;
}

img {
  width: 100%;
  border: none !important;
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
