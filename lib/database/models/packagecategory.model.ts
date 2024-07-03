import { Document, Schema, model, models } from "mongoose";

export interface IPackageCategory extends Document {
  _id: string;
  name: string;
}

const PackageCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const PackageCategory = models.Category || model('Category', PackageCategorySchema);

export default PackageCategory;