export const ErrorCode = {
  ResponseInvalid: 4000,
} as const;

type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export class APIError extends Error {
  public constructor(public code: ErrorCode, message: string) {
    super(message);
  }
}
