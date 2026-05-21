import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function ToolsAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listTools.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createTool.useMutation({
    onSuccess: () => utils.portfolio.listTools.invalidate(),
  });
  const updateMut = trpc.portfolio.updateTool.useMutation({
    onSuccess: () => utils.portfolio.listTools.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteTool.useMutation({
    onSuccess: () => utils.portfolio.listTools.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Tools"
        description="Tools strip on the public site. Slug uses simpleicons.org (e.g. figma, framer, adobexd)."
        items={list.data}
        defaults={{ name: "", slug: "" }}
        fields={[
          { key: "name", label: "Display name", type: "text", placeholder: "Figma" },
          {
            key: "slug",
            label: "Simple Icons slug",
            type: "text",
            placeholder: "figma, framer, adobexd, adobephotoshop, adobeillustrator",
          },
        ]}
        renderRow={t => (
          <div className="flex items-center gap-3">
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/ffffff`}
              alt=""
              className="size-7 opacity-80"
              onError={e => ((e.target as HTMLImageElement).style.opacity = "0.2")}
            />
            <div>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">
                slug: {t.slug} · order {t.sortOrder} · {t.published ? "Published" : "Draft"}
              </div>
            </div>
          </div>
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
