import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";
import AddBookView from "@/views/AddBookView.vue";
import BookDetailsView from "@/views/BookDetailsView.vue";
import ModifyBookView from "@/views/ModifyBookView.vue"; // Import halaman ModifyBookView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-book",
      name: "add-book",
      component: AddBookView,
    },
    {
      path: "/detail/:id",
      name: "get-book-details",
      component: BookDetailsView,
    },
    {
      path: "/book/modify/:id", // Tambahkan rute untuk halaman modify
      name: "modify-book",
      component: ModifyBookView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      redirect(_) {
        return { path: "/" };
      },
    },
  ],
});

export default router;
