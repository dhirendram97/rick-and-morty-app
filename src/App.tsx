import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-4">Rick and Morty Characters</h1> */}
      <Outlet />
    </div>
  );
}
