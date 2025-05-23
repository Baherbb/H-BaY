import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { UserAttributes } from '../models/user.model';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from './constants';

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as UserAttributes).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        const profilePicture = profile.photos?.[0]?.value || undefined;

        if (!email) {
          return done(new Error('No email provided from Google'));
        }

        
        let user = await User.findOne({
          where: { google_id: profile.id },
        });

        if (user) {
          if (profilePicture && user.profile_picture !== profilePicture) {
            user.profile_picture = profilePicture;
            user = await user.save();
          }
          return done(null, user);
        }

        
        user = await User.findOne({
          where: { email },
        });

        if (user) {
          user.google_id = profile.id;
          if (profilePicture) {
            user.profile_picture = profilePicture;
          }
          user = await user.save();
          return done(null, user);
        }

      
        const newUser = await User.create({
          name: profile.displayName || email.split('@')[0],
          email,
          google_id: profile.id,
          profile_picture: profilePicture,
          user_type: 'customer',
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;