import Link from "next/link";
import { getPopularWorkshops } from "@/lib/workshops";

export default async function PopularWorkshopsPage() {
  const workshops = await getPopularWorkshops();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Popular Workshops
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Top 5 workshops by number of registrations.
        </p>
      </div>

      <div className="space-y-3">
        {workshops.map((workshop, i) => {
          const registered = workshop._count.registrations;
          const available = workshop.capacity - registered;

          return (
            <Link
              key={workshop.id}
              href={`/workshops/${workshop.id}`}
              className="flex items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-slate-200 transition-colors hover:ring-slate-300"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-400">
                  {workshop.date.toLocaleDateString("vi-VN")}
                </p>
                <h2 className="font-semibold text-slate-900 truncate">
                  {workshop.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {registered} registrations · {Math.max(available, 0)} chỗ
                  còn lại
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
