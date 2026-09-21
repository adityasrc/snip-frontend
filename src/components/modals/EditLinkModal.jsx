import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function EditLinkModal({ isOpen, onClose, editData, setEditData, onSubmit, isLoading }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 bg-white border-[#e5e5e5] rounded-2xl shadow-[rgba(0,0,0,0.08)_0px_8px_30px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#0a0a0a] tracking-tight">
            Edit Link
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium text-[#262626]">Destination URL *</Label>
            <Input
              autoFocus
              className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] shadow-none"
              value={editData.originalUrl}
              onChange={(e) => setEditData({ ...editData, originalUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium text-[#262626]">Title</Label>
            <Input
              className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] shadow-none"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="pt-4 mt-2 border-t border-[#f5f5f5] sm:justify-end sm:space-x-2">
          <Button
            variant="ghost"
            className="h-9 px-4 rounded-full text-[13px] font-medium text-[#525252] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="h-9 px-5 bg-[#0a0a0a] hover:bg-[#262626] text-[13px] font-medium text-white rounded-full shadow-sm transition-all"
            onClick={onSubmit}
            disabled={isLoading || !editData.originalUrl?.trim()}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}