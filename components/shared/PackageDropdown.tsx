import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createPackageCategory, createProductCategory, getAllPackageCategories, getAllProductCategories } from '@/lib/actions/category.actions'
import { IProductCategory } from '@/lib/database/models/productcategory.model'
import { IPackageCategory } from '@/lib/database/models/packagecategory.model'
  
  

type PackageDropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const PackageDropdown = ({ value, onChangeHandler }: PackageDropdownProps) => {

    const [packagecategories, setPackageCategories] = useState<IPackageCategory[]>([])
    const [newPackageCategory, setNewPackageCategory] = useState('');

    const handleAddPackageCategory = () => {
      createPackageCategory({
        packageCategoryName: newPackageCategory.trim()
      })
        .then((packageCategory) => {
            setPackageCategories((prevState) => [...prevState, packageCategory])
        })
    }

    useEffect(() => {
      const getPackageCategories = async () => {
        const packageCategoryList = await getAllPackageCategories();
  
        packageCategoryList && setPackageCategories(packageCategoryList as IPackageCategory[])
      }
  
      getPackageCategories();
    }, [])
  
  return (

    <Select onValueChange={onChangeHandler} defaultValue={value}>
     <SelectTrigger className="select-field">
            <SelectValue placeholder="Package Category" />
     </SelectTrigger>
     <SelectContent>
        {packagecategories.length > 0 && packagecategories.map((packageCategory) => (
          <SelectItem key={packageCategory._id} value={packageCategory._id} className="select-item p-regular-14">
            {packageCategory.name}
          </SelectItem>
          ))}

        <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-orange-800 hover:bg-orange-100 focus:text-orange-800">Add New Package Category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle>New Package Category</AlertDialogTitle>
                <AlertDialogDescription>
                   <Input type='text' placeholder='Package Category Name' className='input-field mt-3' onChange={(e) => setNewPackageCategory(e.target.value)} />
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-orange-600 hover:bg-orange-700' onClick={() => startTransition(handleAddPackageCategory)}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

     </SelectContent>
    </Select>


  )
}

export default PackageDropdown