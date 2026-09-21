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
      <AlertDialogContent className="sm:max-w-sm rounded-2xl p-6 border border-[#e5e5e5] shadow-[rgba(0,0,0,0.08)_0px_8px_30px] bg-white">
        <div className="flex flex-col items-center text-center pt-2">
          <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-red-100">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <AlertDialogTitle className="text-lg font-semibold text-[#0a0a0a] tracking-tight">
            Delete link?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] text-[#737373] mt-2 leading-relaxed">
            This action cannot be undone. The short URL and all associated analytics will be permanently removed.
          </AlertDialogDescription>
        </div>

        <AlertDialogFooter className="flex flex-row justify-center gap-2 mt-6 sm:space-x-0 w-full">
          <AlertDialogCancel
            className="flex-1 h-9 rounded-full text-[13px] font-medium text-[#525252] border border-[#e5e5e5] hover:bg-[#f5f5f5] m-0 transition-colors"
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white text-[13px] font-medium rounded-full shadow-sm transition-all m-0"
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