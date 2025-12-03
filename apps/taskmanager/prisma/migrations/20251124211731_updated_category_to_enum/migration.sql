/*
  Warnings:

  - The `category` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WORK', 'PERSONAL', 'LEARNING', 'HOME', 'HEALTH', 'FINANCE', 'TRAVEL', 'ENTERTAINMENT', 'SOCIAL', 'OTHER');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'OTHER';
