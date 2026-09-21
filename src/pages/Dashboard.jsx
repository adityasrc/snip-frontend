import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../lib/api";
import toast from "react-hot-toast";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { LinkCard } from "../components/dashboard/LinkCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Link as LinkIcon, Search } from "lucide-react";
import { CreateLinkModal } from "../components/modals/CreateLinkModal";
import { EditLinkModal } from "../components/modals/EditLinkModal";
import { DeleteLinkModal } from "../components/modals/DeleteLinkModal";
import { QrModal } from "../components/modals/QrModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [formData, setFormData] = useState({ title: "", originalUrl: "", customAlias: "", expiresAt: "" });
  const [editData, setEditData] = useState({ id: null, title: "", originalUrl: "" });
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [selectedQr, setSelectedQr] = useState({ url: "", title: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await api.get(`/api/links`);
      setLinks(res.data.links || []);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
        toast.error("Session expired. Please sign in again.");
      } else {
        toast.error("Failed to load links");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchLinks();

    const prefillUrl = location.state?.prefillUrl;
    if (prefillUrl) {
      setFormData((prev) => ({ ...prev, originalUrl: prefillUrl }));
      setIsModalOpen(true);
    }
  }, [fetchLinks, location.state?.prefillUrl, navigate]);

  async function handleCreate() {
    if (!formData.originalUrl.trim()) return toast.error("URL is required");
    setSubmitLoading(true);
    try {
      const res = await api.post(`/api/links/shorten`, formData);
      const newLink = {
        ...res.data,
        _id: res.data._id,
        title: formData.title || "Untitled",
        originalUrl: formData.originalUrl,
        clicks: 0,
        qrCode: res.data.qrDataUrl,
        shortId: res.data.finalId,
        createdAt: new Date().toISOString(),
      };

      setLinks((prev) => [newLink, ...prev]);
      setIsModalOpen(false);
      setFormData({ title: "", originalUrl: "", customAlias: "", expiresAt: "" });
      toast.success("Link created!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Error creating link");
    } finally {
      setSubmitLoading(false);
    }
  }

  async function handleEdit() {
    if (!editData.originalUrl.trim()) return toast.error("URL cannot be empty");
    setSubmitLoading(true);
    try {
      await api.patch(`/api/links/${editData.id}`, {
        title: editData.title,
        originalUrl: editData.originalUrl,
      });

      setLinks((prev) =>
        prev.map((l) =>
          l._id === editData.id
            ? { ...l, title: editData.title, originalUrl: editData.originalUrl }
            : l
        )
      );

      setIsEditModalOpen(false);
      toast.success("Link updated");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update link");
    } finally {
      setSubmitLoading(false);
    }
  }

  async function handleDelete() {
    if (!linkToDelete) return;
    setSubmitLoading(true);
    try {
      await api.delete(`/api/links/${linkToDelete}`);
      setLinks((prev) => prev.filter((l) => l._id !== linkToDelete));
      setIsDeleteModalOpen(false);
      toast.success("Link deleted");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete link");
    } finally {
      setSubmitLoading(false);
      setLinkToDelete(null);
    }
  }

  const copyToClipboard = (shortId) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortId}`);
    setCopiedLink(shortId);
    toast.success("Link copied!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const filteredLinks = links.filter(
    (link) =>
      (link.title && link.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (link.originalUrl && link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (link.shortId && link.shortId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard-page min-h-screen bg-[#f4f6f9] font-sans pb-20">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 pt-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0a0a0a] tracking-tight">
              Links
            </h1>
            <p className="text-[14px] text-[#737373] mt-0.5">
              Manage and track your shortened links.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
              <Input
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 bg-white border-[#e5e5e5] text-[#0a0a0a] focus-visible:ring-1 focus-visible:ring-[#0a0a0a] rounded-full text-[13px] h-9 w-full shadow-[rgba(0,0,0,0.03)_0px_1px_2px_0px]"
              />
            </div>
            <Button
              className="bg-[#0a0a0a] hover:bg-[#262626] text-white rounded-full shadow-[rgba(0,0,0,0.06)_0px_1px_2px_0px] transition-all font-medium text-[13px] h-9 px-4 w-full sm:w-auto inline-flex items-center gap-1.5"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> Create Link
            </Button>
          </div>
        </div>

        {/* Stats */}
        {!loading && links.length > 0 && <DashboardStats links={links} />}

        {/* Links list */}
        {loading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-24 w-full border border-[#e5e5e5] animate-pulse" />
            ))}
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-2xl border border-dashed border-[#e5e5e5] shadow-[rgba(0,0,0,0.02)_0px_1px_2px_0px] mt-4">
            <div className="bg-[#f5f5f5] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#e5e5e5]">
              <LinkIcon className="w-5 h-5 text-[#0a0a0a]" />
            </div>
            <h2 className="text-[17px] font-semibold text-[#0a0a0a] mb-1.5">No links created yet</h2>
            <p className="text-[14px] text-[#737373] mb-6 max-w-sm mx-auto leading-relaxed">
              Shorten your first URL to begin tracking real-time click analytics and QR codes.
            </p>
            <Button
              className="bg-[#0a0a0a] hover:bg-[#262626] text-white rounded-full px-5 h-9 font-medium text-[13px] shadow-sm inline-flex items-center gap-1.5"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> Create your first link
            </Button>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-2xl border border-dashed border-[#e5e5e5] shadow-[rgba(0,0,0,0.02)_0px_1px_2px_0px] mt-4">
            <div className="bg-[#f5f5f5] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#e5e5e5]">
              <Search className="w-5 h-5 text-[#737373]" />
            </div>
            <h2 className="text-[17px] font-semibold text-[#0a0a0a] mb-1.5">No results found</h2>
            <p className="text-[14px] text-[#737373] mb-6 max-w-sm mx-auto leading-relaxed">
              No links matched "{searchQuery}".
            </p>
            <Button
              variant="outline"
              className="bg-white border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#f5f5f5] rounded-full px-4 h-9 text-[13px] font-medium"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                copiedLink={copiedLink}
                onCopy={copyToClipboard}
                onEdit={(data) => {
                  setEditData(data);
                  setIsEditModalOpen(true);
                }}
                onDelete={(id) => {
                  setLinkToDelete(id);
                  setIsDeleteModalOpen(true);
                }}
                onQr={(data) => {
                  setSelectedQr(data);
                  setIsQrModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
        isLoading={submitLoading}
      />
      <EditLinkModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editData={editData}
        setEditData={setEditData}
        onSubmit={handleEdit}
        isLoading={submitLoading}
      />
      <DeleteLinkModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={handleDelete}
        isLoading={submitLoading}
      />
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        selectedQr={selectedQr}
      />
    </div>
  );
}
