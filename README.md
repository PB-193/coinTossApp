# コイントスアプリ

このプロジェクトは、TypeScript で開発されたシンプルなコイントスアプリです。ブラウザ上で動作し、スマホでも利用可能です。

## 環境構築

### 必要なツール

- **Node.js** (16 以上推奨)
- **npm** (Node.js に付属)
- **Docker (オプション: Dev Container を使用する場合)**
- **VS Code (オプション: Dev Container を使用する場合)**

### インストール手順

1. リポジトリをクローン
   ```sh
   git clone <リポジトリのURL>
   cd <プロジェクトフォルダ>
   ```
2. 必要なパッケージをインストール
   ```sh
   npm install
   ```
3. TypeScript をコンパイル
   ```sh
   npm run build
   ```

## ローカルでの動作確認

### 1. ローカルサーバーを起動

開発環境で簡単に動作確認するために `live-server` を使用します。

#### `live-server` を使用する場合

```sh
npx live-server --port=8080
```

ブラウザで [http://127.0.0.1:8080](http://127.0.0.1:8080) にアクセスして確認してください。

#### `http-server` を使用する場合

```sh
npx http-server -p 8080
```

### 2. スマホからのアクセス方法

スマホからアクセスする場合は `127.0.0.1` ではなく、PC の **ローカル IP アドレス** を使用します。

#### PC のローカル IP アドレスの確認方法

- **Mac/Linux**: ターミナルで以下を実行
  ```sh
  ifconfig | grep "inet " | grep -v 127.0.0.1
  ```
  または
  ```sh
  ip a | grep inet
  ```
- **Windows**: コマンドプロンプトで以下を実行
  ```sh
  ipconfig | findstr IPv4
  ```
  `IPv4 アドレス` に表示されたものがローカル IP アドレスです（例: `192.168.1.10`）。

#### スマホのブラウザでアクセス

スマホが **PC と同じ Wi-Fi ネットワーク** に接続されていることを確認し、ブラウザのアドレスバーに以下を入力。

```
http://<PCのローカルIP>:8080
```

(例: `http://192.168.1.10:8080`)

## Dev Container での開発 (オプション)

VS Code の **Dev Container** を利用することで、統一された開発環境を構築できます。

### 1. Dev Container の設定

プロジェクトルートに `.devcontainer/devcontainer.json` を作成し、以下の内容を追加。

```json
{
  "name": "Coin Toss App",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "appPort": [8080],
  "workspaceFolder": "/app"
}
```

### 2. Dev Container を起動

1. VS Code でプロジェクトを開く
2. コマンドパレット (`Cmd + Shift + P` / `Ctrl + Shift + P`) で `Dev Containers: Open Folder in Container` を実行
3. コンテナが起動したら、以下のコマンドでサーバーを起動
   ```sh
   npm run dev
   ```
4. ブラウザで `http://127.0.0.1:8080` にアクセス

### 3. スマホからのアクセス (Dev Container)

Dev Container 内でサーバーを実行する場合、PC のローカル IP にアクセスするにはポートフォワーディングが必要です。

1. **VS Code のポートフォワード機能を利用**

   - VS Code の **PORTS** タブで `8080` を `公開` に設定
   - スマホから `http://<PCのローカルIP>:8080` にアクセス

2. **Docker のポートマッピングを利用**
   ```sh
   docker run -p 8080:8080 coin-toss-app
   ```

## まとめ

- `npx live-server --port=8080` でローカルサーバーを起動し、ブラウザで確認
- スマホからは `http://<PCのローカルIP>:8080` にアクセス
- Dev Container を利用すると、統一された開発環境で作業可能

以上の手順で、開発環境をセットアップし、スマホからも動作確認ができます。
