"use server";

import prisma from "@/lib/prisma";
import { updateTag } from "next/cache";

export async function registerWorkshop(
  name: string,
  email: string,
  workshopId: number,
) {
  // 1. Kiểm tra workshop có tồn tại không
  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
    include: { _count: { select: { registrations: true } } },
  });

  if (!workshop) {
    throw new Error("Workshop not found.");
  }

  // 2. Kiểm tra đã đủ chỗ chưa (query trực tiếp, không qua cache — như vừa bàn)
  if (workshop._count.registrations >= workshop.capacity) {
    throw new Error("This workshop is full.");
  }

  // 3. Kiểm tra email đã đăng ký workshop này chưa
  const registered = await prisma.registration.findUnique({
    where: {
      email_workshopId: {
        email: email,
        workshopId: workshopId,
      },
    },
  });

  if (registered) {
    throw new Error("You already registered for this workshop.");
  }

  // 4. Tạo Registration mới
  await prisma.registration.create({
    data: { name, email, workshopId },
  });

  // 5. Invalidate cache — báo cho các cache liên quan biết dữ liệu đã đổi
  updateTag("workshops");
  updateTag(`workshop-${workshopId}`);
  updateTag("popular-workshops");
}

export async function cancelRegistration(registrationId: number) {
  const deleted = await prisma.registration.delete({
    where: { id: registrationId },
  });

  updateTag("workshops");
  updateTag(`workshop-${deleted.workshopId}`);
  updateTag("popular-workshops");
}

export async function createWorkshop(
  title: string,
  description: string,
  date: Date,
  capacity: number,
) {
  await prisma.workshop.create({
    data: {
      title: title,
      description: description,
      date: date,
      capacity: capacity,
    },
  });
  updateTag("workshops");
  updateTag("popular-workshops");
}

export async function updateWorkshop(
  workshopId: number,
  title: string,
  description: string,
  date: Date,
  capacity: number,
) {
  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
  });
  if (!workshop) {
    throw new Error("Workshop not found.");
  }
  await prisma.workshop.update({
    where: { id: workshopId },
    data: {
      title: title,
      description: description,
      date: date,
      capacity: capacity,
    },
  });

  updateTag("workshops");
  updateTag(`workshop-${workshopId}`);
  updateTag("popular-workshops");
}

export async function deleteWorkshop(workshopId: number) {
  await prisma.workshop.delete({
    where: { id: workshopId },
  });
  updateTag("workshops");
  updateTag(`workshop-${workshopId}`);
  updateTag("popular-workshops");
}
