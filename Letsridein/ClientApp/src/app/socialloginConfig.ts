import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';

export function getAuthServiceConfigs() :AuthServiceConfig {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("220033811216-rp8rrk2dgl2dj2r9lvii96orjvc6nig6.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("659854637808754")
    }
    
  ]);


  return config;
}
