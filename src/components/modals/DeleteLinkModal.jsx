import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { buttonVariants } from "../ui/button-variants";

export function DeleteLinkModal({ open, onClose, link, onSubmit, isLoading }) {
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <AlertDialogTitle>
            Delete “{link?.title || "this link"}”?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This can't be undone. The short URL and its analytics will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row">
          <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive", className: "flex-1" })}
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}