import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";

export default function AdminDashboard() {
  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 p-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome to the Growonio content management portal.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }

  const modules = [
    { title: "Services", desc: "Manage overarching capabilities offered.", href: "/admin/services" },
    { title: "Pricing", desc: "Manage billing packages and tiers.", href: "/admin/pricing" },
    { title: "Work Items", desc: "Manage portfolio entries and case studies.", href: "/admin/work" },
    { title: "FAQs", desc: "Manage common questions.", href: "/admin/faqs" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to the Growonio content management portal.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {modules.map(mod => (
          <Link key={mod.href} href={mod.href} className="block group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  {mod.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </CardTitle>
                <CardDescription>{mod.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
