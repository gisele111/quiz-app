/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Made the column `end_time` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "end_time" SET NOT NULL,
ALTER COLUMN "end_time" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "current_score" INTEGER;

-- DropEnum
DROP TYPE "Role";
