export const SITENAME = "SSNEC";
export const SITE_DESCRIPTION =
  "Welcome to S.S National Educational Council, a trusted institution dedicated to promoting quality education, skill development, and lifelong learning. We aim to empower students and professionals through innovative programs that contribute to personal growth and national progress.";
export const TITLE_TAGLINE = "Empowering Minds, Enriching Futures.";
export const CONTACT_NUMBER = "9471254191";
export const CONTACT_ADDRESS = "Buxar, Bihar, India";
export const CONTACT_EMAIL = "snecbxr@gmail.com";
export const WHATSAPP_NUMBER = "9471254191";

// server env
export const API_SSR = "https://api.sellio.in/snecindia.com/api/";
export const API_PATH = "https://api.sellio.in/snecindia.com/api/";

// local storage prefix
const LS_PREFIX = "snecindia";
export const LS_USERID = LS_PREFIX + "_userid";
export const LS_USERNAME = LS_PREFIX + "_username";
export const LS_USERROLE = LS_PREFIX + "_userrole";
export const LS_USERTOKEN = LS_PREFIX + "_usertoken";

export const USERDATA = () => {
  if (typeof window === "undefined") return {};
  return {
    userid: localStorage.getItem(LS_USERID),
    username: localStorage.getItem(LS_USERNAME),
    userrole: localStorage.getItem(LS_USERROLE),
    usertoken: localStorage.getItem(LS_USERTOKEN),
  };
};
// social media links
export const SOCIAL_FACEBOOK = "/";
export const SOCIAL_INSTAGRAM = "/";
export const SOCIAL_TWITTER = "/";
export const SOCIAL_LINKEDIN = "/";
export const SELLIO_PROFILE = "/";
export const PRIVACY_POLICY = "/";
export const USES_POLICY = "/";
export const SUPPORT_URL = "/";

export const HERO_BACKGROUND_IMAGE = {
  backgroundImage:
    "linear-gradient(310deg, rgba(18, 18, 18, 0.8), rgba(255, 200, 0, 0.3))",
};

export const STATE_LIST = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export function formatTime(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || 0));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
