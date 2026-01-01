import Cta from "@/components/common/Cta";
import Link from "next/link";


export default function NotFound() {
  return (
    <main className="flex sm:min-h-[calc(100vh-70px)] min-h-[calc(100vh-60px)] flex-col items-center justify-center bg-slate-950 px-4">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_55%)]" />

      <div className="relative flex flex-col items-center text-center max-w-full">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400/80">
          Error 404
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-slate-400 sm:mt-4">
          The page you are looking for either does not exist or has been moved.
          Check the URL, or go back to the home.
        </p>

        {/* Actions */}
        <div className="mt-6 flex w-full justify-center items-center">
          
                    <Cta href="/" className="max-w-50 capitalize">go to Homepage</Cta>
           
        </div>

        {/* Extra info */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left text-xs text-slate-400 min-w-[320px] max-w-full">
          <div className="mb-2 flex items-center justify-between w-full">
            <span className="font-mono text-[11px] text-emerald-300">
              GET /not-found
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
              404 NOT FOUND
            </span>
          </div>
          <pre className="break-words font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
            {`{
  "message": "The requested resource could not be found.",
  "statusCode": 404,
  "hint": "Use the navigation above to find what you need."
}`}
          </pre>
        </div>
      </div>
    </main>
  );
}
