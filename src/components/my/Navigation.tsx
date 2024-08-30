"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosCalculator } from "react-icons/io";
import { IconContext } from "react-icons";
import { HiCurrencyDollar } from "react-icons/hi2";

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="p-5">
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md m-6 rounded-full">
        <div className="flex justify-around py-2">
          <Link href="/">
            <div
              className={`flex flex-col items-center ${
                pathname === "/" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <IconContext.Provider value={{ size: "29px" }}>
                <HiCurrencyDollar />
              </IconContext.Provider>

              <span className="text-sm">Converter</span>
            </div>
          </Link>
          <Link href="/calculator">
            <div
              className={`flex flex-col items-center ${
                pathname === "/calculator" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <IconContext.Provider value={{ size: "29px" }}>
                <IoIosCalculator />
              </IconContext.Provider>
              <span className="text-sm">Calculator</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
