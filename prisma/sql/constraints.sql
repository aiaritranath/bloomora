-- Prisma cannot express CHECK constraints or extensions in schema.prisma.
-- After `npm run db:migrate -- --create-only --name init`, paste this into the
-- generated migration.sql before applying it.

ALTER TABLE "ProductVariant" ADD CONSTRAINT "variant_stock_non_negative" CHECK ("stock" >= 0);
ALTER TABLE "ProductVariant" ADD CONSTRAINT "variant_price_lte_mrp" CHECK ("price" <= "mrp");
ALTER TABLE "CartItem"       ADD CONSTRAINT "cartitem_qty_positive" CHECK ("quantity" > 0);
ALTER TABLE "OrderItem"      ADD CONSTRAINT "orderitem_qty_positive" CHECK ("quantity" > 0);
ALTER TABLE "Review"         ADD CONSTRAINT "review_rating_range" CHECK ("rating" BETWEEN 1 AND 5);

-- Typo-tolerant search (used in Phase 5): "bugenvilia" -> Bougainvillea
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "Product_name_trgm" ON "Product" USING gin ("name" gin_trgm_ops);
CREATE INDEX "Product_botanical_trgm" ON "Product" USING gin ("botanicalName" gin_trgm_ops);
