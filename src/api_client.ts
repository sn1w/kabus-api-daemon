import { API_HOST } from "../config"
import { AuthApi, RequestRegisterSymbols, RegisterApi, InfoApi } from "./types/kabusapi"

export class APIClient {
    /**
     * API実行に必要なトークンを取得。
     * @param password 
     * @returns 
     */
    fetchToken = async (password: string) => {
        const auth = new AuthApi(undefined, API_HOST)
        const response = await auth.tokenPost({
            "APIPassword": password
        })

        return response.data
    }

    /**
     * WebSocketで受信する銘柄のリストを登録する。
     * @param token 
     * @param symbols 
     */
    registerSymbols = async (token: string, symbols: RequestRegisterSymbols[]) => {
        const register = new RegisterApi(undefined, API_HOST)
        await register.registerPut(token, {
            Symbols: symbols
        })
    }

    /**
     * 現在の残高を取得。
     * @param token 
     * @returns 
     */
    fetchPositions = async (token: string) => {
        const info = new InfoApi(undefined, API_HOST)
        const positions = await info.positionsGet(token, "0")
        return positions
    }

    /**
     * 指定した銘柄の現在価格を取得。
     * @param token 
     * @param symbol 
     * @returns 
     */
    fetchBoard = async (token: string, symbol: string) => {
        const info = new InfoApi(undefined, API_HOST)
        // FIXME: 東証指定
        const board = await info.boardGet(token, `${symbol}@1`)
        return board.data
    }
}