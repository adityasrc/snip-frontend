import { useState } from "react";
import { format } from "date-fns";
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
import { Calendar, Loader2 } from "lucide-react";

function CreateLinkForm({ initialUrl = "", onSubmit, onClose, isLoading }) {
  const [values, setValues] = useState({
    originalUrl: initialUrl,
    title: "",
    customAlias: "",
    expiresAt: "",
  });

  const update = (field) => (e) =>
    setValues({ ...values, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.originalUrl.trim()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="create-url">Destination URL *</Label>
        <Input
          id="create-url"
          autoFocus
          placeholder="https://example.com/very-long-url"
          value={values.originalUrl}
          onChange={update("originalUrl")}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="create-title">Title</Label>
          <Input
            id="create-title"
            placeholder="My Link"
            value={values.title}
            onChange={update("title")}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="create-alias">Custom alias</Label>
          <Input
            id="create-alias"
            placeholder="my-alias"
            value={values.customAlias}
            onChange={update("customAlias")}
          />
        </div>
      </div>

      <div className="space-y-2 rounded-xl border bg-muted/30 p-3">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="create-expires" className="flex items-center">
            <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Expiry date
          </Label>
          {values.expiresAt && (
            <button
              type="button"
              onClick={() => setValues({ ...values, expiresAt: "" })}
              className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-hidden focus-visible:underline"
            >
              Clear
            </button>
          )}
        </div>
        <Input
          id="create-expires"
          type="datetime-local"
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          value={values.expiresAt}
          onChange={update("expiresAt")}
        />
        <p className="text-xs text-muted-foreground">
          Leave this empty to keep the link active.
        </p>
      </div>

      <DialogFooter className="border-t pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !values.originalUrl.trim()}>
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? "Creating…" : "Create link"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function CreateLinkModal({ open, onClose, initialUrl = "", onSubmit, isLoading }) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create link</DialogTitle>
          <DialogDescription>
            Paste a long URL. An alias and an expiry date are optional.
          </DialogDescription>
        </DialogHeader>
        <CreateLinkForm
          initialUrl={initialUrl}
          onSubmit={onSubmit}
          onClose={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
