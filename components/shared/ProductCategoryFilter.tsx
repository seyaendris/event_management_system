
"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories, getAllProductCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { IProductCategory } from "@/lib/database/models/productcategory.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductCategoryFilter = () => {
  const [productcategories, setProductCategories] = useState<IProductCategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getProductCategories = async () => {
      const productCategoryList = await getAllProductCategories();

      productCategoryList && setProductCategories(productCategoryList as IProductCategory[])
    }

    getProductCategories();
  }, [])

  const onSelectProductCategory = (productcategory: string) => {
      let newUrl = '';

      if(productcategory && productcategory !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'category',
          value: productcategory
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['productcategory']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectProductCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Product Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {productcategories.map((productcategory) => (
          <SelectItem value={productcategory.name} key={productcategory._id} className="select-item p-regular-14">
            {productcategory.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ProductCategoryFilter
