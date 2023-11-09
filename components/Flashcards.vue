<script>
export default {
  name: "Flashcards",
  data () {
    return {
      items: [
        {
          src: require ('assets/images/Flashcards/Flash1.svg'),
        },
        {
          src: require ( 'assets/images/Flashcards/Flash2.svg'),
        },
        {
          src: require ( 'assets/images/Flashcards/Flash3.svg'),
        },
        {
          src: require ('assets/images/Flashcards/Flash4.svg'),
        },
        {
          src: require ('assets/images/Flashcards/Flash5.svg'),
        },
        {
          src: require ('assets/images/Flashcards/Flash6.svg'),
        },
        {
          src: require ('assets/images/Flashcards/Flash7.svg'),
        },
        {
          src: require ('assets/images/Flashcards/Flash8.svg'),
        },
      ],
    }
  },
}
</script>

<template>
  <div class="flashcards-h2">
    <v-carousel hide-delimiter-background cycle show-arrows-on-hover>
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <div class="flashcard-image-container">
          <v-img :src="item.src" alt="Flashcard" contain class="flashcard-image" />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.flashcards-h2 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Additional styles for smaller screens */
  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin: 0.5rem;
  }
}

.v-carousel-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flashcard-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flashcard-image {
  width: auto;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the entire space */
}
</style>

