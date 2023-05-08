import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const svein = prisma.player.upsert({
    create: {
      name: "Svein Are",
    },
    update: {},
    where: {
      id: 1,
    },
  });

  const daniel = prisma.player.upsert({
    create: {
      name: "Daniel",
    },
    update: {},
    where: {
      id: 2,
    },
  });

  const simon = prisma.player.upsert({
    create: {
      name: "Simon",
    },
    update: {},
    where: {
      id: 3,
    },
  });

  return new Response(JSON.stringify([svein, daniel, simon]));
}
