import { prisma } from "@/lib/prisma";

export async function createPlayer(name: string) {
  const newPlayer = await prisma.player.create({
    data: {
      name: name,
    },
  });

  console.log(`Created new player: ${newPlayer.name} (ID: ${newPlayer.id})`);

  return newPlayer;
}

export async function getPlayers() {
  return await prisma.player.findMany();
}
