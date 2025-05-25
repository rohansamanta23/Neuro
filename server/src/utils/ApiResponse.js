class ApiResponse {
    constructor(data,statusCode=200, message="success", success=true) {
        this.data = data;
        this.statusCode = statusCode>=200 && statusCode<300;
        this.message = message;
        this.success = success;
        this.errors = null;
    }
}

export { ApiResponse };