import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between gap-4 p-6">
      <h1 className="text-3xl font-bold text-center">Invoicing-app</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
export default Header;
