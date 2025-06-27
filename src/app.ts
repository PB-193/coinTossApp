// 要素を取得
const coinContainer = document.querySelector('.coin-container') as HTMLDivElement
const coin = document.querySelector('.coin') as HTMLDivElement
const resultDiv = document.getElementById('result') as HTMLDivElement
const tossButton = document.getElementById('tossButton') as HTMLButtonElement
const option1Input = document.getElementById('option1') as HTMLInputElement
const option2Input = document.getElementById('option2') as HTMLInputElement
const coinFront = document.querySelector('.coin-face.coin-front') as HTMLDivElement
const coinBack = document.querySelector('.coin-face.coin-back') as HTMLDivElement
const colorButtons = document.querySelectorAll('.color-btn') as NodeListOf<HTMLButtonElement>

// カラーパレット
const colors = {
  red: {
    gradient: 'linear-gradient(45deg, #ff0000, #ff6b6b)',
    border: '#cc0000',
    button: '#ff0000',
  },
  blue: {
    gradient: 'linear-gradient(45deg, #0066ff, #66b3ff)',
    border: '#003d99',
    button: '#0066ff',
  },
  green: {
    gradient: 'linear-gradient(45deg, #00cc00, #66ff66)',
    border: '#008800',
    button: '#00cc00',
  },
  purple: {
    gradient: 'linear-gradient(45deg, #9933ff, #cc66ff)',
    border: '#6600cc',
    button: '#9933ff',
  },
  orange: {
    gradient: 'linear-gradient(45deg, #ff8800, #ffaa44)',
    border: '#cc5500',
    button: '#ff8800',
  },
}

// 現在選択されている色
let currentColor: string = 'red'

// 色の適用関数
function applyColor(colorName: string) {
  const color = colors[colorName as keyof typeof colors]
  // コインの色を変更
  coinFront.style.background = color.gradient
  coinFront.style.borderColor = color.border
  coinBack.style.background = color.gradient
  coinBack.style.borderColor = color.border

  // ボタンの色を変更
  tossButton.style.backgroundColor = color.button
}

// カラーボタンのイベントリスナーを設定
colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // 選択状態を更新
    colorButtons.forEach((btn) => btn.classList.remove('selected'))
    button.classList.add('selected')

    // 色を適用
    const colorName = button.getAttribute('data-color') as string
    currentColor = colorName
    applyColor(colorName)
  })
})

// 初期色を設定
document.addEventListener('DOMContentLoaded', () => {
  colorButtons[0].classList.add('selected') // 最初の色（赤）を選択状態に
  applyColor(currentColor)
})

// スワイプ操作の状態を管理する変数
let startY: number = 0
let startTime: number = 0
let isFlipping: boolean = false

// コイントスの結果を決定する関数
function tossCoin(): string {
  const option1 = option1Input.value.trim() || '表'
  const option2 = option2Input.value.trim() || '裏'
  return Math.random() < 0.5 ? option1 : option2
}

// コインのアニメーション状態を管理
interface CoinState {
  result: string
  rotations: number
  duration: number
}

// コインをアニメーションさせる関数
function flipCoin(velocity: number): CoinState {
  const result = tossCoin()
  // 速度に基づいて回転数を計算（最小3回転、最大6回転）
  const baseRotations = 3
  const additionalRotations = Math.min(Math.abs(velocity) / 1000, 3)
  const rotations = baseRotations + additionalRotations

  // 速度に基づいてアニメーション時間を計算（最小0.6秒、最大1.2秒）
  const duration = 0.6 + additionalRotations * 0.2

  return { result, rotations, duration }
}

// タッチイベントのハンドラーを設定
coinContainer.addEventListener('touchstart', (e: TouchEvent) => {
  if (isFlipping) return
  startY = e.touches[0].clientY
  startTime = Date.now()
})

coinContainer.addEventListener('touchend', (e: TouchEvent) => {
  if (isFlipping) return

  const endY = e.changedTouches[0].clientY
  const endTime = Date.now()

  // スワイプの速度を計算
  const distance = startY - endY
  const time = endTime - startTime
  const velocity = (distance / time) * 1000 // ピクセル/秒

  // 最小スワイプ速度のチェック
  if (Math.abs(velocity) < 200) return

  isFlipping = true
  const { result, rotations, duration } = flipCoin(velocity)

  // アニメーション中は入力を無効化
  option1Input.disabled = true
  option2Input.disabled = true
  tossButton.disabled = true // ボタンを無効化

  // 投げ上げアニメーションを追加
  coinContainer.classList.add('throwing')

  // コインの表示を更新
  const option1 = option1Input.value.trim() || '表'
  const option2 = option2Input.value.trim() || '裏'
  coinFront.textContent = option1
  coinBack.textContent = option2

  // コインのアニメーションを設定
  coin.style.transition = `transform ${duration}s ease-out`
  coin.style.transform = `rotateY(${rotations * 360 + (result === option2 ? 180 : 0)}deg)`

  // アニメーション終了時の処理
  setTimeout(() => {
    resultDiv.textContent = result
    isFlipping = false
    coinContainer.classList.remove('throwing')
    // アニメーション終了後に入力を再度有効化
    option1Input.disabled = false
    option2Input.disabled = false
    tossButton.disabled = false // ボタンを有効化
  }, duration * 1000)
})

// アニメーション終了時のイベントリスナー
coin.addEventListener('transitionend', () => {
  coin.style.transition = 'none'
})

// ボタンクリックでコイントスを実行
tossButton.addEventListener('click', () => {
  if (isFlipping) return

  isFlipping = true
  const { result, rotations, duration } = flipCoin(500) // 固定の速度でフリップ

  // アニメーション中は入力を無効化
  option1Input.disabled = true
  option2Input.disabled = true
  tossButton.disabled = true // ボタンを無効化

  // 投げ上げアニメーションを追加
  coinContainer.classList.add('throwing')

  // コインの表示を更新
  const option1 = option1Input.value.trim() || '表'
  const option2 = option2Input.value.trim() || '裏'
  coinFront.textContent = option1
  coinBack.textContent = option2

  // コインのアニメーションを設定
  coin.style.transition = `transform ${duration}s ease-out`
  coin.style.transform = `rotateY(${rotations * 360 + (result === option2 ? 180 : 0)}deg)`

  // アニメーション終了時の処理
  setTimeout(() => {
    resultDiv.textContent = result
    isFlipping = false
    coinContainer.classList.remove('throwing')
    // アニメーション終了後に入力を再度有効化
    option1Input.disabled = false
    option2Input.disabled = false
    tossButton.disabled = false // ボタンを有効化
  }, duration * 1000)
})
