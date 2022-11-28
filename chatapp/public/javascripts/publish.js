'use strict';


// 投稿メッセージをサーバに送信する
function publish() {
    //ユーザ名を取得
    const userName = document.getElementById('userName').value;
    //テキストエリアの情報を取得
    const textarea = document.getElementById('message');
    //入力されたメッセージを取得
    const message = textarea.value.replace(/\n/g, '<br>');

    //もしメッセージが空なら
    if (message.length === 0) {
        alert('メッセージを入力してください')
        return
    }

    //ユーザー情報とメッセージを格納
    const sendData = [userName, message];
    // 投稿内容を送信  
    socket.emit('sendMessageEvent', sendData);

    //テキストエリアを空にする
    textarea.value = '';

    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<div class="message"><p class="user">' + data[0] + 'さん:</p><p class="content">' + data[1] + '</p></div>');
});

