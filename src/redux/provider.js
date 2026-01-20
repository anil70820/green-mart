"use client";

import { Provider } from "react-redux";
import AuthLoader from "./AuthLoader";
import { store } from "./store";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthLoader>
        {children}
        </AuthLoader>
    </Provider>
  );
}
