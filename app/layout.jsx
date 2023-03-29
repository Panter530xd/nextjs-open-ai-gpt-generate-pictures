import Header from "@/components/Header";
import "./globals.css";
import QueryWrapper from "./auth-query/QueryWraper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Create your Image",
  description: "Created by boban dev",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className=" bg-openAI_Secondary">
        <QueryWrapper>
          <Header />
          {children}
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
