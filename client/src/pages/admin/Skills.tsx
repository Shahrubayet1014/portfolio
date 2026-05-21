import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function SkillsAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listSkills.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createSkill.useMutation({
    onSuccess: () => utils.portfolio.listSkills.invalidate(),
  });
  const updateMut = trpc.portfolio.updateSkill.useMutation({
    onSuccess: () => utils.portfolio.listSkills.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteSkill.useMutation({
    onSuccess: () => utils.portfolio.listSkills.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Skills"
        description="Skill bars (0–100) shown in the public Skills section."
        items={list.data}
        defaults={{ name: "", value: 80 }}
        fields={[
          { key: "name", label: "Skill name", type: "text", placeholder: "UI Design" },
          { key: "value", label: "Value (0-100)", type: "number", placeholder: "92" },
        ]}
        renderRow={s => (
          <>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-medium">{s.name}</h3>
              <span className="text-xs text-muted-foreground">{s.value}%</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${s.value}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
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
