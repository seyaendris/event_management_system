import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description?: string;
  price: string;
  contactInfo: string,
  productCategory: { _id: string, name: string };
  vendor: { _id: string; firstName: string; lastName: string };
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  contactInfo: { type: String },
  productCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  vendor: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;