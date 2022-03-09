import { getLogger } from "log4js";
import { PASSWORD } from "../config";
import { HoldSymbol, WatchSymbol } from "../symbols";
import { APIClient } from "./api_client";
import { RealTimeClient } from "./real_time_client";

export class KabusApiDaemon {
    private log = getLogger()
    private api = new APIClient()

    private symbols: WatchSymbol[]

    private profit: number

    constructor(symbols: WatchSymbol[], profit: number) {
        this.log.level = "info"
        this.symbols = symbols
        this.profit = profit
    }

    display = (symbols: WatchSymbol[]) => {
        console.clear()
        console.log("updated at: ", new Date().toUTCString())
        symbols.forEach(symbol => {
            const icon = symbol instanceof HoldSymbol ? "[H]" : "[N]"
            const display = symbol.difference > 0 ? '\u001b[33m' : '\u001b[0m'
            console.log(`${display}${icon} [${symbol.symbol}] ${symbol.alias} | price = ${symbol.current_price} | wanted = ${symbol.wanted} | diff = ${symbol.difference}`)
        })
    }

    async start() {
        this.log.info("fetch token from Kabu Station - begin")
        const auth_token = await this.api.fetchToken(PASSWORD)

        const position = await this.api.fetchPositions(auth_token.Token!)
        position.data.forEach(pos => 
            this.symbols.push(new HoldSymbol(pos.Symbol!, pos.SymbolName!, pos.Price!, this.profit))
        )

        // fetch latest board
        this.symbols.forEach(async item => {
            const board = await this.api.fetchBoard(auth_token.Token!, item.symbol)
            item.updatePrice(board.CurrentPrice!)
        })

        this.log.info("register symbols - begin")
        await this.api.registerSymbols(auth_token.Token!, this.symbols.map(x => { return {Exchange: x.exchange, Symbol: x.symbol}}))
        this.log.info("register symbols - end")

        this.display(this.symbols)

        this.log.info("connect to websocket - begin")
        const client = new RealTimeClient()
        client.onNewMessage = (message) => {
            const positions = this.symbols.filter(x => x.symbol == message.Symbol)
            if (positions.length == 0) {
                // ignored
                return
            }

            const matchedPosition = positions[0]
            matchedPosition.updatePrice(message.CurrentPrice!)

            this.display(this.symbols)
        }
        while (true) {
            await client.connect()
        }
    }
}