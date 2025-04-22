import { useQuery } from "@tanstack/react-query";

// Product interface
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Response interface
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// interface CategoryResponse {
//   slug: string;
//   name: string;
//   url: string;
// }

// Query parameters for products
interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string; // Add category parameter
}

// Fetch all products
const fetchProducts = async (
  params?: ProductsQueryParams
): Promise<ProductsResponse> => {
  const queryParams = new URLSearchParams();

  if (params) {
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.skip) queryParams.append("skip", params.skip.toString());
    if (params.select) queryParams.append("select", params.select);
    if (params.sortBy && params.order) {
      queryParams.append("sortBy", params.sortBy);
      queryParams.append("order", params.order);
    }

    // If category is provided, use category endpoint instead
    if (params.category) {
      const response = await fetch(
        `https://dummyjson.com/products/category/${params.category}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products in category ${params.category}`
        );
      }

      return response.json();
    }
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  const response = await fetch(`https://dummyjson.com/products${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

// Fetch product by ID
const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }

  return response.json();
};

// Fetch products by category
const fetchProductsByCategory = async (
  category: string
): Promise<ProductsResponse> => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products in category ${category}`);
  }

  return response.json();
};

// Fetch product categories
const fetchProductCategories = async (): Promise<string[]> => {
  const response = await fetch("https://dummyjson.com/products/category-list");

  if (!response.ok) {
    throw new Error("Failed to fetch product categories");
  }

  return response.json();
};

// Custom hooks
export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: fetchProductCategories,
  });
};
