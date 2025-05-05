import type { Metadata } from "next";
import ThemeProviderWrapper from "@/app/theme-provider";
import { StyledParentBox } from "./style";

export const metadata: Metadata = {
  title: "NYC2025",
  description: "National Youth Council, Singapore",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProviderWrapper>
      <StyledParentBox>{children}</StyledParentBox>
    </ThemeProviderWrapper>
  );
}
