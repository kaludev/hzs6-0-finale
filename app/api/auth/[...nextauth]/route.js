import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

import { connectToDB } from "@utils/database";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user._id = sessionUser._id.toString();
      session.user.image = sessionUser.image.toString();
      session.user.username = sessionUser.username;
      session.user.name = sessionUser.name;
      session.user.isOrganizer = isOrganizer;
      session.user.isSuperAdmin = sessionUser.isSuperAdmin;
      const existingReq = await OrganizerRequest.findOne({
        user_id: sessionUser._id
      })
      if(existingReq){
        session.user.requestedOrganizer = true;
      }else{
        session.user.requestedOrganizer = false;
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            name:profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST ,authOptions};
