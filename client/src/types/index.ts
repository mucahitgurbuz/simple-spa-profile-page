export interface CustomError {
  type: string,
  details?: ResponseDetail[]
}

export interface ResponseDetail {
  message: string
}

export interface CustomError {
  type: string,
  details?: ResponseDetail[]
}


export interface Body {
  status: boolean,
  content: any,
  details?: ResponseDetail[]

}

