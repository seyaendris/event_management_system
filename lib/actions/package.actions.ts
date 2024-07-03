
'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'
import PackageCategory from '../database/models/packagecategory.model'
import Packages from '../database/models/package.model'

import { 
    CreatePackageParams, 
    DeletePackageParams, 
    GetAllPackagesParams, 
    GetPackagesByUserParams, 
    GetRelatedPackagesByCategoryParams, 
    UpdatePackageParams 
} from '@/types'


const getPackageCategoryByName = async (name: string) => {
  return PackageCategory.findOne({ name: { $regex: name, $options: 'i' } })
}

const populatePackage = (query: any) => {
  return query
    .populate({ path: 'vendor', model: User, select: '_id firstName lastName' })
    .populate({ path: 'packageCategory', model: PackageCategory, select: '_id name' })
}

// CREATE
export async function createPackage({ userId, packages, path }: CreatePackageParams) {
  try {
    await connectToDatabase()

    const vendor = await User.findById(userId)
    if (!vendor) throw new Error('Vendor not found')

    const newPackage = await Packages.create({ ...packages, packageCategory: packages.packageCategoryId, vendor: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newPackage))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE PACKAGE BY ID
export async function getPackageById(packageId: string) {
  try {
    await connectToDatabase()

    const packages = await populatePackage(Packages.findById(packageId))

    if (!packages) throw new Error('Package not found')

    return JSON.parse(JSON.stringify(packages))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updatePackage({ userId, packages, path }: UpdatePackageParams) {
  try {
    await connectToDatabase()

    const packageToUpdate = await Packages.findById(packages._id)
    if (!packageToUpdate || packageToUpdate.vendor.toHexString() !== userId) {
      throw new Error('Unauthorized or package not found')
    }

    const updatedPackage = await Packages.findByIdAndUpdate(
      packages._id,
      { ...packages, vendor: packages.packageCategoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedPackage))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent({ packageId, path }: DeletePackageParams) {
  try {
    await connectToDatabase()

    const deletedPackage = await Packages.findByIdAndDelete(packageId)
    if (deletedPackage) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL PACKAGES
export async function getAllPackages({ query, limit = 6, page, packageCategory }: GetAllPackagesParams) {
  try {
    await connectToDatabase()

    const nameCondition = query ? { name: { $regex: query, $options: 'i' } } : {}
    const packageCategoryCondition = packageCategory ? await getPackageCategoryByName(packageCategory) : null
    const conditions = {
      $and: [nameCondition, packageCategoryCondition ? { packageCategory: packageCategoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const packagesQuery = Packages.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const packages = await populatePackage(packagesQuery)
    const packagesCount = await Packages.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(packages)),
      totalPages: Math.ceil(packagesCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET PACKAGES BY ORGANIZER
export async function getPackagesByUser({ userId, limit = 6, page }: GetPackagesByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { vendor: userId }
    const skipAmount = (page - 1) * limit

    const packagesQuery = Packages.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const packages = await populatePackage(packagesQuery)
    const packagesCount = await Packages.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(packages)), totalPages: Math.ceil(packagesCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED PACKAGES: PACKAGES WITH SAME CATEGORY
export async function getRelatedPackagesByCategory({
  packageCategoryId,
  packageId,
  limit = 3,
  page = 1,
}: GetRelatedPackagesByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ packageCategory: packageCategoryId }, { _id: { $ne: packageId } }] }

    const eventsQuery = Packages.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const packages = await populatePackage(eventsQuery)
    const packagesCount = await Packages.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(packages)), totalPages: Math.ceil(packagesCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
