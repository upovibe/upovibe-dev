"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { prisma } from "@/prisma";
import { Category } from "@prisma/client";

interface FormLayoutProps {
  fields: Array<"name" | "description" | "image" | "category">;
  labels?: {
    name?: string;
    description?: string;
    image?: string;
    category?: string;
  };
  onSubmit: (formData: FormData, ...args: any[]) => Promise<{ success: boolean; error?: string }>;
  additionalSubmitArgs?: unknown[];
  initialData?: {
    name?: string;
    description?: string;
    image?: string;
    categoryId?: string;
  };
  successRedirect?: string; 
}

const FormLayout: React.FC<FormLayoutProps> = ({
  fields,
  labels = {
    name: "Name",
    description: "Description",
    image: "Image",
    category: "Category",
  },
  onSubmit,
  additionalSubmitArgs = [],
  initialData,
  successRedirect,
}) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialData?.categoryId || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await prisma.category.findMany();
      setCategories(data);
    };
    if (fields.includes("category")) fetchCategories();
  }, [fields]);

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    if (fields.includes("name") && !formData.get("name")) {
      newErrors.name = "Name is required.";
    }
    if (fields.includes("description") && !formData.get("description")) {
      newErrors.description = "Description is required.";
    }
    if (fields.includes("category") && !formData.get("category")) {
      newErrors.category = "Category is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    if (!validateForm(formData)) {
      toast.error("All fields are required.");
      return;
    }
  
    const result = await onSubmit(formData, ...additionalSubmitArgs);
  
    if (result.success) {
        toast.success("Successful.");
        if (successRedirect) {
          router.push(successRedirect); // Redirect after success
        }
    } else {
      toast.error(`Error: ${result.error}`);
    } 
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-5 border p-4 rounded-lg">
        {fields.includes("name") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">{labels.name}</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={`Enter ${labels.name?.toLowerCase()}`}
              defaultValue={initialData?.name}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}
        {fields.includes("description") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">{labels.description}</Label>
            <Textarea
              placeholder={`Enter ${labels.description?.toLowerCase()}`}
              id="description"
              name="description"
              defaultValue={initialData?.description}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        )}
        {fields.includes("image") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="image">{labels.image}</Label>
            <Input id="image" type="file" name="image" />
          </div>
        )}
        {fields.includes("category") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="category">{labels.category}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between"
                >
                  {value
                    ? categories.find((category) => category.id === parseInt(value))
                        ?.name
                    : "Select category..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.id.toString()}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          {category.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === category.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>
        )}
        <Button type="submit" className="w-28 ml-auto">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormLayout;
