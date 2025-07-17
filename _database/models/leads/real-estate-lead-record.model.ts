import { ILeadRecord } from '@/_library/types-interfaces-classes/leads';
import { Schema, model, Document } from 'mongoose';

const LeadRecordSchema = new Schema<ILeadRecord & Document>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, enum: ['call', 'text', 'email', 'voicemail', 'note', 'other'], required: true },
    timestamp: { type: Date, default: Date.now },
    note: String,
    callCount: { type: Number, default: 1 },
    leadSnapshot: { type: Schema.Types.ObjectId, ref: 'RealEstateLead', required: true }, // Now a reference
    metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const LeadRecordModel = model<ILeadRecord & Document>('LeadRecord', LeadRecordSchema);
