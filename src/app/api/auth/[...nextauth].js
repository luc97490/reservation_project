import NextAuth from "next-auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          firstName: "Admin",
          lastName: "ok",
          email: "admin@admin.com",
        };
        return user;
      },
    }),
  ],
});
