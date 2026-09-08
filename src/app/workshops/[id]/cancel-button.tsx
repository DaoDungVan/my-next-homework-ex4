"use client";

import { useTransition } from "react";
import { cancelRegistration } from "@/app/actions/workshop-actions";

export default function CancelButton({
  registrationId,
}: {
  registrationId: number;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await cancelRegistration(registrationId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
    >
      {isPending ? "..." : "Hủy đăng ký"}
    </button>
  );
}
