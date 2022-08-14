import { LayoutProps } from "@/models/index";
import { useRouter } from "next/router";
import { useAppSelector } from "../hooks/reduxHook";

export interface IDesignControlProps {}

export function DesignControl({ children }: LayoutProps) {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (auth.roleName !== "USER") {
    router.push("/login");
  }
  return <div>{children}</div>;
}
