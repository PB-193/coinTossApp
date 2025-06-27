export const awsConfig = {
  // 環境変数から認証情報を取得するのみで、実際の値は含めない
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-1',
}
