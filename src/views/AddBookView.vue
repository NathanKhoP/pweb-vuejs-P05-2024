<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

export default defineComponent({
    name: "AddBookView",
    data() {
        return {
            title: "",
            author: "",
            publishedDate: "",
            publisher: "",
            description: "",
            coverImage: "",
            ratingAverage: 0,
            ratingCount: 0,
            tags: "",
            initialQty: 0,
            qty: 0,
            error: false,
            errorMsg: "",
        };
    },
    methods: {
        formatDate(date: string) {
            return format(new Date(date), "dd MMMM yyyy");
        },
        async addBook() {
            if (this.initialQty < this.qty) {
                this.error = true;
                this.errorMsg = "Initial Quantity cannot be less than Quantity";
                return;
            }

            if (this.initialQty < 0 || this.qty < 0) {
                this.error = true;
                this.errorMsg = "Initial Quantity or Quantity cannot be less than 0";
                return;
            }

            const newBook = {
                title: this.title,
                author: this.author,
                publishedDate: this.formatDate(this.publishedDate),
                publisher: this.publisher,
                description: this.description,
                coverImage: this.coverImage,
                rating: {
                    average: this.ratingAverage,
                    count: this.ratingCount,
                },
                tags: this.tags.split(",").map((tag: string) => tag.trim()),
                initialQty: this.initialQty,
                qty: this.qty,
            };

            const response = await fetch("http://localhost:3000/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                alert("Successfully added your book~");
                this.$router.push("/");
            } else {
                this.error = true;
                const data = await response.json();
                if (data.message.includes("duplicate")) {
                    this.errorMsg = "Book already exists!";
                } else {
                    this.errorMsg = "Failed to add your book :(, error: " + data.message;
                }
            }
        },
    },
});
</script>

<template>
    <main class="mt-12 mx-8 pb-20">
        <h1 class="text-4xl font-extrabold mb-8 text-center text-blue-700">Add a New Book</h1>
        <form @submit.prevent="addBook" class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
            <div class="flex flex-col">
                <label for="title" class="text-lg font-semibold text-gray-700">Title</label>
                <input v-model="title" type="text" id="title" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="author" class="text-lg font-semibold text-gray-700">Author</label>
                <input v-model="author" type="text" id="author" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="publishedDate" class="text-lg font-semibold text-gray-700">Published Date</label>
                <input v-model="publishedDate" type="date" id="publishedDate" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="publisher" class="text-lg font-semibold text-gray-700">Publisher</label>
                <input v-model="publisher" type="text" id="publisher" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="description" class="text-lg font-semibold text-gray-700">Description</label>
                <textarea v-model="description" id="description" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" rows="4" required></textarea>
            </div>
            <div class="flex flex-col">
                <label for="coverImage" class="text-lg font-semibold text-gray-700">Cover Image</label>
                <input v-model="coverImage" type="text" id="coverImage" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="ratingAverage" class="text-lg font-semibold text-gray-700">Rating Average</label>
                <input v-model="ratingAverage" type="number" step="0.1" id="ratingAverage" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="ratingCount" class="text-lg font-semibold text-gray-700">Rating Count</label>
                <input v-model="ratingCount" type="number" id="ratingCount" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="tags" class="text-lg font-semibold text-gray-700">Tags (comma separated)</label>
                <input v-model="tags" type="text" id="tags" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="initialQty" class="text-lg font-semibold text-gray-700">Initial Quantity</label>
                <input v-model="initialQty" type="number" id="initialQty" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div class="flex flex-col">
                <label for="qty" class="text-lg font-semibold text-gray-700">Quantity</label>
                <input v-model="qty" type="number" id="qty" class="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div v-if="error" class="mt-4 bg-red-100 text-red-500 p-3 rounded-lg">
                {{ errorMsg }}
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Add Book</button>
        </form>
    </main>
</template>
