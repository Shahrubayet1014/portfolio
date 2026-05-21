import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function ProcessAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listProcessSteps.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createProcessStep.useMutation({
    onSuccess: () => utils.portfolio.listProcessSteps.invalidate(),
  });
  const updateMut = trpc.portfolio.updateProcessStep.useMutation({
    onSuccess: () => utils.portfolio.listProcessSteps.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteProcessStep.useMutation({
    onSuccess: () => utils.portfolio.listProcessSteps.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Process steps"
        description="Numbered list rendered on the public site."
        items={list.data}
        defaults={{ number: "", title: "", description: "" }}
        fields={[
          { key: "number", label: "Number", type: "text", placeholder: "01" },
          { key: "title", label: "Title", type: "text", placeholder: "Discover" },
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
