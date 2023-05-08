import { prisma } from "@/lib/prisma";

const K_FACTOR = 32;

function calculateElo(
  playerRating: number,
  opponentRating: number,
  outcome: number
): number {
  const expectedOutcome =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  return Math.round(playerRating + K_FACTOR * (outcome - expectedOutcome));
}

export async function updateRatings(matchId: number) {
  const playerMatches = await prisma.playerMatch.findMany({
    where: {
      matchId: matchId,
    },
    include: {
      player: true,
    },
  });

  const players = playerMatches.map((pm) => pm.player);

  for (const playerMatch of playerMatches) {
    const player = playerMatch.player;
    const opponents = players.filter((p) => p.id !== player.id);

    let newElo = player.eloRating;
    for (const opponent of opponents) {
      const outcome =
        playerMatch.placement <
        (playerMatches.find((pm) => pm.playerId === opponent.id)?.placement ??
          Infinity)
          ? 1
          : 0;

      const opponentElo = opponent.eloRating;
      newElo = calculateElo(newElo, opponentElo, outcome);
    }

    await prisma.player.update({
      where: { id: player.id },
      data: { eloRating: newElo },
    });

    await prisma.rating.create({
      data: {
        playerId: player.id,
        matchId: matchId,
        newElo: newElo,
        eloChange: newElo - player.eloRating,
      },
    });

    console.log(
      `Updated ELO rating for ${player.name} (ID: ${player.id}): ${player.eloRating} -> ${newElo}`
    );
  }
}
