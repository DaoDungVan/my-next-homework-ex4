import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.registration.deleteMany();
  await prisma.workshop.deleteMany();

  await prisma.workshop.create({
    data: {
      title: "Workshop Thiết Kế UI/UX Cho Người Mới",
      description:
        "Tìm hiểu các nguyên tắc cơ bản của UI/UX, cách sử dụng Figma và thực hành thiết kế giao diện cho một ứng dụng thực tế. Phù hợp cho sinh viên và người mới bắt đầu.",
      date: new Date("2026-09-15T12:00:00.000Z"),
      capacity: 30,
      registrations: {
        create: [
          { name: "Nguyễn Minh Anh", email: "minhanh@example.com" },
          { name: "Trần Hoàng Nam", email: "hoangnam@example.com" },
          { name: "Lê Thu Hà", email: "thuha@example.com" },
        ],
      },
    },
  });

  await prisma.workshop.create({
    data: {
      title: "Workshop Lập Trình Web Với ReactJS",
      description:
        "Hướng dẫn xây dựng website hiện đại bằng ReactJS, từ component, state, props đến gọi API và triển khai một dự án mini.",
      date: new Date("2026-09-20T12:00:00.000Z"),
      capacity: 40,
      registrations: {
        create: [
          { name: "Phạm Quốc Bảo", email: "quocbao@example.com" },
          { name: "Võ Thanh Tùng", email: "thanhtung@example.com" },
          { name: "Nguyễn Hải Yến", email: "haiyen@example.com" },
          { name: "Đỗ Minh Khoa", email: "minhkhoa@example.com" },
        ],
      },
    },
  });

  await prisma.workshop.create({
    data: {
      title: "Workshop Ứng Dụng AI Trong Công Việc",
      description:
        "Khám phá cách sử dụng các công cụ AI để hỗ trợ viết nội dung, phân tích dữ liệu, lập kế hoạch và tăng hiệu suất làm việc hàng ngày. Workshop có phần hướng dẫn thực hành và bài tập áp dụng trực tiếp.",
      date: new Date("2026-09-27T12:00:00.000Z"),
      capacity: 50,
      registrations: {
        create: [
          { name: "Gabriel", email: "gabriel@example.com" },
          { name: "Bùi Gia Huy", email: "giahuy@example.com" },
          { name: "Nguyễn Thảo Vy", email: "thaovy@example.com" },
          { name: "Trần Đức Anh", email: "ducanh@example.com" },
          { name: "Hoàng Anh Dũng", email: "anhdung@example.com" },
          { name: "Phan Thị Mai", email: "thimai@example.com" },
        ],
      },
    },
  });

  await prisma.workshop.create({
    data: {
      title: "Workshop Xây Dựng CV Và Kỹ Năng Phỏng Vấn",
      description:
        "Học cách viết CV chuyên nghiệp, chuẩn bị hồ sơ ứng tuyển và luyện tập kỹ năng trả lời phỏng vấn qua các tình huống thực tế.",
      date: new Date("2026-10-24T12:00:00.000Z"),
      capacity: 40,
      registrations: {
        create: [
          { name: "Đặng Văn Long", email: "vanlong@example.com" },
          { name: "Ngô Thị Hương", email: "thihuong@example.com" },
          { name: "Lý Gia Bảo", email: "giabao@example.com" },
          { name: "Trịnh Minh Đức", email: "minhduc@example.com" },
        ],
      },
    },
  });

  await prisma.workshop.create({
    data: {
      title: "Workshop Quản Lý Tài Chính Cá Nhân",
      description:
        "Trang bị kiến thức cơ bản về lập ngân sách, tiết kiệm và đầu tư, giúp bạn chủ động quản lý tài chính cá nhân hiệu quả hơn.",
      date: new Date("2026-11-01T12:00:00.000Z"),
      capacity: 30,
      registrations: {
        create: [
          { name: "Vũ Thị Ngọc", email: "thingoc@example.com" },
          { name: "Phạm Đình Khang", email: "dinhkhang@example.com" },
          { name: "Lê Bảo Trân", email: "baotran@example.com" },
        ],
      },
    },
  });

  await prisma.workshop.create({
    data: {
      title: "Workshop Digital Marketing Thực Chiến",
      description:
        "Tìm hiểu các chiến lược Digital Marketing hiện đại: SEO, quảng cáo mạng xã hội, content marketing và cách đo lường hiệu quả chiến dịch.",
      date: new Date("2026-10-10T12:00:00.000Z"),
      capacity: 35,
      registrations: {
        create: [
          { name: "Trương Gia Hân", email: "giahan@example.com" },
          { name: "Nguyễn Việt Hoàng", email: "viethoang@example.com" },
          { name: "Đỗ Thanh Thảo", email: "thanhthao@example.com" },
        ],
      },
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
