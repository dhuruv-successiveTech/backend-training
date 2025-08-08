import helmet from "helmet";

class HeaderSecurity {
  private static instance: HeaderSecurity;

  private constructor() {} 

  public static getInstance(): HeaderSecurity {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public Helmet() {
    return [
      helmet.noSniff(),
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      }),
      helmet.referrerPolicy({ policy: "no-referrer" }),
      helmet.crossOriginResourcePolicy({ policy: "same-origin" }),
      helmet.hsts({
        maxAge: 15552000, // 6 months in seconds
        includeSubDomains: true,
      }),
    ];
  }
}

export default HeaderSecurity.getInstance();
