import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

function EditLinkForm({ link, onSubmit, onClose, isLoading }) {
  const [values, setValues] = useState({
    originalUrl: link.originalUrl || "",
    title: link.title || "",
  });

  const update = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.originalUrl.trim()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="edit-url">Destination URL *</Label>
        <Input
          id="edit-url"
          autoFocus
          value={values.originalUrl}
          onChange={update("originalUrl")}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="edit-title">Title</Label>
        <Input
          id="edit-title"
          placeholder="My Link"
          value={values.title}
          onChange={update("title")}
        />
      </div>

      <DialogFooter className="border-t pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !values.originalUrl.trim()}>
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? "Saving…" : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function EditLinkModal({ open, onClose, link, onSubmit, isLoading }) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      {link && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription className="font-mono">
              {window.location.host}/{link.shortId}
            </DialogDescription>
          </DialogHeader>
          <EditLinkForm
            link={link}
            onSubmit={onSubmit}
            onClose={onClose}
            isLoading={isLoading}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}