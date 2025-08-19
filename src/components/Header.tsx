import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between gap-4 p-6 items-center">
      <Link href="/" className="text-3xl font-bold text-center">
        Invoicing-app
      </Link>

      <SignedOut>
        <div className="px-4 py-2 bg-cyan-600 text-white rounded cursor-pointer hover:cursor-pointer hover:bg-cyan-700 transition-colors">
          <SignInButton mode="modal">Sign In</SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
export default Header;
