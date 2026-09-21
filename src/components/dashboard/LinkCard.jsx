import { Button } from "../ui/button";
import { BarChart2, Edit, QrCode, Trash2, Copy, Check, Calendar, ArrowUpRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LinkCard({ link, copiedLink, onCopy, onEdit, onDelete, onQr }) {
  const navigate = useNavigate();

  const createdDate = link.createdAt
    ? new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recently";

  const formattedClicks = new Intl.NumberFormat("en-US").format(link.clicks || 0);
  const displayOrigin = window.location.origin;
  const displayHost = window.location.host;

  // Extract hostname for favicon/display
  let domain = "";
  try {
    domain = new URL(link.originalUrl).hostname;
  } catch {
    domain = link.originalUrl;
  }

  return (
    <div className="link-card group bg-white border border-[#e1e5eb] hover:border-[#b9c4d4] rounded-xl p-5 transition-all duration-200 shadow-none">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left column: Title, destination, short URL */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2.5 mb-1.5">
            {/* Domain favicon / icon */}
            <div className="w-6 h-6 rounded-full bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center shrink-0">
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                alt=""
                className="w-3.5 h-3.5 rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <Globe className="w-3 h-3 text-[#737373] hidden" />
            </div>

            <h3 className="font-semibold text-[15px] text-[#0a0a0a] truncate">
              {link.title || "Untitled Link"}
            </h3>

            <span className="flex items-center shrink-0 text-[11px] font-medium text-[#a3a3a3] gap-1 ml-auto md:ml-0">
              <Calendar className="w-3 h-3" /> {createdDate}
            </span>
          </div>

          {/* Original URL */}
          <div className="flex items-center gap-1.5 mb-3.5 max-w-full">
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={link.originalUrl}
              className="text-[13px] text-[#737373] hover:text-[#0a0a0a] truncate block transition-colors flex items-center gap-1 group/link"
            >
              <span className="truncate">{link.originalUrl}</span>
              <ArrowUpRight className="w-3 h-3 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Short link badge with copy button */}
          <div className="flex items-center gap-2 w-fit">
            <div className="inline-flex items-center gap-2 bg-[#f5f5f5] hover:bg-[#ededed] border border-[#e5e5e5] px-3 py-1 rounded-full transition-colors">
              <a
                href={`${displayOrigin}/${link.shortId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] font-medium text-[13px] hover:underline"
              >
                {displayHost}/{link.shortId}
              </a>
              <div className="h-3 w-px bg-[#d4d4d4]" />
              <button
                onClick={() => onCopy(link.shortId)}
                title={copiedLink === link.shortId ? "Copied!" : "Copy link"}
                aria-label="Copy short link"
                className="text-[#737373] hover:text-[#0a0a0a] transition-colors focus:outline-none"
              >
                {copiedLink === link.shortId ? (
                  <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Action buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#f5f5f5]">
          {/* Analytics button */}
          <Button
            variant="outline"
            size="sm"
            title="View Analytics"
            aria-label="View Analytics"
            onClick={() => navigate(`/analytics/${link._id}`)}
            className="bg-white border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#f5f5f5] rounded-full px-3.5 h-8 text-[13px] font-medium gap-1.5 shadow-none"
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#525252]" />
            <span>{formattedClicks}</span>
          </Button>

          {/* QR button */}
          <Button
            title="QR Code"
            aria-label="Generate QR Code"
            variant="outline"
            size="sm"
            onClick={() => onQr({ url: link.qrCode, title: link.title })}
            className="bg-white border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#525252] hover:text-[#0a0a0a] rounded-full w-8 h-8 p-0 shadow-none"
          >
            <QrCode className="w-3.5 h-3.5" />
          </Button>

          {/* Edit button */}
          <Button
            title="Edit Link"
            aria-label="Edit Link"
            variant="outline"
            size="sm"
            onClick={() => onEdit({ id: link._id, title: link.title, originalUrl: link.originalUrl })}
            className="bg-white border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#525252] hover:text-[#0a0a0a] rounded-full w-8 h-8 p-0 shadow-none"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>

          {/* Delete button */}
          <Button
            title="Delete Link"
            aria-label="Delete Link"
            variant="outline"
            size="sm"
            onClick={() => onDelete(link._id)}
            className="bg-white border-[#e5e5e5] hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-[#737373] rounded-full w-8 h-8 p-0 shadow-none transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
