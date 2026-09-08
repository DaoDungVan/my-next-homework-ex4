import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkshop } from "@/lib/workshops";
import RegisterForm from "./register-form";
import CancelButton from "./cancel-button";

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = await getWorkshop(Number(id));

  if (!workshop) {
    notFound();
  }

  const registered = workshop.registrations.length;
  const available = workshop.capacity - registered;
  const isFull = available <= 0;
  const filledPercent = Math.min((registered / workshop.capacity) * 100, 100);

  return (
    <div className="space-y-8">
      <Link
        href="/workshops"
        className="text-sm text-slate-500 hover:text-slate-900"
      >
        ← Quay lại danh sách
      </Link>

      <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
        <div className="h-1.5 w-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-amber-300 to-rose-400"
            style={{ width: `${Math.max(filledPercent, 4)}%` }}
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
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
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {workshop.title}
          </h1>
          <p className="mt-3 text-slate-600">{workshop.description}</p>

          <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-4">
            <div>
              <p className="text-xs text-slate-400">Sức chứa</p>
              <p className="text-xl font-bold text-slate-900">
                {workshop.capacity}
              </p>
            </div>
            <div className="pl-4">
              <p className="text-xs text-slate-400">Đã đăng ký</p>
              <p className="text-xl font-bold text-slate-900">{registered}</p>
            </div>
            <div className="pl-4">
              <p className="text-xs text-slate-400">Còn trống</p>
              <p className="text-xl font-bold text-slate-900">
                {Math.max(available, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Đăng ký workshop</h2>
        <div className="mt-4">
          <RegisterForm workshopId={workshop.id} />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold text-slate-900">
          Danh sách đăng ký
        </h2>
        <div className="space-y-2">
          {workshop.registrations.length === 0 && (
            <p className="text-sm text-slate-400">Chưa có ai đăng ký.</p>
          )}
          {workshop.registrations.map((registration) => (
            <div
              key={registration.id}
              className="flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-slate-200"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {registration.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-medium text-slate-900">
                    {registration.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {registration.createdAt.toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              <CancelButton registrationId={registration.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
