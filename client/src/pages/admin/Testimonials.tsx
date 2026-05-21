import AdminLayout from "@/components/AdminLayout";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { trpc } from "@/lib/trpc";

export default function TestimonialsAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listTestimonials.useQuery({ includeDrafts: true });
  const createMut = trpc.portfolio.createTestimonial.useMutation({
    onSuccess: () => utils.portfolio.listTestimonials.invalidate(),
  });
  const updateMut = trpc.portfolio.updateTestimonial.useMutation({
    onSuccess: () => utils.portfolio.listTestimonials.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteTestimonial.useMutation({
    onSuccess: () => utils.portfolio.listTestimonials.invalidate(),
  });

  return (
    <AdminLayout>
      <SimpleListEditor
        title="Testimonials"
        description="Three columns rendered on the public site."
        items={list.data}
        defaults={{ name: "", role: "", quote: "", rating: 5 }}
        fields={[
          { key: "name", label: "Name", type: "text", placeholder: "Ayesha Karim" },
          { key: "role", label: "Role", type: "text", placeholder: "Founder, Northline Studio" },
          { key: "quote", label: "Quote", type: "textarea", rows: 4 },
          { key: "rating", label: "Rating (1-5)", type: "number", placeholder: "5" },
        ]}
        renderRow={t => (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-medium">{t.name}</h3>
              <span className="text-xs text-muted-foreground">{"★".repeat(t.rating)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 italic">"{t.quote}"</p>
            <p className="text-xs text-muted-foreground mt-2">
              Order {t.sortOrder} · {t.published ? "Published" : "Draft"}
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
