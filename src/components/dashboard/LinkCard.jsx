import { useState } from "react";
import { Button } from "../ui/button";
import { BarChart2, Edit, Trash2, Copy, Check, Calendar, ArrowUpRight, Globe, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LinkCard({ link, copiedLink, onCopy, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const createdDate = link.createdAt
    ? new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recently";

  const formattedClicks = new Intl.NumberFormat("en-US").format(link.clicks || 0);
  const displayOrigin = window.location.origin;
  const displayHost = window.location.host;

  let domain = "";
  try {
    domain = new URL(link.originalUrl).hostname;
  } catch {
    domain = link.originalUrl;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${displayOrigin}/${link.shortId}`)}`;

  return (
    <div className="link-card group bg-background border border-border hover:border-foreground/20 rounded-2xl p-5 transition-all duration-200">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
            {!imageError ? (
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                alt=""
                className="w-3.5 h-3.5 rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </div>

          <h3 className="font-medium text-[15px] text-foreground truncate">
            {link.title || "Untitled Link"}
          </h3>
        </div>

        <span className="flex items-center shrink-0 text-xs text-muted-foreground gap-1.5">
          <Calendar className="w-3 h-3" /> {createdDate}
        </span>
      </div>

      <div className="mb-4">
        <a
          href={link.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={link.originalUrl}
          className="text-sm text-muted-foreground hover:text-foreground truncate max-w-xl inline-flex items-center gap-1 transition-colors group/link"
        >
          <span className="truncate">{link.originalUrl}</span>
          <ArrowUpRight className="w-3 h-3 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/50">
        <div className="inline-flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border rounded-full py-1.5 px-3 transition-colors w-fit">
          <a
            href={`${displayOrigin}/${link.shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-foreground hover:underline"
          >
            {displayHost}/{link.shortId}
          </a>
          <div className="h-3 w-px bg-border" />
          <button
            onClick={() => onCopy(link.shortId)}
            title={copiedLink === link.shortId ? "Copied!" : "Copy link"}
            aria-label="Copy short link"
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          >
            {copiedLink === link.shortId ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            title="View Analytics"
            aria-label="View Analytics"
            onClick={() => navigate(`/analytics/${link._id}`)}
            className="bg-background border-border text-foreground hover:bg-muted rounded-full px-3.5 h-8 text-sm font-medium gap-1.5 shadow-none"
          >
            <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formattedClicks}</span>
          </Button>

          <Button
            title="QR Code"
            aria-label="QR Code"
            variant="outline"
            size="sm"
            onClick={() => window.open(qrUrl, "_blank")}
            className="bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-full w-8 h-8 p-0 shadow-none"
          >
            <QrCode className="w-3.5 h-3.5" />
          </Button>

          <Button
            title="Edit Link"
            aria-label="Edit Link"
            variant="outline"
            size="sm"
            onClick={() => onEdit({ id: link._id, title: link.title, originalUrl: link.originalUrl })}
            className="bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-full w-8 h-8 p-0 shadow-none"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>

          <Button
            title="Delete Link"
            aria-label="Delete Link"
            variant="outline"
            size="sm"
            onClick={() => onDelete(link._id)}
            className="bg-background border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 text-muted-foreground rounded-full w-8 h-8 p-0 shadow-none transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
