export class AuthResponse {
    constructor(
        public token_type = '',
        public expires_in = '',
        public access_token = '',
    ) {}
}
