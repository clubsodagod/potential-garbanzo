import { IRealEstateLead, LeadType } from '@/_library/types-interfaces-classes/leads';
import * as XLSX from 'xlsx';

/**
 * Parses an Excel file exported from BatchLeads and converts it into an array of `IRealEstateLead` objects.
 *
 * This utility is designed to map each row in the spreadsheet to the internal `IRealEstateLead` schema,
 * including nested subfields such as property information, owner details, loan info, and foreclosure status.
 *
 * @param {File} file - The Excel file (usually `.xlsx` or `.xls`) to be parsed.
 * @param {LeadType} leadType - A tag or enum value that identifies the type/category of these leads (e.g., 'preforeclosure', 'absentee', etc).
 *
 * @returns {Promise<IRealEstateLead[]>} - A promise that resolves to an array of normalized lead objects.
 *
 * @throws {Error} - If the file cannot be parsed or contains invalid/missing required fields.
 *
 * @example
 * const leads = await parseExcelToSuperLeads(fileInput.files[0], LeadType.PREFORECLOSURE);
 */
export const parseExcelToSuperLeads = async (
    file: File,
    leadType: LeadType
): Promise<IRealEstateLead[]> => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet);

    const leads: IRealEstateLead[] = rows.map((row) => {
        const phones = [
            row['Phone 1'] && { number: row['Phone 1'], type: row['Phone 1 TYPE'] },
            row['Phone 2'] && { number: row['Phone 2'], type: row['Phone 2 TYPE'] },
            row['Phone 3'] && { number: row['Phone 3'], type: row['Phone 3 TYPE'] },
            row['Phone 4'] && { number: row['Phone 4'], type: row['Phone 4 TYPE'] },
            row['Phone 5'] && { number: row['Phone 5'], type: row['Phone 5 TYPE'] },
        ].filter(Boolean);

        const owner = [
            {
                firstName: row['First Name'],
                lastName: row['Last Name'],
                phones,
                emails: [row['Email'], row['Email 2']].filter(Boolean),
            },
            ...(row['Owner 2 First Name'] || row['Owner 2 Last Name']
                ? [
                    {
                        firstName: row['Owner 2 First Name'],
                        lastName: row['Owner 2 Last Name'],
                        phones: [],
                        emails: [],
                    },
                ]
                : []),
        ];

        const lead: IRealEstateLead = {
            leadStatus: row['Lead Status'],
            batchrankScoreCategory: row['Batchrank Score Category'],
            property: {
                apn: row['Apn'],
                address: row['Property Address'],
                city: row['Property City'],
                state: row['Property State'],
                zip: row['Property Zip'],
                county: row['Property County'],
                bedroomCount: row['Bedroom Count'],
                bathroomCount: row['Bathroom Count'],
                totalBuildingAreaSqFt: row['Total Building Area Square Feet'],
                yearBuilt: row['Year Built'],
                estimatedValue: row['Estimated Value'],
                arv: row['ARV'],
            },
            owner,
            loanInfo: {
                loanEstBalance: row['Loan Est Balance'],
                loanEstPayment: row['Loan Est Payment'],
                loanEstInterestRate: row['Loan Est Interest Rate'],
                loanRecordingDate: row['Loan Recording Date'] ? new Date(row['Loan Recording Date']) : undefined,
                loanType: row['Loan Type'],
                loanAmount: row['Loan Amount'],
                loanLenderName: row['Loan Lender Name'],
                loanDueDate: row['Loan Due Date'] ? new Date(row['Loan Due Date']) : undefined,
                loanTermMonths: row['Loan Term (Months)'],
                totalLoanBalance: row['Total Loan Balance'],
            },
            foreclosureInfo: {
                documentType: row['Foreclosure Document Type'],
                status: row['Foreclosure Status'],
                auctionDate: row['Foreclosure Auction Date'] ? new Date(row['Foreclosure Auction Date']) : undefined,
                defaultDate: row['Foreclosure Loan Default Date'] ? new Date(row['Foreclosure Loan Default Date']) : undefined,
                recordingDate: row['Foreclosure Recording Date'] ? new Date(row['Foreclosure Recording Date']) : undefined,
                caseNumber: row['Foreclosure Case Number'],
                trusteeOrAttorney: row['Foreclosure Trustee/Attorney Name'],
            },
            investmentHighlight: {
                equityCurrentEstimatedBalance: row['Equity Current Estimated Balance'],
                notes: row['Notes'],
            },
            leadType, // Injected from function argument
        };

        return lead;
    });

    return leads;
};
