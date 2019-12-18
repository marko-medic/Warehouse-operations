export interface Document {
  _id: number;
  dateOfRecording: string;
  dateOfCreation: string;
  transactionType: string;
  status: string;
  year: number;
  businessPartner: {
    name: string;
    city: string;
    address: string;
  };
}
