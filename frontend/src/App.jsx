

import {
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <h1 className="text-red-500">Welcome to the app</h1>
      <button className="btn btn-secondary">Touch me</button>

      {/* ONLY when logged out */}
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      {/* ONLY when logged in */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}

export default App;