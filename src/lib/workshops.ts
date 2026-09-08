import { cacheLife, cacheTag } from "next/cache";
import prisma from "./prisma";

export async function getWorkshops() {
  "use cache";
  cacheTag("workshops");
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  console.log("QUERY WORKSHOPS", new Date().toISOString());
  return prisma.workshop.findMany({
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });
}

export async function getWorkshop(id: number) {
  "use cache";
  cacheTag(`workshop-${id}`);
  // dòng log nếu lỗi không bắt cache sẽ báo
  console.log("QUERY WORKSHOP", id, new Date().toISOString());
  return prisma.workshop.findUnique({
    where: { id },
    include: { registrations: true },
  });
}

export async function getPopularWorkshops() {
  "use cache";
  cacheTag("popular-workshops");
  return prisma.workshop.findMany({
    take: 5,
    orderBy: {
      registrations: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });
}
