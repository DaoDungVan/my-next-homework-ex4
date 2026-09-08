"use client";

import { useRef, useState, useTransition } from "react";
import { deleteWorkshop, updateWorkshop } from "@/app/actions/workshop-actions";

type Workshop = {
  id: number;
  title: string;
  description: string;
  date: Date;
  capacity: number;
  _count: { registrations: number };
};

export default function WorkshopRow({ workshop }: { workshop: Workshop }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(workshop.title);
  const [description, setDescription] = useState(workshop.description);
  const [date, setDate] = useState(workshop.date.toISOString().slice(0, 10));
  const [capacity, setCapacity] = useState(String(workshop.capacity));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openEdit() {
    setTitle(workshop.title);
    setDescription(workshop.description);
    setDate(workshop.date.toISOString().slice(0, 10));
    setCapacity(String(workshop.capacity));
    setError(null);
    dialogRef.current?.showModal();
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await updateWorkshop(
          workshop.id,
          title,
          description,
          new Date(date),
          Number(capacity),
        );
        dialogRef.current?.close();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra.");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Xóa workshop "${workshop.title}"?`)) return;
    startTransition(async () => {
      await deleteWorkshop(workshop.id);
    });
  }

  const filledPercent = Math.min(
    (workshop._count.registrations / workshop.capacity) * 100,
    100,
  );

  return (
    <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
      <div className="h-1 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-amber-300 to-rose-400"
          style={{ width: `${Math.max(filledPercent, 4)}%` }}
        />
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {workshop.title.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-semibold text-slate-900">{workshop.title}</p>
            <p className="text-xs text-slate-400">
              {workshop.date.toLocaleDateString("vi-VN")} ·{" "}
              {workshop._count.registrations}/{workshop.capacity} registered
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openEdit}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200"
          >
            Edit workshop
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto w-full max-w-md rounded-xl p-0 backdrop:bg-slate-900/50"
      >
        <form onSubmit={handleSave} className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Edit workshop</h3>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Capacity
              </label>
              <input
                type="number"
                required
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex-1 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {isPending ? "Đang lưu..." : "Save Changes"}
            </button>
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </form>
      </dialog>
    </div>
  );
}
