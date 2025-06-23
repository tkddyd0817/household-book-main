// app/layout.tsx
import "./globals.css";
import { ReduxProvider } from "../components/provider/ReduxProvider";

export const metadata = {
  title: "가계부 | Household Book",
  description: "개인 가계부 관리 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
