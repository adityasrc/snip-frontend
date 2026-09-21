import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";

export function CreateLinkModal({ isOpen, onClose, formData, setFormData, onSubmit, isLoading }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 bg-white border-[#e5e5e5] rounded-2xl shadow-[rgba(0,0,0,0.08)_0px_8px_30px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#0a0a0a] tracking-tight">
            Create new link
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium text-[#262626]">Destination URL *</Label>
            <Input
              autoFocus
              className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] placeholder:text-[#a3a3a3] shadow-none"
              placeholder="https://example.com/very-long-url"
              value={formData.originalUrl}
              onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#262626]">Title</Label>
              <Input
                className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] placeholder:text-[#a3a3a3] shadow-none"
                placeholder="My Link"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px] font-medium text-[#262626]">Custom Alias</Label>
              <Input
                className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] placeholder:text-[#a3a3a3] shadow-none"
                placeholder="my-alias"
                value={formData.customAlias}
                onChange={(e) => setFormData({ ...formData, customAlias: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center text-[13px] font-medium text-[#262626]">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#737373]" /> Expiry Date (Optional)
            </Label>
            <Input
              className="h-10 rounded-xl border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] text-[14px] text-[#0a0a0a] shadow-none"
              type="datetime-local"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
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
            disabled={isLoading || !formData.originalUrl?.trim()}
          >
            {isLoading ? "Creating..." : "Create link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}