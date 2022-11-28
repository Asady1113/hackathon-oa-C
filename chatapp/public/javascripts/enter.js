// 'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
if (!userName) {
    alert('name is empty !')
}

socket.emit('enterEvent', userName);

//btn_1を非表示
document.getElementById('btn_back').style.display = 'none'

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (message) {
    $('#thread').prepend('<p>' + message + '</p>');
});

socket.on('sendUsers', function (users) {
    console.log(users);
    editModal(users)
});

function editModal(users) {
    //現在のユーザーを取得
    const currentUser = document.getElementById('userName').value;
    console.log(currentUser);

    let displayUsers = [];
    //自分のユーザー名を排除
    for(let i = 0; i<=3; i++) {
       if(users[i] != currentUser) {
          displayUsers.push(users[i]);
       }
    }

    //ラジオボタンに表示
    document.getElementById('firstRadio').value = displayUsers[0];
    document.getElementById('secondRadio').value = displayUsers[1];
    document.getElementById('thirdRadio').value = displayUsers[2];

    document.getElementById('firstUser').textContent = displayUsers[0];
    document.getElementById('secondUser').textContent = displayUsers[1];
    document.getElementById('thirdUser').textContent = displayUsers[2];
}   

// result サーバから受信した結果の文章を画面上に表示する
socket.on('ResultMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
    //退室するためのボタンを表示
    document.getElementById('btn_back').style.display = 'inline'
});
