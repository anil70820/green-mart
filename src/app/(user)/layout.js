// app/(user)/layout.jsx
"use client";

import UserLayout from "@/components/user/UserLayout";

export default function UserLayoutHome({ children }) {
  return (
    <>
      <UserLayout>{children}</UserLayout>
    </>
  );
}
