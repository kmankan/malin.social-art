/*
  Warnings:

  - You are about to drop the column `configuration` on the `Artwork` table. All the data in the column will be lost.
  - Added the required column `state` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "configuration",
ADD COLUMN     "state" JSONB NOT NULL;
