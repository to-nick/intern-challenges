"use client";

import { useSearchParams, useRouter } from "next/navigation";


interface CategoryFilterProps{
  categories: string[];
}
export default function CategoryFilter({categories}: CategoryFilterProps){
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(category: string){
    const params = new URLSearchParams(searchParams.toString());
    console.log("params:",params);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">select category</option>
        {categories.map((category) => (
        <option key={category} value={category}>{category}</option>))}
      </select>
    </div>
  )
}