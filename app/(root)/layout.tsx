import Header from "@/components/layouts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 bg-opacity-90">
  <Header />
  {children}
</main>


  );
}
