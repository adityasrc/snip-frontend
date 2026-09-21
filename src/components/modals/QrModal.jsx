import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export function QrModal({ isOpen, onClose, selectedQr }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm p-6 bg-white border-[#e5e5e5] rounded-2xl shadow-[rgba(0,0,0,0.08)_0px_8px_30px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-lg font-semibold text-[#0a0a0a] tracking-tight text-center">
            QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-2">
          <div className="bg-white p-3.5 rounded-2xl border border-[#e5e5e5] shadow-sm mb-3">
            <img
              src={selectedQr?.url}
              className="w-44 h-44"
              alt="QR code for shortened link"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <p className="font-medium text-[13px] text-[#525252] truncate w-full px-4 text-center">
            {selectedQr?.title || "Shortened link"}
          </p>
        </div>

        <DialogFooter className="flex flex-row justify-center gap-2 pt-4 mt-2 border-t border-[#f5f5f5] sm:space-x-0 w-full">
          <Button
            variant="ghost"
            className="flex-1 h-9 rounded-full text-[13px] font-medium text-[#525252] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] m-0"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="flex-1 h-9 bg-[#0a0a0a] hover:bg-[#262626] text-white text-[13px] font-medium rounded-full shadow-sm transition-all m-0 inline-flex items-center justify-center gap-1.5"
            onClick={() => {
              if (!selectedQr?.url) return;
              const a = document.createElement("a");
              a.href = selectedQr.url;
              a.download = "snip-qr.png";
              a.click();
            }}
          >
            <Download className="w-3.5 h-3.5" /> Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}