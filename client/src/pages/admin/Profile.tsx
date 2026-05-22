import AdminLayout from "@/components/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RichField } from "@/components/admin/RichField";

type HeroFeature = [string, string];
type AboutStat = { value: string; label: string };

export default function ProfileAdmin() {
  const utils = trpc.useUtils();
  const settingsQ = trpc.portfolio.getSiteSettings.useQuery();
  const updateMut = trpc.portfolio.updateSiteSettings.useMutation({
    onSuccess: () => {
      utils.portfolio.getSiteSettings.invalidate();
      toast.success("Saved");
    },
    onError: e => toast.error(e.message || "Failed to save"),
  });

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (settingsQ.data && !form) {
      setForm({
        ...settingsQ.data,
        heroFeatures: (settingsQ.data.heroFeatures as HeroFeature[] | null) ?? [],
        aboutStats: (settingsQ.data.aboutStats as AboutStat[] | null) ?? [],
      });
    }
  }, [settingsQ.data, form]);

  if (!form) {
    return (
      <AdminLayout>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Loading…
        </div>
      </AdminLayout>
    );
  }

  function set<K extends string>(key: K, v: any) {
    setForm((f: any) => ({ ...f, [key]: v }));
  }

  function setFeature(i: number, idx: 0 | 1, v: string) {
    const next = [...(form.heroFeatures as HeroFeature[])];
    const cur = next[i] ?? ["", ""];
    next[i] = idx === 0 ? [v, cur[1]] : [cur[0], v];
    set("heroFeatures", next);
  }
  function addFeature() {
    set("heroFeatures", [...(form.heroFeatures ?? []), ["", ""]]);
  }
  function removeFeature(i: number) {
    set(
      "heroFeatures",
      (form.heroFeatures as HeroFeature[]).filter((_: any, idx: number) => idx !== i),
    );
  }

  function setStat(i: number, key: "value" | "label", v: string) {
    const next = [...(form.aboutStats as AboutStat[])];
    next[i] = { ...next[i], [key]: v };
    set("aboutStats", next);
  }
  function addStat() {
    set("aboutStats", [...(form.aboutStats ?? []), { value: "", label: "" }]);
  }
  function removeStat(i: number) {
    set(
      "aboutStats",
      (form.aboutStats as AboutStat[]).filter((_: any, idx: number) => idx !== i),
    );
  }

  function handleSave() {
    const payload = {
      brandName: form.brandName ?? "",
      ownerName: form.ownerName ?? "",
      location: form.location ?? "",
      heroEyebrow: form.heroEyebrow ?? "",
      heroHeadline: form.heroHeadline ?? "",
      heroDescription: form.heroDescription ?? "",
      heroPortraitUrl: form.heroPortraitUrl ?? null,
      heroAvailabilityLabel: form.heroAvailabilityLabel ?? "",
      heroAvailabilityValue: form.heroAvailabilityValue ?? "",
      heroLocationLabel: form.heroLocationLabel ?? "",
      heroLocationValue: form.heroLocationValue ?? "",
      cvUrl: form.cvUrl ?? null,
      heroFeatures: (form.heroFeatures as HeroFeature[]).filter(([t, d]) => t || d),
      aboutEyebrow: form.aboutEyebrow ?? "",
      aboutHeadline: form.aboutHeadline ?? "",
      aboutBody: form.aboutBody ?? "",
      aboutStats: (form.aboutStats as AboutStat[]).filter(s => s.value || s.label),
      servicesHeadline: form.servicesHeadline ?? null,
      servicesIntro: form.servicesIntro ?? null,
      workHeadline: form.workHeadline ?? null,
      processHeadline: form.processHeadline ?? null,
      processIntro: form.processIntro ?? null,
      testimonialsHeadline: form.testimonialsHeadline ?? null,
      skillsHeadline: form.skillsHeadline ?? null,
      toolsHeadline: form.toolsHeadline ?? null,
      toolsIntro: form.toolsIntro ?? null,
      certificationsHeadline: form.certificationsHeadline ?? null,
      contactHeadline: form.contactHeadline ?? null,
      contactBody: form.contactBody ?? null,
      contactEmail: form.contactEmail ?? "",
      contactPhone: form.contactPhone ?? null,
      contactLinkedinLabel: form.contactLinkedinLabel ?? null,
      contactLinkedinUrl: form.contactLinkedinUrl ?? null,
      footerCopyright: form.footerCopyright ?? "",
    };
    updateMut.mutate(payload);
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <header className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile & Hero</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Branding, hero copy, about story, contact info and footer.
              <br />
              <span className="text-xs text-accent mt-1 inline-block opacity-80">
                💡 Pro tip: Use <code>[accent]text[/accent]</code> or <code>[color=#ff0000]text[/color]</code> anywhere to colorize specific words!
              </span>
            </p>
          </div>
          <Button onClick={handleSave} disabled={updateMut.isPending}>
            {updateMut.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save changes
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RichField label="Brand name" value={form.brandName} onChange={v => set("brandName", v)} />
            <RichField label="Owner name" value={form.ownerName} onChange={v => set("ownerName", v)} />
            <RichField label="Location" value={form.location} onChange={v => set("location", v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero section</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <RichField label="Eyebrow" value={form.heroEyebrow} onChange={v => set("heroEyebrow", v)} />
            <FieldArea
              label="Headline"
              v={form.heroHeadline}
              on={v => set("heroHeadline", v)}
              rows={2}
            />
            <FieldArea label="Description" v={form.heroDescription} on={v => set("heroDescription", v)} rows={3} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Portrait image</Label>
                <ImageUploader
                  folder="portrait"
                  value={form.heroPortraitUrl}
                  onChange={v => set("heroPortraitUrl", v)}
                />
              </div>
              <div>
                <Field label="CV / Resume Link (Google Drive, Dropbox, etc.)" v={form.cvUrl ?? ""} on={v => set("cvUrl", v)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Availability label" v={form.heroAvailabilityLabel} on={v => set("heroAvailabilityLabel", v)} />
              <Field label="Availability value" v={form.heroAvailabilityValue} on={v => set("heroAvailabilityValue", v)} />
              <Field label="Location label" v={form.heroLocationLabel} on={v => set("heroLocationLabel", v)} />
              <Field label="Location value" v={form.heroLocationValue} on={v => set("heroLocationValue", v)} />
            </div>

            <div>
              <Label className="mb-2 block">Hero feature pills (4 recommended)</Label>
              <div className="flex flex-col gap-3">
                {(form.heroFeatures as HeroFeature[]).map(([title, desc], i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 items-start">
                    <Input
                      placeholder="Title"
                      value={title}
                      onChange={e => setFeature(i, 0, e.target.value)}
                    />
                    <Textarea
                      placeholder="Description"
                      rows={2}
                      value={desc}
                      onChange={e => setFeature(i, 1, e.target.value)}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(i)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="size-4" /> Add feature
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About section</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <RichField label="Eyebrow" value={form.aboutEyebrow} onChange={v => set("aboutEyebrow", v)} />
            <FieldArea label="Headline" v={form.aboutHeadline} on={v => set("aboutHeadline", v)} rows={2} />
            <FieldArea
              label="Body (paragraphs separated by blank line)"
              v={form.aboutBody}
              on={v => set("aboutBody", v)}
              rows={6}
            />
            <div>
              <Label className="mb-2 block">Stats (3 recommended)</Label>
              <div className="flex flex-col gap-2">
                {(form.aboutStats as AboutStat[]).map((stat, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-2 items-start">
                    <Input
                      placeholder="20+"
                      value={stat.value}
                      onChange={e => setStat(i, "value", e.target.value)}
                    />
                    <Input
                      placeholder="Projects shipped"
                      value={stat.label}
                      onChange={e => setStat(i, "label", e.target.value)}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStat(i)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addStat}>
                  <Plus className="size-4" /> Add stat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Section headlines (optional overrides)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldArea label="Services headline" v={form.servicesHeadline} on={v => set("servicesHeadline", v)} rows={2} />
            <FieldArea label="Services intro" v={form.servicesIntro} on={v => set("servicesIntro", v)} rows={2} />
            <FieldArea label="Work headline" v={form.workHeadline} on={v => set("workHeadline", v)} rows={2} />
            <FieldArea label="Process headline" v={form.processHeadline} on={v => set("processHeadline", v)} rows={2} />
            <FieldArea label="Process intro" v={form.processIntro} on={v => set("processIntro", v)} rows={2} />
            <FieldArea label="Testimonials headline" v={form.testimonialsHeadline} on={v => set("testimonialsHeadline", v)} rows={2} />
            <FieldArea label="Skills headline" v={form.skillsHeadline} on={v => set("skillsHeadline", v)} rows={2} />
            <FieldArea label="Tools headline" v={form.toolsHeadline} on={v => set("toolsHeadline", v)} rows={2} />
            <FieldArea label="Tools intro" v={form.toolsIntro} on={v => set("toolsIntro", v)} rows={2} />
            <FieldArea label="Certifications headline" v={form.certificationsHeadline} on={v => set("certificationsHeadline", v)} rows={2} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact section</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldArea label="Headline" v={form.contactHeadline} on={v => set("contactHeadline", v)} rows={3} />
            <FieldArea label="Body" v={form.contactBody} on={v => set("contactBody", v)} rows={3} />
            <Field label="Email" v={form.contactEmail} on={v => set("contactEmail", v)} />
            <Field label="Phone" v={form.contactPhone ?? ""} on={v => set("contactPhone", v)} />
            <Field label="LinkedIn label" v={form.contactLinkedinLabel ?? ""} on={v => set("contactLinkedinLabel", v)} />
            <Field label="LinkedIn URL" v={form.contactLinkedinUrl ?? ""} on={v => set("contactLinkedinUrl", v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichField label="Footer copyright" value={form.footerCopyright} onChange={v => set("footerCopyright", v)} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateMut.isPending}>
            {updateMut.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input value={v ?? ""} onChange={e => on(e.target.value)} />
    </div>
  );
}

function FieldArea({
  label,
  v,
  on,
  rows = 3,
}: {
  label: string;
  v: string | null;
  on: (v: string) => void;
  rows?: number;
}) {
  return <RichField label={label} value={v} onChange={on} rows={rows} multiline />;
}
