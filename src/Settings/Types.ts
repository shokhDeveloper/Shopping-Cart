export type UserType = {
    name?: string,
    lastname?: string,
    email: string,
    password: string,
    date?: string 
    displayName?: string
}
export interface FormValues {
    name?: string,
    lastname?: string,
    email: string,
    password: string
}
export interface ServerResponse  {
    accessToken: string,
    user: UserType
}
type GenericsValue<T> = T | null
export interface ServerGoogleResponse {
    displayName: GenericsValue<string>,
    email: GenericsValue<string>,
    password?: GenericsValue<string>
}
export interface TypeGooglePassword {
    password: string
}
export interface TypeTovar {
    name: string,
    price: number,
    quantity: number,
    image: string,
    id: number
}