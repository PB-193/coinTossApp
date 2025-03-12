// src/app.ts

// ボタンと結果表示エリアを取得
const flipButton = document.getElementById('flipButton') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

// コイントスを実行する関数
function tossCoin(): string {
    // Math.random() で 0 または 1 を生成
    return Math.random() < 0.5 ? '表' : '裏';
}

// ボタンがクリックされたときのイベント
flipButton.addEventListener('click', () => {
    const result = tossCoin();
    resultDiv.textContent = result;
});
