import { LayoutProps } from "@/models/index";

export interface IEmptyLayoutProps {}

export function EmptyLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
