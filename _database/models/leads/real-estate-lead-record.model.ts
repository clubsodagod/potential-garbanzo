import {
    ILeadRecord,
    LeadActionType
} from "@/_library/types-interfaces-classes/leads";
import mongoose, { Schema, model, Document, models } from "mongoose";

const LeadRecordSchema = new Schema<ILeadRecord & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        actionType: {
            type: String,
            enum: ["call", "text", "email", "voicemail", "note", "other"],
            required: true,
        },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
        callCount: { type: Number, default: 1 },

        // 🔁 Store only the ID as reference — no full embedded snapshot
        leadSnapshot: {
            type: Schema.Types.ObjectId,
            ref: "RealEstateLead",
            required: true,
        },

        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

export const LeadRecordModel =
    models.LeadRecord || model<ILeadRecord & Document>("LeadRecord", LeadRecordSchema);


export interface LeadRecordDocument {
    _id: string;
    userId: mongoose.Types.ObjectId;
    actionType: LeadActionType;
    timestamp: Date;
    note?: string;
    callCount?: number;

    // 🔁 Only the ObjectId reference, not populated here
    leadSnapshot: mongoose.Types.ObjectId;

    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

