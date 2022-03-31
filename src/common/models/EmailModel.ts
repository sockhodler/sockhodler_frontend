interface EnvelopeType {
  from: string;
  to: string[];
}
export interface SendEmailPayload {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: EnvelopeType;
  messageId: string;
}

export interface SendEmailParams {
  publicAddress: string;
  username: string;
  email: string;
  nftName: string;
  asaId: string;
}
