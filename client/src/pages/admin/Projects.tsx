import AdminLayout from "@/components/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import type { Project } from "@shared/types";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SPAN_OPTIONS = [
  { value: "md:col-span-1 md:row-span-1", label: "1 × 1 (small box)" },
  { value: "md:col-span-2 md:row-span-1", label: "2 × 1 (wide box)" },
  { value: "md:col-span-1 md:row-span-2", label: "1 × 2 (tall box)" },
  { value: "md:col-span-2 md:row-span-2", label: "2 × 2 (large square)" },
  { value: "md:col-span-1 md:row-span-3", label: "1 × 3 (skyscraper)" },
  { value: "md:col-span-2 md:row-span-3", label: "2 × 3 (vertical giant)" },
  { value: "md:col-span-3 md:row-span-1", label: "3 × 1 (full width banner)" },
  { value: "md:col-span-3 md:row-span-2", label: "3 × 2 (hero size)" },
  { value: "md:col-span-3 md:row-span-3", label: "3 × 3 (massive)" },
];

type FormState = {
  id?: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
  href: string;
  tagsInput: string;
  spanClass: string;
  sortOrder: number;
  published: boolean;
};

const empty: FormState = {
  title: "",
  category: "",
  description: "",
  imageUrl: null,
  href: "",
  tagsInput: "",
  spanClass: SPAN_OPTIONS[0].value,
  sortOrder: 0,
  published: true,
};

export default function ProjectsAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listProjects.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createProject.useMutation({
    onSuccess: () => {
      utils.portfolio.listProjects.invalidate();
      toast.success("Project added");
    },
  });
  const updateMut = trpc.portfolio.updateProject.useMutation({
    onSuccess: () => {
      utils.portfolio.listProjects.invalidate();
      toast.success("Saved");
    },
  });
  const deleteMut = trpc.portfolio.deleteProject.useMutation({
    onSuccess: () => {
      utils.portfolio.listProjects.invalidate();
      toast.success("Deleted");
    },
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);

  function openNew() {
    setForm(empty);
    setOpen(true);
  }
  function openEdit(p: Project) {
    setForm({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      imageUrl: p.imageUrl ?? null,
      href: p.href ?? "",
      tagsInput: ((p.tagsJson as string[] | null) ?? []).join(", "),
      spanClass: p.spanClass,
      sortOrder: p.sortOrder,
      published: p.published,
    });
    setOpen(true);
  }

  async function save() {
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      imageUrl: form.imageUrl,
      href: form.href || null,
      tagsJson: form.tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      spanClass: form.spanClass,
      sortOrder: form.sortOrder,
      published: form.published,
    };
    try {
      if (form.id) {
        await updateMut.mutateAsync({ id: form.id, ...payload });
      } else {
        await createMut.mutateAsync(payload);
      }
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed");
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <header className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Selected work bento grid. Drag-free ordering via "sort order" (lower = earlier).
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="size-4" /> Add project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{form.id ? "Edit project" : "New project"}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label className="mb-2 block">Cover image</Label>
                  <ImageUploader
                    folder="projects"
                    value={form.imageUrl}
                    onChange={v => setForm(f => ({ ...f, imageUrl: v }))}
                  />
                </div>
                <Lab label="Title">
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </Lab>
                <Lab label="Category">
                  <Input
                    placeholder="Mobile · Food Delivery"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  />
                </Lab>
                <Lab label="Description" className="md:col-span-2">
                  <Textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  />
                </Lab>
                <Lab label="External URL (Behance, etc.)" className="md:col-span-2">
                  <Input value={form.href} onChange={e => setForm(f => ({ ...f, href: e.target.value }))} />
                </Lab>
                <Lab label="Tags (comma separated)" className="md:col-span-2">
                  <Input
                    placeholder="iOS, Mobile App, UI/UX"
                    value={form.tagsInput}
                    onChange={e => setForm(f => ({ ...f, tagsInput: e.target.value }))}
                  />
                </Lab>
                <Lab label="Grid span">
                  <select
                    className="h-9 px-3 rounded-md border border-border bg-background text-sm"
                    value={form.spanClass}
                    onChange={e => setForm(f => ({ ...f, spanClass: e.target.value }))}
                  >
                    {SPAN_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Lab>
                <Lab label="Sort order">
                  <Input
                    type="number"
                    value={form.sortOrder}
                    onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) || 0 }))}
                  />
                </Lab>
                <div className="flex items-center gap-3 md:col-span-2">
                  <Switch
                    checked={form.published}
                    onCheckedChange={v => setForm(f => ({ ...f, published: v }))}
                  />
                  <Label>Published</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={save} disabled={createMut.isPending || updateMut.isPending}>
                  {createMut.isPending || updateMut.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {form.id ? "Save changes" : "Add project"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(list.data ?? []).map(p => (
            <Card key={p.id} className={!p.published ? "opacity-60" : ""}>
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt="" className="size-20 rounded-md object-cover bg-muted" />
                ) : (
                  <div className="size-20 rounded-md bg-muted" />
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base">{p.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{p.category}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order {p.sortOrder} · {p.published ? "Published" : "Draft"}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm(`Delete "${p.title}"?`)) deleteMut.mutate({ id: p.id });
                    }}
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {list.data && list.data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects yet. Add your first one.</p>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
}

function Lab({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
