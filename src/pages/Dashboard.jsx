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
import { getErrorMessage } from "../lib/utils";

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

function EmptyState({ icon, title, description, children }) {
  const Icon = icon;
  return (
    <div className="animate-fade-up rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h2 className="mb-1.5 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modal, setModal] = useState({ type: null });
  const searchRef = useRef(null);

  const openModal = (type, data = {}) => setModal({ type, ...data });
  const closeModal = () => setModal((current) => ({ ...current, type: null }));

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
      openModal("create", { url: prefillUrl });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [fetchLinks, location.pathname, location.state?.prefillUrl, navigate]);

  async function runAction(request, success, failure) {
    setSubmitLoading(true);
    try {
      await request();
      await fetchLinks();
      closeModal();
      toast.success(success);
    } catch (e) {
      toast.error(getErrorMessage(e, failure));
    } finally {
      setSubmitLoading(false);
    }
  }

  const handleCreate = (values) => runAction(() => api.post("/api/links/shorten", {
    originalUrl: values.originalUrl.trim(),
    title: values.title.trim() || undefined,
    customAlias: values.customAlias.trim() || undefined,
    expiresAt: values.expiresAt ? new Date(values.expiresAt).toISOString() : undefined,
  }), "Link created", "Error creating link");

  const handleEdit = (values) => runAction(() => api.patch(`/api/links/${modal.link._id}`, {
    originalUrl: values.originalUrl.trim(),
    title: values.title.trim() || undefined,
  }), "Link updated", "Failed to update link");

  const handleDelete = () => runAction(() => api.delete(`/api/links/${modal.link._id}`), "Link deleted", "Failed to delete link");

  const query = searchQuery.toLowerCase();
  const filteredLinks = links.filter((link) =>
    [link.title, link.originalUrl, link.shortId].some((v) => v?.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen bg-muted/50 pb-20">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 pt-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold tracking-tight">
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
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:block">
                  /
                </kbd>
              )}
            </div>
            <Button
              className="group w-full sm:w-auto"
              onClick={() => openModal("create")}
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
          <EmptyState
            icon={LinkIcon}
            title="No links yet"
            description="Paste a long URL, get a short one, and see who clicks it."
          >
            <Button onClick={() => openModal("create")}>
              <Plus /> Create your first link
            </Button>
          </EmptyState>
        ) : filteredLinks.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No results found"
            description={`No links matched "${searchQuery}".`}
          >
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </EmptyState>
        ) : (
          <div className="grid gap-3">
            {filteredLinks.map((link, i) => (
              <LinkCard
                key={link._id}
                index={i}
                link={link}
                onEdit={(link) => openModal("edit", { link })}
                onDelete={(link) => openModal("delete", { link })}
                onQrCode={(link) => openModal("qr", { link })}
              />
            ))}
          </div>
        )}
      </main>

      <CreateLinkModal
        open={modal.type === "create"}
        onClose={closeModal}
        initialUrl={modal.url}
        onSubmit={handleCreate}
        isLoading={submitLoading}
      />
      <EditLinkModal
        open={modal.type === "edit"}
        onClose={closeModal}
        link={modal.link}
        onSubmit={handleEdit}
        isLoading={submitLoading}
      />
      <DeleteLinkModal
        open={modal.type === "delete"}
        onClose={closeModal}
        link={modal.link}
        onSubmit={handleDelete}
        isLoading={submitLoading}
      />
      <QrCodeModal
        open={modal.type === "qr"}
        onClose={closeModal}
        link={modal.link}
      />
    </div>
  );
}
