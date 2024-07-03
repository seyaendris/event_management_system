import { Document, Schema, model, models } from "mongoose";

export interface IPackage extends Document {
  _id: string;
  name: string;
  description?: string;
  price: string;
  includedServices: string,
  vendor: { _id: string; firstName: string; lastName: string };
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  includedServices: { type: String },
  vendor: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Package = models.Package || model('Package', PackageSchema);

export default Event;
