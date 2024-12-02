<script lang="ts">
import BookCard from "@/components/BookCard.vue";

interface BookObject {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  publishedDate: string;
  initialQty: number;
  qty: number;
  publisher: string;
  coverImage: string;
}

export default {
  name: "HomeView",
  data: () => ({
    booksData: [] as BookObject[],
    fetchError: false,
  }),
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/book");
      if (!response.ok) {
        throw new Error("Failed to fetch books data");
      }
      const data = await response.json();
      this.booksData = [...data.data];
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  components: {
    BookCard,
  },
};
</script>

<template>
  <main class="mt-10 mx-8 pb-24">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-stone-300">Welcome To Our Book Catalogue</h1>
    <div class="flex flex-wrap justify-center gap-4 mt-10">
      <BookCard
        v-if="booksData.length"
        v-for="book in booksData"
        :key="book._id"
        :book="book"
        class="w-full sm:w-full md:w-2/6 lg:w-1/4"
      />
      <h1 class="font-bold text-3xl text-center w-full" v-else-if="fetchError">
        Failed to load books data
      </h1>
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-200"v-else></div>
      <h1 class="font-bold text-3xl text-center w-full" v-else>Loading...</h1>
    </div>
  </main>
</template>
