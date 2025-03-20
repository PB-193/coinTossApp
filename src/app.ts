// コイン関連の要素を取得
const coinContainer = document.querySelector('.coin-container') as HTMLDivElement;
const coin = document.querySelector('.coin') as HTMLDivElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

// スワイプ操作の状態を管理する変数
let startY: number = 0;
let startTime: number = 0;
let isFlipping: boolean = false;

// コイントスの結果を決定する関数
function tossCoin(): string {
    return Math.random() < 0.5 ? '表' : '裏';
}

// コインのアニメーション状態を管理
interface CoinState {
    result: string;
    rotations: number;
    duration: number;
}

// コインをアニメーションさせる関数
function flipCoin(velocity: number): CoinState {
    const result = tossCoin();
    // 速度に基づいて回転数を計算（最小3回転、最大6回転）
    const baseRotations = 3;
    const additionalRotations = Math.min(Math.abs(velocity) / 1000, 3);
    const rotations = baseRotations + additionalRotations;
    
    // 速度に基づいてアニメーション時間を計算（最小0.6秒、最大1.2秒）
    const duration = 0.6 + (additionalRotations * 0.2);
    
    return { result, rotations, duration };
}

// タッチイベントのハンドラーを設定
coinContainer.addEventListener('touchstart', (e: TouchEvent) => {
    if (isFlipping) return;
    startY = e.touches[0].clientY;
    startTime = Date.now();
});

coinContainer.addEventListener('touchend', (e: TouchEvent) => {
    if (isFlipping) return;
    
    const endY = e.changedTouches[0].clientY;
    const endTime = Date.now();
    
    // スワイプの速度を計算
    const distance = startY - endY;
    const time = endTime - startTime;
    const velocity = distance / time * 1000; // ピクセル/秒
    
    // 最小スワイプ速度のチェック
    if (Math.abs(velocity) < 200) return;
    
    isFlipping = true;
    const { result, rotations, duration } = flipCoin(velocity);
    
    // コインのアニメーションを設定
    coin.style.transition = `transform ${duration}s ease-out`;
    coin.style.transform = `rotateY(${rotations * 360 + (result === '裏' ? 180 : 0)}deg)`;
    
    // アニメーション終了時の処理
    setTimeout(() => {
        resultDiv.textContent = result;
        isFlipping = false;
    }, duration * 1000);
});

// アニメーション終了時のイベントリスナー
coin.addEventListener('transitionend', () => {
    coin.style.transition = 'none';
});
