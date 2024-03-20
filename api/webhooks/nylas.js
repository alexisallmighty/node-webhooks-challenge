// sync-google-calendar-outlook/pages/api/nylas_callback.js
export default function handler(req, res) {
  console.log("req.query.code", req.query.code);

  const client_id = process.env.NYLAS_CLIENT_ID;
  const client_secret = process.env.NYLAS_CLIENT_SECRET;
  const bearerToken = process.env.NYLAS_API_KEY;
  const redirect_uri = process.env.REDIRECT_URI;

  const code = req.query.code;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${bearerToken}`);

  const raw = JSON.stringify({
    code: req.query.code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.us.nylas.com/v3/connect/token", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((userData) => {
      const email = userData.email_address;
      const accessToken = userData.access_token;
    })
    .catch((error) => console.log("error", error));
}
