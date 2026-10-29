"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteDestinationDialog({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDeleteDestination() {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `http://localhost:8000/destinations/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : `Request failed with status ${response.status}.`;
        throw new Error(message);
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("deletedCount" in data) ||
        data.deletedCount !== 1
      ) {
        throw new Error("The destination could not be found or was not deleted.");
      }

      router.push("/destinations");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to delete destination."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="inline-flex h-8 items-center gap-2 rounded-none border-[#ef4444] px-3 text-xs text-[#ef4444] transition-colors hover:bg-[#fef2f2]"
          >
            <X className="size-3.5" aria-hidden="true" />
            Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            destination from our servers.
          </AlertDialogDescription>
          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={handleDeleteDestination}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
