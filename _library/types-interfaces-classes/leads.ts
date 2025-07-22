/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeadRecordDocument } from "@/_database/models/leads/real-estate-lead-record.model";
import { IUser } from "@/_database/models/user.model";
import mongoose, { Document } from "mongoose";

export type LeadType = 'preforeclosure' | 'vacantDistressedProperty';

export interface IProperty {
    apn: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    bedroomCount?: number;
    bathroomCount?: number;
    totalBuildingAreaSqFt?: number;
    yearBuilt?: number;
    estimatedValue?: number;
    arv?: number;
}

export interface IOwnerContact {
    firstName: string;
    lastName: string;
    phones: { number: string; type?: string }[];
    emails?: string[];
}

export interface ILoanInfo {
    loanEstBalance?: number;
    loanEstPayment?: number;
    loanEstInterestRate?: number;
    loanRecordingDate?: Date | string;
    loanType?: string;
    loanAmount?: number;
    loanLenderName?: string;
    loanDueDate?: Date | string;
    loanTermMonths?: number;
    totalLoanBalance?: number;
}

export interface IForeclosureInfo {
    documentType?: string;
    status?: string;
    auctionDate?: Date | string;
    defaultDate?: Date | string;
    recordingDate?: Date | string;
    caseNumber?: string;
    trusteeOrAttorney?: string;
}

export interface IInvestmentHighlight {
    equityCurrentEstimatedBalance?: number;
    notes?: string;
}

export interface IRealEstateLead {
    leadStatus: string;
    leadType: LeadType;
    batchrankScoreCategory?: string;

    property: {
        apn?: string;
        address: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        bedroomCount?: number;
        bathroomCount?: number;
        totalBuildingAreaSqFt?: number;
        yearBuilt?: number;
        estimatedValue?: number;
        arv?: number;

        lotSizeSqFt?: number;
        totalAssessedValue?: number;
        zoningCode?: string;
        lastSaleDate?: Date;
        lastSalePrice?: number;
        mlsStatus?: string;
        mlsListingDate?: Date;
        mlsListingAmount?: number;
    };

    owner: {
        firstName?: string;
        lastName?: string;
        phones: { number: string; type?: string }[];
        emails: string[];
    }[];

    loanInfo?: {
        loanEstBalance?: number;
        loanEstPayment?: number;
        loanEstInterestRate?: number;
        loanRecordingDate?: Date;
        loanType?: string;
        loanAmount?: number;
        loanLenderName?: string;
        loanDueDate?: Date;
        loanTermMonths?: number;
        totalLoanBalance?: number;
        ltvCurrentEstimatedCombined?: number;
    };

    foreclosureInfo?: {
        documentType?: string;
        status?: string;
        auctionDate?: Date;
        defaultDate?: Date;
        recordingDate?: Date;
        caseNumber?: string;
        trusteeOrAttorney?: string;
    };

    investmentHighlight?: {
        equityCurrentEstimatedBalance?: number;
        notes?: string;
        spread?: number;
        percentARV?: number;
        tagNames?: string;
    };

    mailingInfo?: {
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        isMailingVacant?: boolean;
        isVacant?: boolean;
        isLitigator?: boolean;
        optOut?: boolean;
    };

    metadata?: {
        createdDate?: Date;
        updatedDate?: Date;
        parcelCount?: number;
        propertyTypeDetail?: string;
        ownerOccupied?: boolean;
        mlsAgent?: {
            fullName?: string;
            phone?: string;
            email?: string;
            brokerageName?: string;
            brokeragePhone?: string;
        };
        listCount?: number;
        mailerCount?: number;
        selfManaged?: boolean;
        pushedToBatchDialer?: boolean;
        office?: string;
    };

    leadInteractionHistory?: LeadRecordDocument[];
    additionalData?: Record<string, any>;
}

export interface IRELead {
    _id:string;
    createdAt:Date;
    updatedAt:Date;
    leadStatus: string;
    leadType: LeadType;
    batchrankScoreCategory?: string;

    property: {
        apn?: string;
        address: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        bedroomCount?: number;
        bathroomCount?: number;
        totalBuildingAreaSqFt?: number;
        yearBuilt?: number;
        estimatedValue?: number;
        arv?: number;

        lotSizeSqFt?: number;
        totalAssessedValue?: number;
        zoningCode?: string;
        lastSaleDate?: Date;
        lastSalePrice?: number;
        mlsStatus?: string;
        mlsListingDate?: Date;
        mlsListingAmount?: number;
    };

    owner: {
        firstName?: string;
        lastName?: string;
        phones: { number: string; type?: string }[];
        emails: string[];
    }[];

    loanInfo?: {
        loanEstBalance?: number;
        loanEstPayment?: number;
        loanEstInterestRate?: number;
        loanRecordingDate?: Date;
        loanType?: string;
        loanAmount?: number;
        loanLenderName?: string;
        loanDueDate?: Date;
        loanTermMonths?: number;
        totalLoanBalance?: number;
        ltvCurrentEstimatedCombined?: number;
    };

    foreclosureInfo?: {
        documentType?: string;
        status?: string;
        auctionDate?: Date;
        defaultDate?: Date;
        recordingDate?: Date;
        caseNumber?: string;
        trusteeOrAttorney?: string;
    };

    investmentHighlight?: {
        equityCurrentEstimatedBalance?: number;
        notes?: string;
        spread?: number;
        percentARV?: number;
        tagNames?: string;
    };

    mailingInfo?: {
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        isMailingVacant?: boolean;
        isVacant?: boolean;
        isLitigator?: boolean;
        optOut?: boolean;
    };

    metadata?: {
        createdDate?: Date;
        updatedDate?: Date;
        parcelCount?: number;
        propertyTypeDetail?: string;
        ownerOccupied?: boolean;
        mlsAgent?: {
            fullName?: string;
            phone?: string;
            email?: string;
            brokerageName?: string;
            brokeragePhone?: string;
        };
        listCount?: number;
        mailerCount?: number;
        selfManaged?: boolean;
        pushedToBatchDialer?: boolean;
        office?: string;
    };

    leadInteractionHistory?: ISerializedLeadRecord[];
    additionalData?: Record<string, any>;
}


export interface IRealEstateLeadDocument extends Document {
    _id:mongoose.Types.ObjectId
    createdAt:Date;
    updatedAt:Date;
    leadStatus: string;
    leadType: LeadType;
    batchrankScoreCategory?: string;

    property: {
        apn?: string;
        address: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        bedroomCount?: number;
        bathroomCount?: number;
        totalBuildingAreaSqFt?: number;
        yearBuilt?: number;
        estimatedValue?: number;
        arv?: number;

        lotSizeSqFt?: number;
        totalAssessedValue?: number;
        zoningCode?: string;
        lastSaleDate?: Date;
        lastSalePrice?: number;
        mlsStatus?: string;
        mlsListingDate?: Date;
        mlsListingAmount?: number;
    };

    owner: {
        firstName?: string;
        lastName?: string;
        phones: { number: string; type?: string }[];
        emails: string[];
    }[];

    loanInfo?: {
        loanEstBalance?: number;
        loanEstPayment?: number;
        loanEstInterestRate?: number;
        loanRecordingDate?: Date;
        loanType?: string;
        loanAmount?: number;
        loanLenderName?: string;
        loanDueDate?: Date;
        loanTermMonths?: number;
        totalLoanBalance?: number;
        ltvCurrentEstimatedCombined?: number;
    };

    foreclosureInfo?: {
        documentType?: string;
        status?: string;
        auctionDate?: Date;
        defaultDate?: Date;
        recordingDate?: Date;
        caseNumber?: string;
        trusteeOrAttorney?: string;
    };

    investmentHighlight?: {
        equityCurrentEstimatedBalance?: number;
        notes?: string;
        spread?: number;
        percentARV?: number;
        tagNames?: string;
    };

    mailingInfo?: {
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        county?: string;
        isMailingVacant?: boolean;
        isVacant?: boolean;
        isLitigator?: boolean;
        optOut?: boolean;
    };

    metadata?: {
        createdDate?: Date;
        updatedDate?: Date;
        parcelCount?: number;
        propertyTypeDetail?: string;
        ownerOccupied?: boolean;
        mlsAgent?: {
            fullName?: string;
            phone?: string;
            email?: string;
            brokerageName?: string;
            brokeragePhone?: string;
        };
        listCount?: number;
        mailerCount?: number;
        selfManaged?: boolean;
        pushedToBatchDialer?: boolean;
        office?: string;
    };

    leadInteractionHistory?: LeadRecordDocument[];
    additionalData?: Record<string, any>;
}

export interface RealEstateLeadDocument {
    leadType: LeadType;
    leadStatus: string;
    batchrankScoreCategory?: string;
    property: IProperty;
    owner: IOwnerContact[];
    loanInfo?: ILoanInfo;
    foreclosureInfo?: IForeclosureInfo;
    investmentHighlight?: IInvestmentHighlight;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}





export type LeadActionType = 'call' | 'text' | 'email' | 'voicemail' | 'note' | 'other';

export interface ILeadRecord {
    userId: mongoose.Types.ObjectId;
    actionType: LeadActionType;
    timestamp: Date;
    note?: string;
    callCount?: number;
    leadSnapshot: IRealEstateLead;
    metadata?: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ICleanLeadRecord {
    _id?: string;
    userId: string;
    actionType: LeadActionType;
    timestamp: string;
    note?: string;
    callCount?: number;
    leadSnapshot: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
}



export interface LeadInteractionPayload {
    leadId: string;
    user: IUser;
    actionType: LeadActionType;
    note?: string;
    metadata?: Record<string, unknown>;
    callCount?: number;
    timestamp?: Date;
}

export interface ISerializedLeadRecord {
    _id: string;
    userId: string;
    actionType: "call" | "text" | "email" | "voicemail" | "note" | "other";
    timestamp: string;
    note?: string;
    callCount?: number;
    leadSnapshot: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}
