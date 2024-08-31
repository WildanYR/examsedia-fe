const appUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
export default {
  apiUrl: appUrl,
  cdnUrl: `${appUrl}/images/`
}
