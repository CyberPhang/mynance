/*
  Warnings:

  - Made the column `amount` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Budget` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Budget" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;
