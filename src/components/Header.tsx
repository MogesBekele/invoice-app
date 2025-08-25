import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Container from "@/components/Container";

const Header = () => {
  return (
    <header className="mb-10">
      <Container>
        <div className="flex justify-between items-center flex-wrap px-2 sm:px-6 py-4 gap-2 sm:gap-0">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold text-center hover:cursor-pointer"
          >
            Invoicing-app
          </Link>

          <div className="flex items-center gap-2">
            <SignedOut>
              <div className="px-2 py-1 text-sm bg-cyan-600 text-white rounded cursor-pointer hover:bg-cyan-700 transition-colors">
                <SignInButton mode="modal">Sign In</SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};
export default Header;
