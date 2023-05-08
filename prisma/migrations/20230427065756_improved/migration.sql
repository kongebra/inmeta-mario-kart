/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the `RaceResult` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eloChange` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newElo` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "createdAt",
ADD COLUMN     "eloRating" INTEGER NOT NULL DEFAULT 1200;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "createdAt",
DROP COLUMN "rating",
ADD COLUMN     "eloChange" INTEGER NOT NULL,
ADD COLUMN     "matchId" INTEGER NOT NULL,
ADD COLUMN     "newElo" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RaceResult";

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatch" (
    "playerId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "placement" INTEGER NOT NULL,

    CONSTRAINT "PlayerMatch_pkey" PRIMARY KEY ("playerId","matchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- AddForeignKey
ALTER TABLE "PlayerMatch" ADD CONSTRAINT "PlayerMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatch" ADD CONSTRAINT "PlayerMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
