import { createPlayer, getPlayers } from "@/utils/player";
import { BadRequest, InternalServerError } from "@/utils/route";
import { NextResponse } from "next/server";
import { z } from "zod";

const playerSchema = z.object({
  name: z.string().min(2).max(128),
});
type PlayerSchema = z.infer<typeof playerSchema>;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PlayerSchema;
    const parsedBody = playerSchema.safeParse(body);

    if (!parsedBody.success) {
      return BadRequest({ error: parsedBody.error });
    }

    const result = await createPlayer(parsedBody.data.name);

    return NextResponse.json(result);
  } catch (ex) {
    const err = ex as Error;

    if (err?.message.includes("Unique constraint")) {
      return BadRequest({ message: "duplication. 'name' already in use" });
    }

    return InternalServerError();
  }
}

export async function GET() {
  const players = await getPlayers();

  return NextResponse.json(players);
}
