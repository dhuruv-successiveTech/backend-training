import helmet from "helmet";

class HeaderSecurity {
  private static instance: HeaderSecurity;

  public static getInstance(): HeaderSecurity {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public Helmet() {
    return helmet({
      noSniff: true,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
      referrerPolicy: {
        policy: "no-referrer",
      },
      crossOriginResourcePolicy: { policy: "same-origin" },
      hsts: {
        maxAge: 15552000,
        includeSubDomains: true,
      },
    });
  }
}

export default HeaderSecurity.getInstance();



