import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        'GOOGLE_CLIENT_ID_PLACEHOLDER',
      clientSecret: 'GOOGLE_CLIENT_SECRET_PLACEHOLDER',
      callbackURL: 'http://localhost:4000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails } = profile;

    const user = {
      email: emails?.[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
    };

    return user;
  }
}
