import { LayoutProps } from "@/models/index";
import { useRouter } from "next/router";
import Footer from "../common/footer";
import Header from "../common/header";
import { useAppSelector } from "../hooks/reduxHook";
import { MainLayout } from "./main";

export function ControlLayout({ children }: LayoutProps) {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (auth.roleName !== "USER") {
    router.push("/login");
  }
  return (
    <MainLayout>
      <Header />
      <div>{children}</div>
      <Footer />
    </MainLayout>
  );
}
