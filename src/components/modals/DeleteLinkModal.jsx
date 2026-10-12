import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";

export function DeleteLinkModal({ isOpen, onClose, onSubmit, isLoading }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-sm rounded-2xl p-6 border border-border shadow-xl bg-card">
        <div className="flex flex-col items-center text-center pt-2">
          <div className="bg-destructive/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-destructive/20">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <AlertDialogTitle className="text-lg font-semibold text-foreground tracking-tight">
            Delete link?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
            This action cannot be undone. The short URL and all associated analytics will be permanently removed.
          </AlertDialogDescription>
        </div>

        <AlertDialogFooter className="flex flex-row justify-center gap-2 mt-6 sm:space-x-0 w-full">
          <AlertDialogCancel
            className="flex-1 h-9 rounded-full text-sm font-medium text-muted-foreground border border-border hover:bg-muted hover:text-foreground m-0 transition-colors"
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 h-9 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm font-medium rounded-full shadow-sm transition-all m-0"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}