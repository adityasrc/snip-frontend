import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../lib/api";
import toast from "react-hot-toast";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { LinkCard } from "../components/dashboard/LinkCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { Plus, Link as LinkIcon, Search } from "lucide-react";
import { CreateLinkModal } from "../components/modals/CreateLinkModal";
import { EditLinkModal } from "../components/modals/EditLinkModal";
import { DeleteLinkModal } from "../components/modals/DeleteLinkModal";
import { QrCodeModal } from "../components/modals/QrCodeModal";

function LinkSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-xs">
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-3 w-72 max-w-full" />
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t pt-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-40 rounded-full" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrModalLink, setQrModalLink] = useState(null);

  const [formData, setFormData] = useState({ title: "", originalUrl: "", customAlias: "", expiresAt: "" });
  const [editData, setEditData] = useState({ id: null, title: "", originalUrl: "" });
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    document.title = "Snip | Links";
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName;
      if (e.key !== "/" || tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await api.get(`/api/links`);
      setLinks(res.data.links || []);
    } catch (e) {
      if (e.response?.status !== 401) {
        toast.error("Failed to load links");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();

    const prefillUrl = location.state?.prefillUrl;
    if (prefillUrl) {
      setFormData((prev) => ({ ...prev, originalUrl: prefillUrl }));
      setIsModalOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [fetchLinks, location.pathname, location.state?.prefillUrl, navigate]);

  async function handleCreate() {
    const originalUrl = formData.originalUrl.trim();
    if (!originalUrl) return toast.error("URL is required");

    const payload = {
      originalUrl,
      title: formData.title.trim() || undefined,
      customAlias: formData.customAlias.trim() || undefined,
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
    };

    setSubmitLoading(true);
    try {
      const res = await api.post(`/api/links/shorten`, payload);
      const newLink = {
        ...res.data,
        _id: res.data._id,
        title: payload.title || "Untitled",
        originalUrl: payload.originalUrl,
        clicks: 0,
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
    const originalUrl = editData.originalUrl.trim();
    if (!originalUrl) return toast.error("URL cannot be empty");

    const payload = {
      originalUrl,
      title: editData.title.trim() || undefined,
    };

    setSubmitLoading(true);
    try {
      await api.patch(`/api/links/${editData.id}`, payload);

      setLinks((prev) =>
        prev.map((l) =>
          l._id === editData.id
            ? { ...l, title: payload.title || l.title, originalUrl: payload.originalUrl }
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

  const copyToClipboard = async (shortId) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${shortId}`);
      setCopiedLink(shortId);
      toast.success("Link copied!");
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const filteredLinks = links.filter(
    (link) =>
      (link.title && link.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (link.originalUrl && link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (link.shortId && link.shortId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-muted/50 pb-20">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 pt-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Links
              {!loading && links.length > 0 && (
                <span className="rounded-full border bg-card px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                  {links.length}
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and track your shortened links.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchRef}
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full pl-9 pr-10"
              />
              {!searchQuery && (
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:block">
                  /
                </kbd>
              )}
            </div>
            <Button
              className="group w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="transition-transform duration-200 group-hover:rotate-90" /> Create link
            </Button>
          </div>
        </div>

        {loading ? (
          <Skeleton className="mb-6 h-24 rounded-2xl" />
        ) : (
          links.length > 0 && <DashboardStats links={links} />
        )}

        {loading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <LinkSkeleton key={i} />
            ))}
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-16 px-6 bg-card rounded-2xl border border-dashed border-border animate-fade-up">
            <div className="bg-muted w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
              <LinkIcon className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="text-[17px] font-semibold text-foreground mb-1.5">No links yet</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
              Paste a long URL, get a short one, and see who clicks it.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus /> Create your first link
            </Button>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="text-center py-16 px-6 bg-card rounded-2xl border border-dashed border-border animate-fade-up">
            <div className="bg-muted w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-[17px] font-semibold text-foreground mb-1.5">No results found</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
              No links matched "{searchQuery}".
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredLinks.map((link, i) => (
              <LinkCard
                key={link._id}
                index={i}
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
                onQrCode={(data) => {
                  setQrModalLink(data);
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
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        link={qrModalLink}
      />
    </div>
  );
}
