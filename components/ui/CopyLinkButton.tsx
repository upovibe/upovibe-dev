"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import toast from "react-hot-toast";

const CopyLinkButton = () => {
  const copyLink = async () => {
    try {
      const currentPageUrl = window.location.href;
      await navigator.clipboard.writeText(currentPageUrl);
      toast.success("Link copied to clipboard!", {
        style: {
          background: "#4caf50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy the link. Please try again.", {
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Button variant="ghost" className="p-2 lg:py-1" onClick={copyLink}>
      <Link className="mr-2" />
      <span className="hidden lg:inline-flex">Copy Link</span>
    </Button>
  );
};

export default CopyLinkButton;
