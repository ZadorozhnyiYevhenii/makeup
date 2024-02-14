import { gql } from "@apollo/client";

export interface MutationEmailVerification {
  sendEmailVerificationMail: {
    userId: number;
    emailTo: string;
  }
};

export const SEND_EMAIL_VERIFICATION = gql`
  mutation MyMutation($verificationMail: VerificationMail!) {
    sendEmailVerificationMail(verificationMail: $verificationMail) {
      response
    }
  }
`;
