import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart2, Edit, QrCode, Trash2, Copy, Check, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LinkCard({ link, copiedLink, onCopy, onEdit, onDelete, onQr }) {
  const navigate = useNavigate();
  
  const createdDate = link.createdAt ? new Date(link.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Just now";
  const formattedClicks = new Intl.NumberFormat('en-US').format(link.clicks || 0);

  const displayOrigin = window.location.origin;
  const displayHost = window.location.host;

  return (
    <Card className="border-slate-200 overflow-hidden group bg-white rounded-2xl transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:border-orange-200">
      <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="font-bold text-lg text-slate-900 truncate">
              {link.title || "Untitled Link"}
            </h3>
            <span className="flex items-center shrink-0 text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 mr-1" /> {createdDate}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 mb-3.5 max-w-full">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a 
              href={link.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              title={link.originalUrl}
              className="text-[13px] text-slate-400 hover:text-slate-600 hover:underline truncate block transition-colors"
            >
              {link.originalUrl}
            </a>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
            <a 
              href={`${displayOrigin}/${link.shortId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 font-semibold text-[14px] hover:text-orange-700 hover:underline transition-colors"
            >
              {displayHost}/{link.shortId}
            </a>
            <div className="h-4 w-px bg-slate-300"></div>
            <button 
              onClick={() => onCopy(link.shortId)} 
              title={copiedLink === link.shortId ? "Copied!" : "Copy to clipboard"}
              aria-label="Copy short link"
              className="text-slate-400 hover:text-slate-700 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            >
              {copiedLink === link.shortId ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            title="View Analytics"
            aria-label="View Analytics"
            onClick={() => navigate(`/analytics/${link._id}`)} 
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 hover:text-orange-800 rounded-xl px-3"
          >
            <BarChart2 className="w-4 h-4 mr-1.5" />
            <span className="font-semibold">{formattedClicks}</span>
          </Button>
          
          <Button title="Generate QR Code" aria-label="Generate QR Code" variant="outline" size="sm" onClick={() => onQr({ url: link.qrCode, title: link.title })} className="bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl px-2.5">
            <QrCode className="w-4 h-4" />
          </Button>
          
          <Button title="Edit Link" aria-label="Edit Link" variant="outline" size="sm" onClick={() => onEdit({ id: link._id, title: link.title, originalUrl: link.originalUrl })} className="bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl px-2.5">
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button title="Delete Link" aria-label="Delete Link" variant="outline" size="sm" onClick={() => onDelete(link._id)} className="bg-white border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl px-2.5 transition-colors">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}