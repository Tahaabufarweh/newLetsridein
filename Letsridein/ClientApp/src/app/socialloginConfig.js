"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angularx_social_login_1 = require("angularx-social-login");
function getAuthServiceConfigs() {
    var config = new angularx_social_login_1.AuthServiceConfig([
        {
            id: angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID,
            provider: new angularx_social_login_1.GoogleLoginProvider("220033811216-rp8rrk2dgl2dj2r9lvii96orjvc6nig6.apps.googleusercontent.com")
        },
        {
            id: angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID,
            provider: new angularx_social_login_1.FacebookLoginProvider("659854637808754")
        }
    ]);
    return config;
}
exports.getAuthServiceConfigs = getAuthServiceConfigs;
//# sourceMappingURL=socialloginConfig.js.map