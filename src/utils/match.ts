import { prisma } from "@/lib/prisma";

interface RaceResult {
  playerId: number;
  placement: number;
  race?: number;
}

export async function createMatch(
  playerIds: number[],
  raceResults: RaceResult[]
) {
  const newMatch = await prisma.match.create({
    data: {},
  });

  for (const result of raceResults) {
    await prisma.playerMatch.create({
      data: {
        playerId: result.playerId,
        matchId: newMatch.id,
        placement: result.placement,
        result: { race: result.race || null },
      },
    });
  }

  console.log(`Created new match with ID: ${newMatch.id}`);
  return newMatch;
}
