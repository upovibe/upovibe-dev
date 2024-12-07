import React from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

export default function SignIn({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sign In</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await signIn("github", { callbackUrl: "/dashboard" }); // Redirect to dashboard after sign-in
          }}
        >
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign in with GitHub
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
