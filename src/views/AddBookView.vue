<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

export default defineComponent({
    name:"AddBookView",
    data() {
        return {
            title:"",
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
                if (data.message.include("duplicate")) {
                    this.errorMsg = "Book already exists!";
                }
                this.errorMsg = "Failed to add your book :(, error: " + data.message;
            }
        },
    }
})
</script>

<template>
    <main class="mt-12 mx-8 pb-20">
        <h1 class="text-3xl font-bold mb-4 text-center">Add Book</h1>
        <form @submit.prevent="addBook" class="max-w-2xl mx-auto bg-blue-darker p-8 rounded-md shadow-md">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-white">Title</label>
                    <input v-model="title" type="text" id="title" name="title" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="author" class="block text-sm font-medium text-white">Author</label>
                    <input v-model="author" type="text" id="author" name="author" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="publishedDate" class="block text-sm font-medium text-white">Published Date</label>
                    <input v-model="publishedDate" type="date" id="publishedDate" name="publishedDate" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="publisher" class="block text-sm font-medium text-white">Publisher</label>
                    <input v-model="publisher" type="text" id="publisher" name="publisher" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-white">Description</label>
                    <textarea v-model="description" id="description" name="description" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required></textarea>
                </div>
                <div>
                    <label for="coverImage" class="block text-sm font-medium text-white">Cover Image</label>
                    <input v-model="coverImage" type="text" id="coverImage" name="coverImage" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="ratingAverage" class="block text-sm font-medium text-white">Rating Average</label>
                    <input v-model="ratingAverage" type="number" step="0.1" id="ratingAverage" name="ratingAverage" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="ratingCount" class="block text-sm font-medium text-white">Rating Count</label>
                    <input v-model="ratingCount" type="number" id="ratingCount" name="ratingCount" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="tags" class="block text-sm font-medium text-white">Tags (comma separated)</label>
                    <input v-model="tags" type="text" id="tags" name="tags" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="initialQty" class="block text-sm font-medium text-white">Initial Quantity</label>
                    <input v-model="initialQty" type="number" id="initialQty" name="initialQty" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <div>
                    <label for="qty" class="block text-sm font-medium text-white">Quantity</label>
                    <input v-model="qty" type="number" id="qty" name="qty" class="mt-1 p-2 border border-gray-300 rounded-md w-full text-stone-500" required>
                </div>
                <h4 v-if="error" class="col-span-2 text-red-500">{{ errorMsg }}</h4>
                <button type="submit" class="col-span-2 bg-blue-500 text-white p-2 rounded-md">Add Book</button>
            </div>
        </form>
    </main>
</template>