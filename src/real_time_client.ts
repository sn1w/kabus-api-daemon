import WebSocket from "ws"
import { BoardSuccess } from "./types/kabusapi";
import { getLogger } from "log4js";
import { WS_HOST } from "../config";

const log = getLogger()

/**
 * Wrapper of WebSocket Connection
 */
export class RealTimeClient {
    onNewMessage?: (message: BoardSuccess) => void;

    connect(): Promise<void> {
        return new Promise((resolv, reject) => {
            const client = new WebSocket(`${WS_HOST}/kabusapi/websocket`)

            client.on('open', () => {
                log.info("websocket connection opened.")
            })

            client.on('message', (data) => {
                const payload = data.toString("utf-8")

                if (this.onNewMessage) {
                    const json = JSON.parse(payload)
                    this.onNewMessage(json)
                }
            })

            client.on('error', (error) => {
                log.error("error occured. error = %s", error)
                reject(error)
            })

            client.on('close', (data) => {
                log.info("websocket connection closed. code = %d", data)
                resolv()
            })
        })
    }
}