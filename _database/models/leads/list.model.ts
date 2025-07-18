
import mongoose, { Schema, model, models, Document } from 'mongoose';
import { RealEstateLead } from './real-estate.model';

export interface IRealEstateLeadList extends Document {
    name: string;
    description?: string;
    leadIds: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IRealEstateLeadListDocument {
    _id:mongoose.Types.ObjectId;
    name: string;
    description?: string;
    leadIds: RealEstateLead[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IRealEstateLeadListDocumentV2 {
    _id:string;
    name: string;
    description?: string;
    leadIds: RealEstateLead[];
    createdAt: Date;
    updatedAt: Date;
}

const RealEstateLeadListSchema = new Schema<IRealEstateLeadList>(
    {
        name: { type: String, required: true },
        description: { type: String },
        leadIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'RealEstateLead',
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const RealEstateLeadListModel =
    models.RealEstateLeadList || model<IRealEstateLeadList>('RealEstateLeadList', RealEstateLeadListSchema);
