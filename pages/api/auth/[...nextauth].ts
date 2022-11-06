import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { UserProfile } from '../../../utils/types';

const { GITHUB_ID, GITHUB_SECRET, GITHUB_ID_PROD, GITHUB_SECRET_PROD } =
  process.env;

const GITHUB_CLIENT_ID =
  process.env.NODE_ENV === 'production' ? GITHUB_ID_PROD : GITHUB_ID;

const GITHUB_CLIENT_SECRET =
  process.env.NODE_ENV === 'production' ? GITHUB_SECRET_PROD : GITHUB_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
      async profile(profile) {
        await dbConnect();
        const oldUser = await User.findOne({ email: profile.email });
        const userProfile = {
          name: profile.name || profile.login,
          email: profile.email,
          avatar: profile.avatar_url,
          role: 'user',
        };

        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: 'github',
          });
          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }

        return {
          id: profile.id,
          ...userProfile,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user?.email });
      if (user) {
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        } as UserProfile;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/404',
  },
};
export default NextAuth(authOptions);
