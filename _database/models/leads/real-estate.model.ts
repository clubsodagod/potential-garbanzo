import { IRealEstateLead } from '@/_library/types-interfaces-classes/leads';
import mongoose, { Schema, model, models, Document } from 'mongoose';

// Embedded phone number sub-schema
const PhoneSchema = new Schema(
    {
        number: { type: String, required: true },
        type: { type: String },
    },
    { _id: false }
);

// Embedded owner contact info
const OwnerSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        phones: { type: [PhoneSchema], default: [] },
        emails: { type: [String], default: [] },
    },
    { _id: false }
);

// Embedded property info
const PropertySchema = new Schema(
    {
        apn: String,
        address: { type: String, required: true },
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
        lotSizeSqFt: Number,
        totalAssessedValue: Number,
        zoningCode: String,
        lastSaleDate: Date,
        lastSalePrice: Number,
        mlsStatus: String,
        mlsListingDate: Date,
        mlsListingAmount: Number,
    },
    { _id: false }
);

// Embedded loan info
const LoanInfoSchema = new Schema(
    {
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
        ltvCurrentEstimatedCombined: Number,
    },
    { _id: false }
);

// Embedded foreclosure info
const ForeclosureInfoSchema = new Schema(
    {
        documentType: String,
        status: String,
        auctionDate: Date,
        defaultDate: Date,
        recordingDate: Date,
        caseNumber: String,
        trusteeOrAttorney: String,
    },
    { _id: false }
);

// Embedded investment highlights
const InvestmentHighlightSchema = new Schema(
    {
        equityCurrentEstimatedBalance: Number,
        notes: String,
        spread: Number,
        percentARV: Number,
        tagNames: String,
    },
    { _id: false }
);

// Embedded MLS Agent schema
const MLSAgentSchema = new Schema(
    {
        fullName: String,
        phone: String,
        email: String,
        brokerageName: String,
        brokeragePhone: String,
    },
    { _id: false }
);

// Embedded metadata schema
const MetadataSchema = new Schema(
    {
        createdDate: Date,
        updatedDate: Date,
        parcelCount: Number,
        propertyTypeDetail: String,
        ownerOccupied: Boolean,
        mlsAgent: MLSAgentSchema,
        listCount: Number,
        mailerCount: Number,
        selfManaged: Boolean,
        pushedToBatchDialer: Boolean,
        office: String,
    },
    { _id: false }
);

// Embedded mailing info schema
const MailingInfoSchema = new Schema(
    {
        address: String,
        city: String,
        state: String,
        zip: String,
        county: String,
        isMailingVacant: Boolean,
        isVacant: Boolean,
        isLitigator: Boolean,
        optOut: Boolean,
    },
    { _id: false }
);

// Main real estate lead schema
const RealEstateLeadSchema = new Schema<IRealEstateLead & Document>(
    {
        leadType: {
            type: String,
            enum: ['preforeclosure', 'vacantDistressedProperty'],
            required: true,
        },
        leadStatus: { type: String, required: true },
        batchrankScoreCategory: { type: String },

        property: { type: PropertySchema, required: true },
        owner: { type: [OwnerSchema], required: true },
        loanInfo: LoanInfoSchema,
        foreclosureInfo: ForeclosureInfoSchema,
        investmentHighlight: InvestmentHighlightSchema,
        mailingInfo: MailingInfoSchema,
        metadata: MetadataSchema,

        leadInteractionHistory: {
            type: [Schema.Types.ObjectId],
            ref: "LeadRecord",
            required:true,
            default: [],
        },

        additionalData: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Export compiled model
export const RealEstateLeadModel =
    models.RealEstateLead || model<IRealEstateLead & Document>('RealEstateLead', RealEstateLeadSchema);
