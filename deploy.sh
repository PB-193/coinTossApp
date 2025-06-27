#!/bin/bash

# エラーが発生したら即座に終了
set -e

# 環境変数の確認
if [ -z "$S3_BUCKET" ]; then
    echo "エラー: 環境変数 S3_BUCKET が設定されていません"
    exit 1
fi

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "エラー: 環境変数 DISTRIBUTION_ID が設定されていません"
    exit 1
fi

echo "ビルドを開始します..."
# TypeScriptのビルド
npm run build

# ビルドが成功したか確認
if [ ! -d "dist" ]; then
    echo "エラー: distディレクトリが生成されていません"
    exit 1
fi

echo "S3へのアップロードを開始します..."
# S3バケット名は環境変数から取得
# CloudFront IDも環境変数から取得

# S3にアップロード
aws s3 sync dist/ s3://$S3_BUCKET --delete

echo "CloudFrontのキャッシュを無効化します..."
# CloudFrontのキャッシュを無効化
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "デプロイが完了しました" 