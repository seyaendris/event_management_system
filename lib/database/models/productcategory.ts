import { Document, Schema, model, models } from "mongoose";

export interface IProductCategory extends Document {
  _id: string;
  name: string;
}

const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const ProductCategory = models.ProductCategory || model('ProductCategory', ProductCategorySchema);

export default ProductCategory;