import { Document, Schema, model, models } from "mongoose";

export interface IPackage extends Document {
  _id: string;
  name: string;
  description?: string;
  price: string;
  includedServices: string,
  packageCategory: { _id: string, name: string };
  vendor: { _id: string; firstName: string; lastName: string };
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  includedServices: { type: String },
  packageCategory: { type: Schema.Types.ObjectId, ref: 'PackageCategory' },
  vendor: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Packages = models.Packages || model('Packages', PackageSchema);

export default Packages;
