# App-Template SSO Microservice

## Usage

**Environment Variables**

| Name              | Description                                               | Required | Default          |
| ----------------- | --------------------------------------------------------- | -------- | ---------------- |
| SECRET_KEY        | The secret key used to sign data                          | NO       | super-secret-key |
| API_HOST          | The hostname of the API Server                            | NO       | api              |
| API_SHARED_SECRET | API Shared secret key for internal local GraphQL Requests | NO       | super-secret-key |
| UI_SHARED_SECRET  | UI Shared secret key used to sign the cookie              | NO       | super-secret-key |
| METADATA_FILE     | Path the the Identity Provider XML Metadata file          | NO       | /metadata.xml    |
| DOMAIN            | Public domain for the SSO Server. (MUST BE HTTPS)         | YES      | example.com      |
