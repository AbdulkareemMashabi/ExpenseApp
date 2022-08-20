import { configureStore } from "@reduxjs/toolkit";
import Favorites from "./Favorites";
export const store = configureStore({
  reducer: {
    favoriteMeals: Favorites,
  },
});
