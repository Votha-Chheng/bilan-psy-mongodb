"use server"

import { AuthenticatedUser, SignInCredentials, SignUpCredentials } from "@/@types/UserTypes"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { auth } from "@/utils/auth"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { SignInCredentialsSchema, SignUpCredentialsSchema } from "@/zodSchemas/userSchemas"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"

export const signInAction = async(prevState: ServiceResponse<any>, formData: FormData): Promise<ServiceResponse<AuthenticatedUser|null>>=> {
  const rawData = Object.fromEntries(formData)
  const response = validateWithZodSchema(SignInCredentialsSchema, rawData)

  if(!response.success) return validationError(response)

  const body = response.data as SignInCredentials

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: body.email,
        password: body.password
      }
    })
  
    if(!response.user.id) return dataBaseError("Identifiants erronés")
    return {
      success: true,
      data: response.user
    }
    
  } catch (error) {
    return serverError(error)
  }
}

export const signUpAction = async(prevState: ServiceResponse<any>, formData: FormData): Promise<ServiceResponse<AuthenticatedUser|null>>=> {
  const rawData = Object.fromEntries(formData)
  const response = validateWithZodSchema(SignUpCredentialsSchema, rawData)
  const body = response.data as SignUpCredentials

  try {
   const response = await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    if(!response.user.id) return dataBaseError("Identifiants erronés")
    return {
      success: true,
      data: response.user
    }
  } catch (error) {
    console.log(error)
    return serverError(error)
  }
}