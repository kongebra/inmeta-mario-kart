/*
  Warnings:

  - Added the required column `result` to the `PlayerMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerMatch" ADD COLUMN     "result" JSONB NOT NULL;
