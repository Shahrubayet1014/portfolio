import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  /** When true, render as plain file input row (no preview) */
  compact?: boolean;
  accept?: string;
  label?: string;
};

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  compact = false,
  accept = "image/*",
  label = "Upload image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const upload = trpc.portfolio.uploadFile.useMutation();

  async function handleFile(file: File) {
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Max file size is 8MB");
      return;
    }
    setBusy(true);
    try {
      const data = await readFileAsBase64(file);
      const out = await upload.mutateAsync({
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        data,
        folder,
      });
      onChange(out.url);
      toast.success("Uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            disabled={busy}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="max-w-xs"
          />
          {value ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
              <X className="size-3.5" /> Clear
            </Button>
          ) : null}
        </div>
        {value ? <p className="text-xs text-muted-foreground truncate">{value}</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-4">
        <div className="size-28 rounded-lg border border-dashed border-border bg-muted/30 grid place-items-center overflow-hidden shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="size-full object-cover" />
          ) : (
            <Upload className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            disabled={busy}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex items-center gap-2">
            {busy ? (
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Loader2 className="size-3 animate-spin" /> Uploading…
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">{label} · max 8MB</span>
            )}
            {value ? (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
                <X className="size-3.5" /> Remove
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
