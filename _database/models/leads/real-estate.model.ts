import { IRealEstateLead } from '@/_library/types-interfaces-classes/leads';
import mongoose, { Schema, model, models, Document } from 'mongoose';

const PhoneSchema = new Schema({
    number: String,
    type: String,
}, { _id: false });

const OwnerSchema = new Schema({
    firstName: String,
    lastName: String,
    phones: [PhoneSchema],
    emails: [String],
}, { _id: false });

const PropertySchema = new Schema({
    apn: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    county: String,
    bedroomCount: Number,
    bathroomCount: Number,
    totalBuildingAreaSqFt: Number,
    yearBuilt: Number,
    estimatedValue: Number,
    arv: Number,
}, { _id: false });

const LoanInfoSchema = new Schema({
    loanEstBalance: Number,
    loanEstPayment: Number,
    loanEstInterestRate: Number,
    loanRecordingDate: Date,
    loanType: String,
    loanAmount: Number,
    loanLenderName: String,
    loanDueDate: Date,
    loanTermMonths: Number,
    totalLoanBalance: Number,
}, { _id: false });

const ForeclosureInfoSchema = new Schema({
    documentType: String,
    status: String,
    auctionDate: Date,
    defaultDate: Date,
    recordingDate: Date,
    caseNumber: String,
    trusteeOrAttorney: String,
}, { _id: false });

const InvestmentHighlightSchema = new Schema({
    equityCurrentEstimatedBalance: Number,
    notes: String,
}, { _id: false });

export interface RealEstateLead extends IRealEstateLead {
    createdAt:Date;
    updatedAt:Date;
}

const RealEstateLeadSchema = new Schema<IRealEstateLead & Document>({
    leadType: { type: String, enum: ['preforeclosure', 'vacantDistressedProperty'], required: true },
    leadStatus: { type: String, required: true },
    batchrankScoreCategory: String,
    property: { type: PropertySchema, required: true },
    owner: { type: [OwnerSchema], required: true },
    loanInfo: LoanInfoSchema,
    foreclosureInfo: ForeclosureInfoSchema,
    investmentHighlight: InvestmentHighlightSchema,
}, { timestamps: true });

export const RealEstateLeadModel = models.RealEstateLead || model<IRealEstateLead & Document>('RealEstateLead', RealEstateLeadSchema);
