import ProductPage from "@/product-detail/productPage";
import { ProductType } from "@/product-detail/type/productType";

const apiUrl = process.env.API_URL || "http://localhost:5000";

async function fetchProduct(id: string): Promise<ProductType> {
  const res = await fetch(`${apiUrl}/products/${id}`, {
    cache: "no-store", // hoặc revalidate nếu cần
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPageHome({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await fetchProduct(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
}
