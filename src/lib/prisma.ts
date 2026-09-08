import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

// Biến global để lưu lại PrismaClient đã tạo, dùng lại giữa các lần
// Next.js Fast Refresh reload code khi dev, tránh mở connection mới mỗi lần save file.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Adapter chỉ định PrismaClient dùng thư viện `pg` để kết nối tới Postgres qua DATABASE_URL.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Nếu đã có instance lưu trong globalForPrisma thì dùng lại, chưa có thì mới tạo mới.
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// Chỉ lưu lại vào global khi đang dev, vì production chỉ chạy 1 lần
// nên không cần cơ chế tái sử dụng này.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
