# Kabu Station Client
[kabuステーション](https://kabu.com/kabustation/) のAPIと連携するnode.jsのクライアントです。

<br/>

# インストール
```
$ yarn install
```
<br/>

# 起動
```
$ yarn serve
```
<br/>

# 環境変数
以下の環境変数を利用することができます。

<br/>

| 変数名 | 必須 | 説明 | デフォルト値 |
| ---   | --- | --- | --- |
| KABUSAPI_PASSWORD | true | kabuステーションのAPIパスワード | - |
| KABUSAPI_HOST | false | kabuステーションのエンドポイントURL | `localhost:18080` |
| USE_HTTPS | false | https / wssプロトコルを使用するか否か | `false` |
<br/>

# モデル情報の更新
OpenAPIのドキュメント情報を元に、API通信クラス / 型情報を自動生成しています。
```
$ yarn generate-client
```

