import { errorMapping } from "./errorMappings";

interface ErrorResponse {
    status: number;
    message: string;
    details?: string;
}

export default function handleError(err: { code: string; message: string; details: string | null; hint: string | null }): ErrorResponse {
    const mappedError = errorMapping[err.code];
    if (mappedError) {
        return {
            status: mappedError.status,
            message: err.message ?? mappedError.message,
            details: err.details ?? mappedError.message
        };
    } else {
        // if not in list, return generic 500 response
        return {
            status: 500,
            message: "Internal Server Error",
            details: err.message
        };
    }
}