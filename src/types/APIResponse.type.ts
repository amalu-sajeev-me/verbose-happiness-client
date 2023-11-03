export interface IAPIResponse<Tres = Record<string, unknown>>{
    responseData: Tres;
    status: "failure" | "success",
    message: string;
    statusCode: number
}