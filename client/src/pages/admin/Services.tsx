import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function ServicesAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listServices.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createService.useMutation({
    onSuccess: () => utils.portfolio.listServices.invalidate(),
  });
  const updateMut = trpc.portfolio.updateService.useMutation({
    onSuccess: () => utils.portfolio.listServices.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteService.useMutation({
    onSuccess: () => utils.portfolio.listServices.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Services"
        description="Six-tile services grid. Numbered 01–06."
        items={list.data}
        defaults={{ number: "", title: "", description: "" }}
        fields={[
          { key: "number", label: "Number", type: "text", placeholder: "01" },
          { key: "title", label: "Title", type: "text", placeholder: "UI/UX Design" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
        ]}
        renderRow={s => (
          <>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.number}</span>
              <h3 className="text-base font-medium">{s.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Order {s.sortOrder} · {s.published ? "Published" : "Draft"}
            </p>
          </>
        )}
        onCreate={async (d: any) => {
          await createMut.mutateAsync(d);
        }}
        onUpdate={async (id, d: any) => {
          await updateMut.mutateAsync({ id, ...d });
        }}
        onDelete={async id => {
          await deleteMut.mutateAsync({ id });
        }}
      />
    </AdminLayout>
  );
}
