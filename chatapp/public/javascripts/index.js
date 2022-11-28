'use strict';

//現在入室しているユーザーを取得
socket.on('sendEnteringUsers', function (enteringUsersArray) {
    let enteringUsers = "";

    //配列を文字列に変換
    enteringUsersArray.forEach((currentValue, index, array) => {
        enteringUsers = enteringUsers + currentValue + "さん ";
    });

    //入室しているユーザーをラベルに表示する
    document.getElementById('enteringUser').textContent = enteringUsers + "が入室しています";
});


// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    // ユーザ名が未入力でないかチェックする
    if (userName.length === 0) {
        alert('ユーザー名を入力してください')
        return
    }

    $('form').submit();
}
