"use client";

import { useState, useTransition } from "react";
import { registerWorkshop } from "@/app/actions/workshop-actions";

export default function RegisterForm({ workshopId }: { workshopId: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      try {
        await registerWorkshop(name, email, workshopId);
        setMessage({ type: "success", text: "Đăng ký workshop thành công." });
        setName("");
        setEmail("");
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Đã có lỗi xảy ra.",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700">Họ tên</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn An"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="an@example.com"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {isPending ? "Đang đăng ký..." : "Đăng ký"}
      </button>
      {message && (
        <p
          className={`text-sm ${
            message.type === "success" ? "text-teal-600" : "text-rose-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
