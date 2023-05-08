import { prisma } from "@/lib/prisma";
import { updateRatings } from "@/utils/elo";
import { createMatch } from "@/utils/match";
import { BadRequest, InternalServerError } from "@/utils/route";
import { NextResponse } from "next/server";
import { z } from "zod";

const matchSchema = z.object({
  playerIds: z.array(z.number()),
  raceResults: z.array(
    z.object({
      playerId: z.number(),
      placement: z.number().min(1).max(4),
      race: z.number().min(1).max(4).optional(), // trengs denne?
    })
  ),
});

type MatchSchema = z.infer<typeof matchSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = matchSchema.safeParse(body);

    if (!parsedBody.success) {
      return BadRequest({ error: parsedBody.error });
    }

    const result = await createMatch(
      parsedBody.data.playerIds,
      parsedBody.data.raceResults
    );

    await updateRatings(result.id);

    return NextResponse.json(result);
  } catch (ex) {
    console.error(ex);

    return InternalServerError();
  }
}

export async function GET() {
  const result = await prisma.match.findMany({
    include: { playerMatches: true, ratings: true },
  });

  return NextResponse.json(result);
}
