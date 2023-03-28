import Header from "@/components/Header";
import "./globals.css";
import QueryWrapper from "./auth/QueryWraper";

export const metadata = {
  title: "Create your Image",
  description: "Created by boban dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-openAI_Secondary">
        <QueryWrapper>
          <Header />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
