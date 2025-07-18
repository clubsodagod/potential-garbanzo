import { IUser } from "@/_database/models/user.model";
import mongoose, {Document} from "mongoose";

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
    loanRecordingDate?: Date|string;
    loanType?: string;
    loanAmount?: number;
    loanLenderName?: string;
    loanDueDate?: Date|string;
    loanTermMonths?: number;
    totalLoanBalance?: number;
}

export interface IForeclosureInfo {
    documentType?: string;
    status?: string;
    auctionDate?: Date|string;
    defaultDate?: Date|string;
    recordingDate?: Date|string;
    caseNumber?: string;
    trusteeOrAttorney?: string;
}

export interface IInvestmentHighlight {
    equityCurrentEstimatedBalance?: number;
    notes?: string;
}

export interface IRealEstateLead {
    _id?:string;
    leadType: LeadType;
    leadStatus: string;
    batchrankScoreCategory?: string;
    property: IProperty;
    owner: IOwnerContact[];
    loanInfo?: ILoanInfo;
    foreclosureInfo?: IForeclosureInfo;
    investmentHighlight?: IInvestmentHighlight;
    createdAt?: Date|string;
    updatedAt?: Date|string;
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
    createdAt?: Date|string;
    updatedAt?: Date|string;
}
export interface IRealEstateLeadDocument extends Document {
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
export interface ICleanLeadRecord {
    _id?:string;
    userId: string;               
    actionType: LeadActionType;
    timestamp: string;
    note?: string;
    callCount?: number;
    leadSnapshot: IRealEstateLead;         
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