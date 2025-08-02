import { SetCredentialsParams } from "./types";

class Storage {
  public setCredentials({ token }: SetCredentialsParams) {
    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
    }
  } 

  public removeCredentials() {
    // localStorage.removeItem("token");
    // localStorage.removeItem("ROLE");
  }

  public getTokens(): { accessToken: string | null } {
    return {
      accessToken: localStorage.getItem("token"),
    };
  }
} 

export const useStorage = new Storage();
