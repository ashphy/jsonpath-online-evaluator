async function handler(event) {
  const request = event.request;
  const uri = request.uri;

  const response = event.response;
  const headers = response.headers;

  if (response.statusCode >= 200 && response.statusCode < 400) {
    if (uri.startsWith("/assets/")) {
      headers["cache-control"] = { value: "public,max-age=31536000" };
    } else {
      headers["cache-control"] = { value: "public,max-age=0,must-revalidate" };
    }
  }

  return response;
}
