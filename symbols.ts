/**
 * 表示する銘柄の規定クラス。
 */
export abstract class WatchSymbol {
    /**
     * 証券コード
     * @example 8306
     */
    symbol: string;

    /**
     * 株式名
     * @example UFJ
     */
    alias: string;

    /**
     * 取引所 (現在は東証のみ対応)
     * @example 1 
     */
    exchange: number;

    /**
     * 現在の株価
     */
    current_price: number = 0;

    constructor(symbol: string, alias: string) {
        this.symbol = symbol
        this.alias = alias
        this.exchange = 1
    }

    updatePrice(current_price: number) {
        this.current_price = current_price
    }

    /**
     * 目標株価
     */
    abstract get wanted(): number

    /**
     * 目標株価との乖離
     */
    abstract get difference(): number
}

/**
 * 保有している銘柄を表すクラス。
 */
export class HoldSymbol extends WatchSymbol {
    /**
     * 購入価格
     */
    private initial_price: number

    /**
     * 目標利益率。
     */
    private profit: number

    constructor(symbol: string, name: string, initial_price: number, profit: number) {
        super(symbol, name)
        this.profit = profit
        this.initial_price = initial_price
    }

    get wanted(): number {
        return this.initial_price * this.profit
    }

    get difference(): number {
        return this.current_price - this.wanted
    }
}

/**
 * 未保有の株価を表すクラス。
 */
export class NonHoldSymbol extends WatchSymbol {
    /**
     * 希望購入価格
     */
    private wanted_price: number;

    constructor(symbol: string, name: string, wanted_price: number) {
        super(symbol, name);
        this.wanted_price = wanted_price
    }

    get wanted(): number {
        return this.wanted_price
    }

    get difference(): number {
        return this.wanted - this.current_price
    }
}