import { LayoutProps } from "@/models/index";
import { useRouter } from "next/router";
import Footer from "../common/footer";
import Header from "../common/header";
import { useAppSelector } from "../hooks/reduxHook";
import { MainLayout } from "./main";

export function CheckoutLayout({ children }: LayoutProps) {
  const auth = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.carts);
  const router = useRouter();
  if (auth.roleName !== "USER") {
    router.push("/login");
  } else if (cart.length === 0) {
    router.push("/designs");
  }
  return (
    <MainLayout>
      <Header />
      <div>{children}</div>
      <Footer />
    </MainLayout>
  );
}
