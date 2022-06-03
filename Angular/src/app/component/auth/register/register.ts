export class register {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public confirmpassword: string,
    ) { }
}

export class registercontrol {
    constructor(
        public firstnameerr: boolean,
        public lastnameerr: boolean,
        public emailerr: boolean,
        public passworderr: boolean,
        public confirmpassworderr: boolean,
        public confirmpassworderrs: boolean,
    ) { }
}