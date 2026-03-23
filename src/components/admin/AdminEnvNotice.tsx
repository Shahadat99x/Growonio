import { missingSupabaseAdminConfigMessage } from "@/lib/supabase/server";

type AdminEnvNoticeProps = {
  title?: string;
};

export function AdminEnvNotice({
  title = "Supabase is not configured for the admin.",
}: AdminEnvNoticeProps) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-7">{missingSupabaseAdminConfigMessage}</p>
      <p className="mt-3 text-sm leading-7">
        Required keys: <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>.
      </p>
    </div>
  );
}
