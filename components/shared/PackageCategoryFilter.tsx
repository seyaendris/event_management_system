
"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  getAllPackageCategories  } from "@/lib/actions/category.actions";
import { IPackageCategory } from "@/lib/database/models/packagecategory.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PackageCategoryFilter = () => {
  const [packagecategories, setPackageCategories] = useState<IPackageCategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getPackageCategories = async () => {
      const packageCategoryList = await getAllPackageCategories();

      packageCategoryList && setPackageCategories(packageCategoryList as IPackageCategory[])
    }

    getPackageCategories();
  }, [])

  const onSelectPackageCategory = (packagecategory: string) => {
      let newUrl = '';

      if(packagecategory && packagecategory !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'packagecategory',
          value: packagecategory
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['packagecategory']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectPackageCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Product Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {packagecategories.map((packagecategory) => (
          <SelectItem value={packagecategory.name} key={packagecategory._id} className="select-item p-regular-14">
            {packagecategory.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PackageCategoryFilter
