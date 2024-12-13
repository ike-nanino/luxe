"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form"
import { PackageIcon, TrolleyIcon, SearchIcon } from "@sanity/icons";
import useCartStore from "@/store/store";

function Header() {
  const { user } = useUser();

  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));


  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 transition-opacity duration-300 cursor-pointer mx-auto sm:mx-0"
        >
          Luxé
        </Link>

        
        <Form 
          action="/search" 
          className="relative w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="bg-gray-100 text-gray-800 px-4 rounded py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-800"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/cart"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />

            <span className={`absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center  justify-center text-xs ${itemCount === 0 ? "hidden" : ""}`}> {itemCount} </span>
            <span>Cart</span>
          </Link>

          

          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <div className="ml-4 bg-blue-600 hover:bg-blue-700 hover:text-white animate-pulse font-bold py-2 px-4 rounded border-blue-300 border text-sm text-white ">
                  <SignInButton mode="modal" />
              </div>
              
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border text-sm"
              >
                Passkey
              </button>
            )}
          </ClerkLoaded>

      
        </div>
      </div>
    </header>
  );
}

export default Header;
