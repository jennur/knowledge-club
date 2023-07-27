export default function encodeUrl(string) {
  let url = string.toLowerCase();

  return url.replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
}