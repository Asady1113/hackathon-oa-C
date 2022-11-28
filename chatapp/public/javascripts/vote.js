//投票機能用のファイルです
'use strict';

function openModal() {
    //modalを開始する
    $('#modal').modal('show');

    return false
}


function vote() {
    //ラジオボタンからの取得
    let elements = document.getElementsByName('wolf');
    let len = elements.length;
    let checkValue = '';

    //ラジオボタンの配列からチェックされているものを取得
    for (let i = 0; i < len; i++){
        if (elements.item(i).checked){
            checkValue = elements.item(i).value;
        }
    }

    if(checkValue.length == 0){
        alert("選択されていません");
        return;
    }

    //投票内容をサーバーに送信
    socket.emit('sendVotedResult', checkValue);


    //投票後はボタンを非表示に
    let voteButton = document.getElementById('voteAction');
    voteButton.value = "投票完了";
    voteButton.disabled = true;
    
    //投票完了をテキスト表示
    let votedTextLabel = document.getElementById('voted_text');
    votedTextLabel.textContent = "あなたは" + checkValue + "に投票しました";

    //modalを閉じる
    $('#modal').modal('hide');

    return false
}
