-- AlterTable: tornar campos da etapa "evento" opcionais
ALTER TABLE "weddings" ALTER COLUMN "wedding_date" DROP NOT NULL;
ALTER TABLE "weddings" ALTER COLUMN "venue" DROP NOT NULL;
ALTER TABLE "weddings" ALTER COLUMN "city" DROP NOT NULL;
ALTER TABLE "weddings" ALTER COLUMN "state" DROP NOT NULL;
ALTER TABLE "weddings" ALTER COLUMN "total_budget" DROP NOT NULL;

-- CreateTable: fornecedores
CREATE TABLE "vendors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "service_category" VARCHAR(100) NOT NULL,
    "tax_id" VARCHAR(18),
    "whatsapp" VARCHAR(20),
    "phone" VARCHAR(20),
    "email" VARCHAR(150),
    "address" VARCHAR(300),
    "city" VARCHAR(100),
    "state" VARCHAR(2),
    "social_links" TEXT,
    "website" VARCHAR(200),
    "portfolio_urls" TEXT,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);
