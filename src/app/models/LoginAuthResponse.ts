export class LoginAuthResponse {
    constructor(
        public token_type = '',
        public expires_in = '',
        public access_token = '',
        public refresh_token = '',
    ) {}
}
