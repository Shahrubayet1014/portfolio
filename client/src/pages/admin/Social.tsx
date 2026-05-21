import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function SocialAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listSocialLinks.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createSocialLink.useMutation({
    onSuccess: () => utils.portfolio.listSocialLinks.invalidate(),
  });
  const updateMut = trpc.portfolio.updateSocialLink.useMutation({
    onSuccess: () => utils.portfolio.listSocialLinks.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteSocialLink.useMutation({
    onSuccess: () => utils.portfolio.listSocialLinks.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Social links"
        description="Footer social row on the public site."
        items={list.data}
        defaults={{ name: "", url: "" }}
        fields={[
          { key: "name", label: "Name", type: "text", placeholder: "LinkedIn" },
          { key: "url", label: "URL", type: "text", placeholder: "https://www.linkedin.com/in/…" },
        ]}
        renderRow={s => (
          <>
            <h3 className="text-base font-medium">{s.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 break-all">{s.url}</p>
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
