import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";

function localDateTimeNow() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export function CreateLinkModal({ isOpen, onClose, formData, setFormData, onSubmit, isLoading }) {
  const minimumExpiry = localDateTimeNow();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 bg-card border-border rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground tracking-tight">
            Create new link
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Destination URL *</Label>
            <Input
              autoFocus
              className="h-10 rounded-xl border-border focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground placeholder:text-muted-foreground shadow-none"
              placeholder="https://example.com/very-long-url"
              value={formData.originalUrl}
              onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">Title</Label>
              <Input
                className="h-10 rounded-xl border-border focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground placeholder:text-muted-foreground shadow-none"
                placeholder="My Link"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">Custom Alias</Label>
              <Input
                className="h-10 rounded-xl border-border focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground placeholder:text-muted-foreground shadow-none"
                placeholder="my-alias"
                value={formData.customAlias}
                onChange={(e) => setFormData({ ...formData, customAlias: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="expires-at" className="flex items-center text-sm font-medium text-foreground">
                <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Expiry date
              </Label>
              {formData.expiresAt && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, expiresAt: "" })}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <Input
              id="expires-at"
              className="h-10 rounded-lg border-border bg-background focus-visible:ring-1 focus-visible:ring-ring text-sm text-foreground shadow-none"
              type="datetime-local"
              min={minimumExpiry}
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
            />
            <p className="text-[11px] leading-4 text-muted-foreground">Leave this empty to keep the link active.</p>
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
            disabled={isLoading || !formData.originalUrl?.trim()}
          >
            {isLoading ? "Creating..." : "Create link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
