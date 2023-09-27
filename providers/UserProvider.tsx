"use client";
import { UserButton } from "@clerk/nextjs";

const UserProvider = () => {
  return <UserButton afterSignOutUrl="/" />;
};

export default UserProvider;
