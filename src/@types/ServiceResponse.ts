export type ServiceResponse<T> = {
  success?: boolean
  message?: string
  fields?: Record<string, string>
  issues?: string[]
  status?: number
  errors?: {
    path: string,
    message: string
  }[]
  titreToast?:string
  data?: T|null
}