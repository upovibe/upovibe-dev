import React from "react";
import { prisma } from "@/prisma";
import TableLayout from "@/components/dashboardUi/TableLayout"; // Client Component

const CategoryPage = async () => {
  const category = await prisma.category.findMany();

  const deleteRow = async (id: number) => {
    "use server";
    await prisma.category.delete({ where: { id } });
  };  
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Category</h1>
      <TableLayout
        data={category}
        title="Category"
        deleteRow={deleteRow}
      />
    </div>
  );
};

export default CategoryPage;