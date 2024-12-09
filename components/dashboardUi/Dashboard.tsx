// 'use client'

import React from "react";
import { prisma } from "@/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = async () => {
    const project = await prisma.project.findMany();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer({project.length})</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
