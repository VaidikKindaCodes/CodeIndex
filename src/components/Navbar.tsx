"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";

function NavItems() {
  const navitems = [
    {
      name: "Overview",
      link: "/docs/overview"
    },
    {
      name: "Leetcode",
      link: "/docs/leetcode"
    },
    {
      name: "CodeChef",
      link: "/docs/codechef"
    },
    {
      name: "Codeforces",
      link: "/docs/codeforces"
    },
    {
      name: "GeekForGeeks",
      link: "/docs/geekforgeeks"
    },
    {
      name: "AtCoder",
      link: "/docs/atcoder"
    },
  ];
  return (
    <ul className="flex flex-col  space-y-4  text-neutral-400 font-medium">
        
      {navitems.map((item, index) => (
        <li
          key={index}
          className="bg-transparent sm:rounded-none rounded-md  px-3  py-2"
        >
          <NavLink
            href={item.link}
            className="hover:text-white transition-colors duration-200 block"
          > 
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function Navbar() {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black/90" id="navbar">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto px-5">
          <button
            onClick={() => SetIsOpen((prev) => !prev)}
            className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 "
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt=""
              className="w-6 h-6"
            />
          </button>
          
        </div>
        <div className={isOpen ? "max-h-screen" : "max-h-0"}>
          {isOpen && (
            <nav className=" px-5 pb-4">
              <NavItems
              />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
