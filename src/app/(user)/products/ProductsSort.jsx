"use client";

import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

function ProductsSort() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort"));


  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathName + "?" + createQueryString("sort", value));
  };

  return (
    <div>
      <p className="font-bold mb-4">مرتب سازی</p>
      {sortOptions.map((item) => {
        return (
          <RadioInput
            id={item.id}
            key={item.id}
            label={item.label}
            name="product-sort"
            value={item.value}
            checked={sort === item.value}
            onChange={sortHandler}
          />
        );
      })}
    </div>
  );
}

export default ProductsSort;
