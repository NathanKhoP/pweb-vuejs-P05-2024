<script lang="ts">
import { defineComponent } from "vue";

interface Rating {
  average: number;
  count: number;
}

interface BookDetail {
  rating: Rating;
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  tags: string[];
  initialQty: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default defineComponent({
  name: "DetailBookView",
  data: () => ({
    bookDetail: {} as BookDetail,
    fetchError: false,
  }),
  async mounted() {
    try {
      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book data :(");
      }
      const data = await response.json();
      this.bookDetail = { ...data.data };
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  methods: {
    async deleteBook() {
      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Your book has been removed~");
      this.$router.push("/");
    },
  },
  computed: {
    starRating(): string {
      const stars = Math.floor(this.bookDetail.rating.average);
      return "⭐".repeat(stars);
    },
  },
});
</script>

<template>
    <main class="mt-12 mx-8 pb-12">
        <RouterLink to="/" class="text-blue-500 rounded-md inline-block px-4 py-2 lg:ml-24">← Back to Home</RouterLink>
        <div v-if="fetchError" class="text-red-500 text-center mt-8 font-bold">Failed to fetch book data :(</div>
        <div v-else-if="bookDetail.title" class="mt-8">
            <div class="flex flex-col gap-x-10 lg:ml-24 lg:flex-row">
                <div class="w-full md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
                    <img
                        :src="bookDetail.coverImage"
                        class="rounded-xl w-full"
                        alt="Book Cover"
                    />
                </div>
                <div class="mt-10 lg:mt-0 lg:pr-20">
                    <h1 class="text-xl md:text-2xl lg:text-3xl"><span class="font-bold">{{ bookDetail.title }}</span> by <span class="font-bold">{{ bookDetail.author }}</span></h1>
                    <h5 class="text-sm text-stone-500 mt-2 text-center">{{ bookDetail.rating.average }} {{ starRating }} ({{ bookDetail.rating.count }})</h5>
                    <hr class="my-4 border border-stone-300" />
                    <p class="mt-4 text-stone-500">{{ bookDetail.description }}</p>
                    <h4 class="text-md md:text-lg">{{ bookDetail.publisher }} | {{ bookDetail.publishedDate }}</h4>
                    <h4 class="text-md md:text-lg">Tags: {{ bookDetail.tags.join(", ") }}</h4>
                    <h4 class="text-md md:text-lg">Stock: <span class="font-bold">{{ bookDetail.qty }}</span> out of <span class="font-bold">{{ bookDetail.initialQty }}</span> available</h4>
                </div>
            </div>
            <div class="lg:ml-24 flex justify-center items-center">
                <button
                @click="deleteBook"
                class="px-4 text-white py-2 w-1/2 bg-red-400 font-semibold rounded-xl mt-8 inline-block"
                >
                Remove Book
                </button>
                <RouterLink
        :to="`/book/modify/${bookDetail._id}`"
        class="ml-4 px-4 text-white py-2 w-1/2 bg-blue-400 font-semibold rounded-xl mt-8 inline-block"
      >
        Edit Book
      </RouterLink>
            </div>
        </div>
        <div v-else class="mt-8">
            <h1 class="font-bold text-3xl text-center">Loading...</h1>
        </div>
    </main>
</template>