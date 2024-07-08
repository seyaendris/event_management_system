'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Product from '@/lib/database/models/product.model'
import User from '@/lib/database/models/user.model'
import ProductCategory from '@/lib/database/models/productcategory.model'
import { handleError } from '@/lib/utils'

import {
  CreateProductParams,
  UpdateProductParams,
  DeleteProductParams,
  GetAllProductsParams,
  GetProductsByUserParams,
  GetRelatedProductsByCategoryParams,
} from '@/types'

const getProductCategoryByName = async (name: string) => {
  return ProductCategory.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateProduct = (query: any) => {
  return query
    .populate({ path: 'vendor', model: User, select: '_id firstName lastName' })
    .populate({ path: 'productCategory', model: ProductCategory, select: '_id name' })
}

// CREATE
export async function createProduct({ userId, product, path }: CreateProductParams) {
  try {
    await connectToDatabase()

    const vendor = await User.findById(userId)
    if (!vendor) throw new Error('Vendor not found')

    const newProduct = await Product.create({ ...product, productCategory: product.productCategoryId, vendor: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newProduct))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE PRODUCT BY ID
export async function getProductById(productId: string) {
  try {
    await connectToDatabase()

    const product = await populateProduct(Product.findById(productId))

    if (!product) throw new Error('Product not found')

    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateProduct({ userId, product, path }: UpdateProductParams) {
  try {
    await connectToDatabase()

    const productToUpdate = await Product.findById(product._id)
    if (!productToUpdate || productToUpdate.vendor.toHexString() !== userId) {
      throw new Error('Unauthorized or product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product, productCategory: product.productCategoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedProduct))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteProduct({ productId, path }: DeleteProductParams) {
  try {
    await connectToDatabase()

    const deletedProduct = await Product.findByIdAndDelete(productId)
    if (deletedProduct) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL PRODUCTS
export async function getAllProducts({ query, limit = 6, page, productCategory }: GetAllProductsParams) {
  try {
    await connectToDatabase()

    const nameCondition = query ? { name: { $regex: query, $options: 'i' } } : {}
    const productCategoryCondition = productCategory ? await getProductCategoryByName(productCategory) : null
    const conditions = {
      $and: [nameCondition, productCategoryCondition ? { productCategory: productCategoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const products = await populateProduct(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET PRODUCTS BY VENDOR
export async function getProductsByUser({ userId, limit = 6, page }: GetProductsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { vendor: userId }
    const skipAmount = (page - 1) * limit

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const products = await populateProduct(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(products)), totalPages: Math.ceil(productsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
export async function getRelatedProductsByCategory({
  productCategoryId,
  productId,
  limit = 3,
  page = 1,
}: GetRelatedProductsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ productCategory: productCategoryId }, { _id: { $ne: productId } }] }

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const products = await populateProduct(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(products)), totalPages: Math.ceil(productsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
