import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function EditLinkModal({ isOpen, onClose, editData, setEditData, onSubmit, isLoading }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 bg-card border-border rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground tracking-tight">
            Edit Link
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Destination URL *</Label>
            <Input
              autoFocus
              className="h-10 rounded-xl border-border focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground shadow-none"
              value={editData.originalUrl}
              onChange={(e) => setEditData({ ...editData, originalUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Title</Label>
            <Input
              className="h-10 rounded-xl border-border focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground shadow-none"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="pt-4 mt-2 border-t border-border sm:justify-end sm:space-x-2">
          <Button
            variant="ghost"
            className="h-9 px-4 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="h-9 px-5 bg-primary hover:bg-primary/90 text-sm font-medium text-primary-foreground rounded-full shadow-sm transition-all"
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