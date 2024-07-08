import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'

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
import { createProductCategory, getAllProductCategories } from '@/lib/actions/category.actions'
import { IProductCategory } from '@/lib/database/models/productcategory.model'
  
  

type ProductDropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const ProductDropdown = ({ value, onChangeHandler }: ProductDropdownProps) => {

    const [productcategories, setProductCategories] = useState<IProductCategory[]>([])
    const [newProductCategory, setNewProductCategory] = useState('');

    const handleAddProductCategory = () => {
      createProductCategory({
        productCategoryName: newProductCategory.trim()
      })
        .then((productCategory) => {
            setProductCategories((prevState) => [...prevState, productCategory])
        })
    }

    useEffect(() => {
      const getProductCategories = async () => {
        const productCategoryList = await getAllProductCategories();
  
        productCategoryList && setProductCategories(productCategoryList as IProductCategory[])
      }
  
      getProductCategories();
    }, [])
  
  return (

    <Select onValueChange={onChangeHandler} defaultValue={value}>
     <SelectTrigger className="select-field">
            <SelectValue placeholder="Product Category" />
     </SelectTrigger>
     <SelectContent>
        {productcategories.length > 0 && productcategories.map((productCategory) => (
          <SelectItem key={productCategory._id} value={productCategory._id} className="select-item p-regular-14">
            {productCategory.name}
          </SelectItem>
          ))}

        <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-orange-800 hover:bg-orange-100 focus:text-orange-800">Add New Product Category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle>New Product Category</AlertDialogTitle>
                <AlertDialogDescription>
                   <Input type='text' placeholder='Product Category Name' className='input-field mt-3' onChange={(e) => setNewProductCategory(e.target.value)} />
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-orange-600 hover:bg-orange-700' onClick={() => startTransition(handleAddProductCategory)}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

     </SelectContent>
    </Select>


  )
}

export default ProductDropdown