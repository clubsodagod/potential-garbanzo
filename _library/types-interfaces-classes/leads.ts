import mongoose from "mongoose";

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
    loanRecordingDate?: Date;
    loanType?: string;
    loanAmount?: number;
    loanLenderName?: string;
    loanDueDate?: Date;
    loanTermMonths?: number;
    totalLoanBalance?: number;
}

export interface IForeclosureInfo {
    documentType?: string;
    status?: string;
    auctionDate?: Date;
    defaultDate?: Date;
    recordingDate?: Date;
    caseNumber?: string;
    trusteeOrAttorney?: string;
}

export interface IInvestmentHighlight {
    equityCurrentEstimatedBalance?: number;
    notes?: string;
}

export interface IRealEstateLead {
    leadType: LeadType;
    leadStatus: string;
    batchrankScoreCategory?: string;
    property: IProperty;
    owner: IOwnerContact[];
    loanInfo?: ILoanInfo;
    foreclosureInfo?: IForeclosureInfo;
    investmentHighlight?: IInvestmentHighlight;
    createdAt?: Date;
    updatedAt?: Date;
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
