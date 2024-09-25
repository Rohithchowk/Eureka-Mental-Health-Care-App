import React from "react";
import { Stack } from "expo-router";
import queryClient from "./(services)/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import AppWrapper from "./(redux)/AppWrapper";
import { Provider } from "react-redux";
import { store } from "./(redux)/store";
const RootLayout = () => {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Welcome" }} />
      <Stack.Screen name="auth/login" options={{ headerShown: true, title: "Login" }} />
    </Stack> */}
    <AppWrapper/>
    </QueryClientProvider>
    </Provider>
    
  );
};

export default RootLayout;
