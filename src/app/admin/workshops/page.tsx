import { getWorkshops } from "@/lib/workshops";
import CreateWorkshopForm from "./create-form";
import WorkshopRow from "./workshop-row";

export default async function AdminWorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Workshop Admin</h1>
        <p className="text-sm text-slate-500 mt-1">
          Create, update, and delete workshops.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
        <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-amber-300 to-rose-400" />
        <div className="p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Tạo workshop</h2>
          <CreateWorkshopForm />
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold text-slate-900">
          Quản lý workshop
        </h2>
        <div className="space-y-3">
          {workshops.map((workshop) => (
            <WorkshopRow key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
}
