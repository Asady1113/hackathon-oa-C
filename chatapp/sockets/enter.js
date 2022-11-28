'use strict';
global.users = [];
global.theme = ['動物園', '動物園', '水族館', '動物園'];
global.wolf = [false, false, true, false];

module.exports = function (socket) {
    // 入室メッセージを全員に送信し，入室したユーザにお題を送信する
    socket.on('enterEvent', function (userName) {
        socket.broadcast.emit('receiveEnterEvent', userName + 'さんが入室しました');
        socket.emit('receiveEnterEvent',  "あなたのお題は" + theme[users.length] + "です");
        users.push(userName);

        //入室したユーザーの情報を入室前画面に送信
        socket.broadcast.emit('sendEnteringUsers',users);

        if (users.length == 4) {
            // 通知
            socket.emit('receiveEnterEvent', '4人が入室したのでワードウルフを始めます');
            socket.broadcast.emit('receiveEnterEvent', '4人が入室したのでワードウルフを始めます');

            socket.emit('sendUsers', users);
            socket.broadcast.emit('sendUsers', users);    
        }
    });
};
