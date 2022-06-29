import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth";
import searchReducer from "@/redux/slices/search";
import designReducer from "@/redux/slices/design";
import designControlReducer from "@/redux/slices/designControl";
import blueprintsReducer from "@/redux/slices/blueprints";
import choosenKeyReducer from "@/redux/slices/choosenKey";
import previewsReducer from "@/redux/slices/previews";
import productDetailReducer from "@/redux/slices/product";
import selectedColorsReducer from "@/redux/slices/selectedColors";
import cartsReducer from "@/redux/slices/cart";
import checkCartSliceReducer from "@/redux/slices/checkCart";
import isEditSliceReducer from "@/redux/slices/isEdit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "infoManageData",
    "designControl",
    "blueprintsData",
    "choosenKey",
    "previews",
    "selectedColors",
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  searchValue: searchReducer,
  infoManageData: designReducer,
  designControl: designControlReducer,
  blueprintsData: blueprintsReducer,
  choosenKey: choosenKeyReducer,
  previews: previewsReducer,
  productDetail: productDetailReducer,
  selectedColors: selectedColorsReducer,
  carts: cartsReducer,
  checkCartSlice: checkCartSliceReducer,
  isEdit: isEditSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
