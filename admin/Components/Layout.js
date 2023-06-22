import Nav from "@/Components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className={"bg-gondola-900 w-screen h-screen flex items-center"}>
        <div className="text-center w-full ">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gondola-700 to-gondola-300 min-h-screen flex">
      <Nav />

      <div className="bg-white flex-grow mt-3 mr-3 rounded-lg p-4 mb-3">
        {children}
      </div>
    </div>
  );
}
