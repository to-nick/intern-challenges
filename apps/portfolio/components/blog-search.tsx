"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function BlogSearch(){
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    
    router.push(`/blog?${params.toString()}`);
   

  }
    return(
      <div className="w-1/2">
        <input 
          type="text" 
          placeholder="Search" 
          className="border border-gray-200 rounded-lg p-2 w-full text-center" 
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    )
}
