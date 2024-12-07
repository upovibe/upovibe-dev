import Header from "@/components/layouts/Header";

export default function Layout ({children} : Readonly<{children: React.ReactNode}>){
    return (
        <main className="bg-red-600">
            <Header/> 
            {children}
        </main>
    )
}