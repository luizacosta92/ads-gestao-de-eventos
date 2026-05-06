-- CreateEnum
CREATE TYPE "WeddingStatus" AS ENUM ('PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "weddings" (
    "id" SERIAL NOT NULL,
    "bride_name" VARCHAR(150) NOT NULL,
    "groom_name" VARCHAR(150) NOT NULL,
    "couple_email" VARCHAR(150) NOT NULL,
    "couple_phone" VARCHAR(20) NOT NULL,
    "wedding_date" DATE NOT NULL,
    "venue" VARCHAR(300) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "estimated_guests" INTEGER NOT NULL DEFAULT 0,
    "total_budget" DECIMAL(12,2) NOT NULL,
    "status" "WeddingStatus" NOT NULL DEFAULT 'PLANNING',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weddings_pkey" PRIMARY KEY ("id")
);
