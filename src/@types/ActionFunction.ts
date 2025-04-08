import { ServiceResponse } from "./ServiceResponse";

export type ActionFunction = (
  prevState: any,
  formData: FormData
) => Promise<ServiceResponse<any>>