import Link from "next/link";
import { getWorkshops } from "@/lib/workshops";

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Upcoming Workshops
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track workshops and manage registrations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {workshops.map((workshop) => {
          const registered = workshop._count.registrations;
          const available = workshop.capacity - registered;
          const isFull = available <= 0;
          const filledPercent = Math.min(
            (registered / workshop.capacity) * 100,
            100,
          );

          return (
            <Link
              key={workshop.id}
              href={`/workshops/${workshop.id}`}
              className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 transition-colors hover:ring-slate-300"
            >
              <div className="h-1.5 w-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-amber-300 to-rose-400"
                  style={{ width: `${Math.max(filledPercent, 4)}%` }}
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-400">
                    {workshop.date.toLocaleDateString("vi-VN")}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isFull
                        ? "bg-rose-50 text-rose-600"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {isFull ? "Full" : "Available"}
                  </span>
                </div>

                <h2 className="mt-2 font-semibold text-slate-900">
                  {workshop.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {workshop.description}
                </p>

                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-3">
                  <div>
                    <p className="text-xs text-slate-400">Capacity</p>
                    <p className="font-bold text-slate-900">
                      {workshop.capacity}
                    </p>
                  </div>
                  <div className="pl-3">
                    <p className="text-xs text-slate-400">Registered</p>
                    <p className="font-bold text-slate-900">{registered}</p>
                  </div>
                  <div className="pl-3">
                    <p className="text-xs text-slate-400">Available</p>
                    <p className="font-bold text-slate-900">
                      {Math.max(available, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
