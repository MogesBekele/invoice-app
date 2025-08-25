import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Container from "@/components/Container";

const Header = () => {
  return (
    <header className="mb-10">
    <Container>
    <div className="flex justify-between p-6 items-center">
      <Link href="/" className="text-2xl font-semibold text-center hover:cursor-pointer">
        Invoicing-app
      </Link>

      <SignedOut>
        <div className="px-3 py-1.5  bg-cyan-600 text-white rounded cursor-pointer hover:cursor-pointer hover:bg-cyan-700 transition-colors">
          <SignInButton mode="modal">Sign In</SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
    </Container>
    </header>
  );
};
export default Header;
