"use server"

import { CreateCategoryParams, CreatePackageCategoryParams, CreateProductCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"
import PackageCategory from "../database/models/packagecategory.model"
import ProductCategory from "../database/models/productcategory.model"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const createPackageCategory = async ({ packageCategoryName }: CreatePackageCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await PackageCategory.create({ name: packageCategoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const createProductCategory = async ({ productCategoryName }: CreateProductCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await ProductCategory.create({ name: productCategoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}

export const getAllPackageCategories = async () => {
  try {
    await connectToDatabase();

    const packageCategories = await PackageCategory.find();

    return JSON.parse(JSON.stringify(packageCategories));
  } catch (error) {
    handleError(error)
  }
}

export const getAllProductCategories = async () => {
  try {
    await connectToDatabase();

    const productCategories = await ProductCategory.find();

    return JSON.parse(JSON.stringify(productCategories));
  } catch (error) {
    handleError(error)
  }
}