import Database from "./lib/database";

class Server {
  private static instance: Server;

  public static getInstance(): Server {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public init = async (): Promise<void> => {
    await Database.connect();
    await Database.seed2();
  };
}

export default Server.getInstance();
