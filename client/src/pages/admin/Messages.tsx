import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function MessagesAdmin() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listMessages.useQuery();
  const markReadMut = trpc.portfolio.markMessageRead.useMutation({
    onSuccess: () => utils.portfolio.listMessages.invalidate(),
  });
  const deleteMut = trpc.portfolio.deleteMessage.useMutation({
    onSuccess: () => {
      utils.portfolio.listMessages.invalidate();
      toast.success("Deleted");
    },
  });

  const items = list.data ?? [];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submissions from your public contact form.
          </p>
        </header>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              <Mail className="size-8 mx-auto mb-3 opacity-40" />
              <p>No messages yet. When someone contacts you, it shows up here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(m => (
              <Card key={m.id} className={m.read ? "opacity-70" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">{m.name}</h3>
                        {!m.read ? (
                          <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        ) : null}
                      </div>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        {m.email}
                      </a>
                      {m.subject ? (
                        <p className="text-sm font-medium mt-2">{m.subject}</p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!m.read ? (
                        <Button size="sm" variant="outline" onClick={() => markReadMut.mutate({ id: m.id })}>
                          <CheckCircle2 className="size-3.5" /> Mark read
                        </Button>
                      ) : null}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("Delete this message?")) deleteMut.mutate({ id: m.id });
                        }}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 whitespace-pre-wrap">{m.message}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
