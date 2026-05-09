-- AlterTable
ALTER TABLE "User" ADD COLUMN     "analysisCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paypalSubscriptionId" TEXT,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';
