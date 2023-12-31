import {faIdCard, faKey, faRss, faUser} from "@fortawesome/pro-light-svg-icons";
import {userSettingsPaths} from "components/user/user_settings/userSettings.paths";

export const userSettingsTrails = {};

userSettingsTrails.myUserProfile = {
  parent: undefined,
  name: "myUserProfile",
  path: userSettingsPaths.myUserProfile,
  title: "My Profile",
  linkText: "My Profile",
  icon: faIdCard,
  // pageDescription: `
  //     Review and manage your user profile information as well as platform settings from this page.
  //     Please note, profile details are stored in your identify provider so some changes may not be possible from this portal at this time.
  //   `,
};

userSettingsTrails.myUserRecord = {
  parent: "userProfile",
  name: "myUserRecord",
  path: userSettingsPaths.myUserRecord,
  title: "My User Record",
  linkText: "My User Record",
  icon: faUser,
  pageDescription: `
      Review and manage your user profile information as well as platform settings from this page. 
      Please note, profile details are stored in your identity provider, so some changes my not be possible from this portal at this time.
    `,
};

userSettingsTrails.subscriptions = {
  parent: "userProfile",
  name: "subscriptions",
  path: userSettingsPaths.mySubscriptions,
  title: "My Subscriptions",
  linkText: "My Subscriptions",
  icon: faRss,
  pageDescription: `
      Review and manage your user profile information as well as platform settings from this page. 
      Please note, profile details are stored in your identity provider, so some changes my not be possible from this portal at this time.
    `,
};

userSettingsTrails.myAccessTokens = {
  parent: "userProfile",
  name: "myAccessTokens",
  path: userSettingsPaths.myAccessTokens,
  title: "Personal Access Tokens",
  linkText: "Personal Access Tokens",
  icon: faKey,
  pageDescription: `
    You can generate multiple personal access tokens with unique expiration dates in order to interact with the
    Opsera API.`,
};

userSettingsTrails.accessTokenDetailView = {
  parent: "myAccessTokens",
  name: "accessTokenDetailView",
  path: userSettingsPaths.myAccessTokens,
  title: "Access Token Details",
  linkText: "Access Token Details",
  icon: faKey
};