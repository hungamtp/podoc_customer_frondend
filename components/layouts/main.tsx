import { LayoutProps } from "@/models/index";
import Link from "next/link";
import * as React from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { useAppSelector } from "../hooks/reduxHook";
import { useRouter } from "next/router";
export interface IMainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (auth.roleName === "ADMIN" || auth.roleName === "FACTORY") {
    router.push("/login");
  }
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
