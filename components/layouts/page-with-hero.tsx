import { LayoutProps } from "@/models/index";
import Link from "next/link";
import * as React from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Hero from "@/components/common/hero";
import GoHomeSection from "@/components/common/gohome-section";
export interface IPageWithHeroProps {}

export function PageWithHero({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Hero />
      <div>{children}</div>
      <GoHomeSection />
      <Footer />
    </div>
  );
}
