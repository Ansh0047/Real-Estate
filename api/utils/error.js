// to handle manual error like short length passwords
export const errorHandler = (statusCode,message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};