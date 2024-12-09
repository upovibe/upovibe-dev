"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface ActionButtonProps {
  action: (...args: unknown[]) => Promise<{ success: boolean; error?: string }>;
  args: unknown[];
  successRedirect?: string;
  errorMessage?: string;
  buttonText: string;
}

const DeleteButton: React.FC<ActionButtonProps> = ({
  action,
  args,
  successRedirect = "",
  errorMessage = "An error occurred",
  buttonText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setIsDialogOpen(false);

    try {
      const result = await action(...args);

      if (result.success) {
        toast.success("Successful!");
        if (successRedirect) {
          router.push(successRedirect);
        }
      } else {
        toast.error(result.error || errorMessage);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          buttonText
        )}
      </Button>

      {/* AlertDialog for confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete content
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
