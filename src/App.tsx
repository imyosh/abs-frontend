import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Landing from "./pages/landing";
import Home from "./pages/home";
import Header from "./components/header";
import { AuthProvider } from "./providers/AuthProvider";

function Layout() {
  return (
    <AuthProvider>
      <main className="w-full h-full grid grid-rows-[auto_1fr]">
        <Header />
        <Outlet />
      </main>
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />, // layout route
    children: [
      {
        path: "/",
        Component: Landing,
      },
      {
        path: "/home",
        Component: Home,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
