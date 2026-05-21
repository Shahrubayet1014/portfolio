import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Inbox, Link2, Sparkles, SquareKanban, Star, User, Wrench } from "lucide-react";
import { Link } from "wouter";

const tiles = [
  { icon: User, label: "Profile & Hero", path: "/admin/profile", note: "Brand, headline, portrait, CV." },
  { icon: SquareKanban, label: "Projects", path: "/admin/projects", note: "Selected work bento grid." },
  { icon: Sparkles, label: "Services", path: "/admin/services", note: "Six-tile services grid." },
  { icon: Wrench, label: "Skills & Tools", path: "/admin/skills", note: "Skill bars and tools strip." },
  { icon: Star, label: "Testimonials", path: "/admin/testimonials", note: "Words clients have said." },
  { icon: Link2, label: "Social Links", path: "/admin/social", note: "Footer / contact social row." },
];

export default function AdminOverview() {
  const projects = trpc.portfolio.listProjects.useQuery({ includeDrafts: true });
  const services = trpc.portfolio.listServices.useQuery({ includeDrafts: true });
  const skills = trpc.portfolio.listSkills.useQuery({ includeDrafts: true });
  const testimonials = trpc.portfolio.listTestimonials.useQuery({ includeDrafts: true });
  const messages = trpc.portfolio.listMessages.useQuery();

  const stats = [
    { label: "Projects", value: projects.data?.length ?? 0 },
    { label: "Services", value: services.data?.length ?? 0 },
    { label: "Skills", value: skills.data?.length ?? 0 },
    { label: "Testimonials", value: testimonials.data?.length ?? 0 },
    { label: "Messages", value: messages.data?.length ?? 0, hint: messages.data?.filter(m => !m.read).length ?? 0 },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage every section of your portfolio from one place.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="size-4" /> View live site
          </Link>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map(s => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {s.label}
                  {typeof s.hint === "number" && s.hint > 0 ? (
                    <span className="ml-2 text-primary normal-case">{s.hint} unread</span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section>
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Quick edit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiles.map(t => (
              <Link key={t.path} href={t.path}>
                <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                    <div className="size-9 rounded-md bg-accent/40 grid place-items-center">
                      <t.icon className="size-4" />
                    </div>
                    <CardTitle className="text-base font-medium">{t.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t.note}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Link href="/admin/messages">
              <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                  <div className="size-9 rounded-md bg-accent/40 grid place-items-center">
                    <Inbox className="size-4" />
                  </div>
                  <CardTitle className="text-base font-medium">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Inbound contact form submissions.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
