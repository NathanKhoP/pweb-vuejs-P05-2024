<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

export default defineComponent({
  name: 'Main-App',
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
});
</script>

<template>
  <nav class="bg-[#1F1E33] p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <RouterLink to="/" class="text-white"><span class="font-bold">Library Catalogue</span> by P5 - PWeb A</RouterLink>
      </div>
      <div class="hidden md:flex items-center space-x-16">
        <RouterLink to="/" class="text-white font-bold">Home</RouterLink>
        <RouterLink to="/add-book" class="text-white font-bold">Add Book</RouterLink>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white">
          <svg
            v-if="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>  

  <div
    :class="{
      'translate-x-full': !isMenuOpen,
      'translate-x-0': isMenuOpen,
    }"
    class="fixed top-0 right-0 h-full w-64 bg-[#1f1e33] text-white transform transition-transform duration-300 ease-in-out md:hidden"
  >
    <button @click="closeMenu" class="absolute top-4 right-4 text-white focus:outline-none">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
    <div class="mt-16 flex flex-col items-center space-y-4">
      <RouterLink to="/" class="text-white" @click="closeMenu">Home</RouterLink>
      <RouterLink to="/add-book" class="text-white" @click="closeMenu"
        >Add New Book</RouterLink
      >
    </div>
  </div>
  <RouterView />
</template>
