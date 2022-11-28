'use strict';

// メモを画面上に表示する　'user_name=入力されたユーザ名','message=入力された内容'
function memo() {
    // ユーザ名を取得
    const userName = $('#user_name').val();

    //テキストエリアの情報を取得
    const textarea = document.getElementById('message');

    // 入力されたメモを取得
    const memo = $('#message').val();//const memo = document.getElementById('message').value; //別の取得方法？

    //内容が空なら警告
    if (!memo){
        alert('empty!!!')
    }
    //テキストエリアを空にする
    textarea.value = '';

    // メモの内容を表示
    $('#thread').prepend('<p>' + memo + '</p>');

    return false;
}
