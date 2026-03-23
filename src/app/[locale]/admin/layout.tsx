import type { Metadata } from "next";
import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { LayoutDashboard, Briefcase, FileText, Tags, HelpCircle, Newspaper, LogOut } from "lucide-react";
import { logoutAction } from "../login/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col shrink-0 min-h-screen">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-lg tracking-tight">Growonio Admin</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <Briefcase className="w-4 h-4" />
            Services
          </Link>
          <Link href="/admin/pricing" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <Tags className="w-4 h-4" />
            Pricing
          </Link>
          <Link href="/admin/work" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <FileText className="w-4 h-4" />
            Work Items
          </Link>
          <Link href="/admin/faqs" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors">
            <Newspaper className="w-4 h-4" />
            Articles
          </Link>
        </nav>

        <div className="p-4 border-t">
          <form action={logoutAction.bind(null, locale)}>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-full overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
