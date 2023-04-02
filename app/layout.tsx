import Header from "@/components/Header";
import "./globals.css";
import QueryWrapper from "./auth-query/QueryWraper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Create your Image",
  description: "Created by boban dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await Header();
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-openAI_Secondary">
        <QueryWrapper>
          {header}
          {children}
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
