"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

export function SidebarNavigation({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Compte",
      href: "/account",
      icon: (
        <RiAccountCircleLine className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Type de compte",
      href: "/account-type",
      icon: (
        <MdOutlineManageAccounts className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        "w-full h-screen flex flex-col md:flex-row bg-pink-500 dark:bg-neutral-800 flex-1"
      }
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IoHomeOutline className={"h-5 w-6 flex-shrink-0"} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre"
      >
        Projet base de données
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center py-1 relative z-20"
    >
      <IoHomeOutline className={"h-5 w-6 flex-shrink-0"} />
    </Link>
  );
};
