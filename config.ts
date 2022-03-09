/** definitions */
const HOST = process.env["KABUSAPI_HOST"] || "localhost:18080" 
const API_SCHEME = process.env["USE_HTTPS"] == "true" ? "https" : "http"
const WS_SCHEME = process.env["USE_HTTPS"] == "true" ? "wss" : "ws"

export const API_HOST = `${API_SCHEME}://${HOST}/kabusapi`
export const WS_HOST = `${WS_SCHEME}://${HOST}`
export const PASSWORD = process.env["KABUSAPI_PASSWORD"] || ""