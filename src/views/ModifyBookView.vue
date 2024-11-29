<template>
  <main class="mt-12 mx-8 pb-12">
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Modify Book</h1>
      <form @submit.prevent="modifyBook" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="formData.title"
            id="title"
            name="title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>

        <!-- Author -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
          <input
            v-model="formData.author"
            id="author"
            name="author"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            name="description"
            rows="4"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          ></textarea>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
          <input
            v-model="formData.tags"
            id="tags"
            name="tags"
            type="text"
            placeholder="e.g., fiction, thriller"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>

        <!-- Stock -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="qty" class="block text-sm font-medium text-gray-700">Current Stock</label>
            <input
              v-model="formData.qty"
              id="qty"
              name="qty"
              type="number"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
            />
          </div>
          <div>
            <label for="initialQty" class="block text-sm font-medium text-gray-700">Initial Stock</label>
            <input
              v-model="formData.initialQty"
              id="initialQty"
              name="initialQty"
              type="number"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Book {
  title: string;
  author: string;
  description: string;
  tags: string[];
  qty: number;
  initialQty: number;
}

export default defineComponent({
  name: "ModifyBookView",
  data: () => ({
    formData: {
      title: "",
      author: "",
      description: "",
      tags: "",
      qty: 0,
      initialQty: 0,
    } as Book,
  }),
  async mounted() {
    try {
      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`
      );
      const data = await response.json();
      const book = data.data;
      this.formData = {
        ...book,
        tags: book.tags.join(", "), // Join tags into a comma-separated string
      };
    } catch (error) {
      console.error("Failed to fetch book data:", error);
    }
  },
  methods: {
  async modifyBook() {
    try {
      // Validasi: Pastikan initialQty tidak lebih kecil dari qty
      if (this.formData.initialQty < this.formData.qty) {
        alert("Initial stock cannot be less than current stock.");
        return; // Jangan lanjutkan jika validasi gagal
      }

      if (this.formData.initialQty < 0) {
        alert("Initial stock cannot be less than 0.");
        return; // Jangan lanjutkan jika validasi gagal
      }

      if (this.formData.qty < 0) {
        alert("Current stock cannot be less than 0.");
        return; // Jangan lanjutkan jika validasi gagal
      }

      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...this.formData,
            tags: this.formData.tags.split(",").map((tag) => tag.trim()), // Convert tags back into an array
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Book details updated successfully!");
        this.$router.push(`/detail/${this.$route.params.id}`);
      } else {
        throw new Error(data.message || "Failed to update book details");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book. Please try again.");
    }
  },
}
});
</script>

<style scoped>
main {
  background-color: #f9fafb; /* Light gray background */
}
</style>
