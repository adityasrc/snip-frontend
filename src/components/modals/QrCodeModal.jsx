import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, Copy, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCopy } from "../../lib/useCopy";

export function QrCodeModal({ open, onClose, link }) {
  const [downloading, setDownloading] = useState(false);
  const [copied, copy] = useCopy();

  if (!link) return null;

  const fullShortUrl = `${window.location.origin}/${link.shortId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=10&data=${encodeURIComponent(
    fullShortUrl
  )}`;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${link.shortId}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("QR code downloaded");
    } catch {
      window.open(qrUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle>QR code</DialogTitle>
          <DialogDescription className="truncate max-w-xs mx-auto">
            {link.title || fullShortUrl}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="rounded-2xl border bg-white p-3.5 shadow-xs">
            <img
              src={qrUrl}
              alt={`QR code for ${fullShortUrl}`}
              className="h-44 w-44 rounded-lg"
              width={176}
              height={176}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-muted-foreground truncate max-w-xs text-center">
            {window.location.host}/{link.shortId}
          </p>
        </div>

        <div className="flex gap-2 w-full pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => copy(fullShortUrl)}
          >
            {copied ? <Check className="text-success" /> : <Copy />} {copied ? "Copied" : "Copy link"}
          </Button>

          <Button
            className="flex-1"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? <Loader2 className="animate-spin" /> : <Download />}
            {downloading ? "Downloading…" : "Download PNG"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
