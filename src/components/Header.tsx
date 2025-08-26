"use client";

import { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Container from "@/components/Container";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header className="mb-10">
      <Container>
        <div className="flex justify-between items-center flex-wrap px-2 sm:px-6 py-4 gap-2 sm:gap-0">
          <Link href="/" className="text-xl sm:text-2xl font-semibold">
            Invoicing-app
          </Link>

          <div className="flex items-center gap-2">
            <SignedOut>
              {isMobile ? (
                <Link href="/sign-in">
                  <button className="  text-gray-700 bg-white hover:cursor-pointer font-semibold text-xl sm:text-2xl">
                    Sign In
                  </button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className=" text-gray-700 bg-white hover:cursor-pointer font-semibold text-xl sm:text-2xl">
                    Sign In
                  </button>
                </SignInButton>
              )}
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
