import "next-auth";
import "next-auth/jwt";
import type { User } from "@/src/gen/types";

declare module "next-auth" {
  interface IUser {
    data: {
      token: string;
      user: User;
    };
  }

  interface JWT {
    token: string;
    user: User;
  }

  interface Session {
			token: string;
			user: User;
  }
}