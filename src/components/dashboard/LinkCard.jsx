import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isPast, format } from "date-fns";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  BarChart2,
  Edit,
  Trash2,
  Copy,
  Check,
  Calendar,
  ArrowUpRight,
  Globe,
  QrCode,
} from "lucide-react";

export function LinkCard({ link, copiedLink, onCopy, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const createdDate = link.createdAt
    ? new Date(link.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
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

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    `${displayOrigin}/${link.shortId}`
  )}`;

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-xs transition-colors hover:border-foreground/20">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-muted">
          {!imageError ? (
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
              alt=""
              className="h-5 w-5 rounded"
              onError={() => setImageError(true)}
            />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {link.title || "Untitled link"}
            </h3>
            {link.expiresAt &&
              (isPast(new Date(link.expiresAt)) ? (
                <Badge variant="destructive" className="shrink-0">
                  Expired
                </Badge>
              ) : (
                <Badge variant="secondary" className="shrink-0">
                  Expires {format(new Date(link.expiresAt), "MMM d")}
                </Badge>
              ))}
          </div>

          <div className="mt-1 flex items-center gap-1.5">
            <a
              href={`${displayOrigin}/${link.shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-mono text-sm text-brand hover:underline"
            >
              {displayHost}/{link.shortId}
            </a>
            <button
              type="button"
              onClick={() => onCopy(link.shortId)}
              title={copiedLink === link.shortId ? "Copied!" : "Copy link"}
              aria-label="Copy short link"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copiedLink === link.shortId ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={link.originalUrl}
            className="group/link mt-1 flex max-w-full items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="truncate">{link.originalUrl}</span>
            <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100" />
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /> Created {createdDate}
        </span>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/analytics/${link._id}`)}
            aria-label="View analytics"
          >
            <BarChart2 className="text-muted-foreground" /> {formattedClicks}{" "}
            <span className="text-muted-foreground">
              {link.clicks === 1 ? "click" : "clicks"}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="QR Code"
            aria-label="QR Code"
            onClick={() => window.open(qrUrl, "_blank")}
          >
            <QrCode />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Edit Link"
            aria-label="Edit Link"
            onClick={() =>
              onEdit({
                id: link._id,
                title: link.title,
                originalUrl: link.originalUrl,
              })
            }
          >
            <Edit />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/10 hover:text-destructive"
            title="Delete Link"
            aria-label="Delete Link"
            onClick={() => onDelete(link._id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
