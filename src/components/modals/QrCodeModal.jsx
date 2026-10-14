import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export function QrCodeModal({ isOpen, onClose, link }) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!link) return null;

  const displayOrigin = window.location.origin;
  const fullShortUrl = `${displayOrigin}/${link.shortId}`;
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      toast.success("Short link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm p-6 bg-card border-border rounded-2xl shadow-xl">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-lg font-semibold text-foreground tracking-tight">
            QR Code
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground truncate max-w-xs mx-auto">
            {link.title || fullShortUrl}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="rounded-2xl border border-border bg-white p-3.5 shadow-xs">
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
            className="flex-1 rounded-full text-xs"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy link
              </>
            )}
          </Button>

          <Button
            className="flex-1 rounded-full text-xs"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download className="h-3.5 w-3.5" />
            {downloading ? "Downloading..." : "Download PNG"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
