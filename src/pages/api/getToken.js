const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const options = {
  method: "POST",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
        "base64"
      ),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  }),
};

export default async function handler(req, res) {
  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    options
  );
  const data = await response.json();
  res.status(200).json({ access_token: data.access_token });
}
