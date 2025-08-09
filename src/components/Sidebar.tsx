"use client";
import React from "react";
import NavLink from "./NavLink";

const sideitems = [
  {
    name: "Overview",
    link: "/docs/overview",
  },
  {
    name: "Leetcode",
    link: "/docs/leetcode",
  },
  {
    name: "CodeChef",
    link: "/docs/codechef",
  },
  {
    name: "Codeforces",
    link: "/docs/codeforces",
  },
  {
    name: "GeekForGeeks",
    link: "/docs/geekforgeeks",
  },
  {
    name: "HackerRank",
    link: "/docs/hackerrank",
  },
  {
    name: "AtCoder",
    link: "/docs/atcoder",
  },
];
const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 min-h-screen bg-black text-white shadow-2xl ">
      <ul className="flex-1 py-4">
        {sideitems.map((item) => (
          <NavLink href={item.link}>
            <li className="px-6 py-3 my-1 mx-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-800 hover:text-indigo-300 font-medium tracking-wide">
              {item.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
