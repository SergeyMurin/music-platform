import process from 'process';

export interface IGoogleDriveConfig {
  key: {
    token_uri: string;
    private_key_id: string;
    client_x509_cert_url: string;
    project_id: string;
    universe_domain: string;
    auth_uri: string;
    auth_provider_x509_cert_url: string;
    client_email: string;
    private_key: string;
    type: string;
    client_id: string;
  };
}

export const GoogleDriveConfig = {
  key: {
    token_uri: process.env.GOOGLE_DRIVE_KEY_TOKEN_URI,
    private_key_id: process.env.GOOGLE_DRIVE_KEY_PRIVATE_KEY_ID,
    client_x509_cert_url: process.env.GOOGLE_DRIVE_KEY_CLIENT_X509_CERT_URL,
    project_id: process.env.GOOGLE_DRIVE_KEY_PROJECT_ID,
    universe_domain: process.env.GOOGLE_DRIVE_KEY_UNIVERSE_DOMAIN,
    auth_uri: process.env.GOOGLE_DRIVE_KEY_AUTH_URI,
    auth_provider_x509_cert_url:
      process.env.GOOGLE_DRIVE_KEY_CLIENT_X509_CERT_URL,
    client_email: process.env.GOOGLE_DRIVE_KEY_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_DRIVE_KEY_PRIVATE_KEY,
    type: process.env.GOOGLE_DRIVE_KEY_TYPE,
    client_id: process.env.GOOGLE_DRIVE_KEY_CLIENT_ID,
  },
};
