import { ServiceResponse } from "./ServiceResponse";

export type ActionFunction = (
  // eslint-disable-next-line
  prevState: any,
  formData: FormData
  // eslint-disable-next-line
) => Promise<ServiceResponse<any>>