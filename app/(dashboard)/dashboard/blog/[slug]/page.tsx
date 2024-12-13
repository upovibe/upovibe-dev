import { prisma } from "@/prisma";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import DeleteButton from "@/components/dashboardUi/DeleteButton";
import { deleteBlog } from "@/app/api/crude/formActions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import FroalaContentView from "@/components/ui/FroalaContentView";


interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


const page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: {
      slug: resolvedParams.slug,
    },
  });

  // If no blog is found, return an error page or message
  if (!blog) {
    return <div><h1 className="text-2xl font-bold">Blog Not Found</h1></div>;
  }

  return (
    <div>
      <Breadcrumb className="border px-1 rounded-md mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/dashboard/blog">Blog</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full gap-3 border p-2 rounded-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
          <FilePenLine className="size-5" />
          {blog.title}
        </h1>
        <h2 className="border-t border-b py-1 text-xl">{blog.description}</h2>
        {blog.image && (
          <div className="w-full h-64 relative overflow-hidden rounded-lg border">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose max-w-none mb-6 overflow-hidden h-auto w-full">
          <FroalaContentView model={blog.content} />
        </div>
        <div className="w-full flex items-center gap-2 justify-end">
          <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
            <Link href={`/dashboard/blog/${blog.slug}/edit`}>Edit</Link>
          </Button>
          <DeleteButton
            action={deleteBlog}
            args={[String(blog.id)]}
            buttonText="Delete"
            successRedirect="/dashboard/blog"
            errorMessage="Error deleting blog"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
