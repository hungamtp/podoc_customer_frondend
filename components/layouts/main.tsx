import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import * as React from 'react';
import Header from '@/pages/header';
import Footer from '@/pages/footer';
export interface IMainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />

      <div>{children}</div>
      <Footer />
    </div>
  );
}
