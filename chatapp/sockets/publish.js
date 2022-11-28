'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを受信する
    socket.on('sendMessageEvent', function (data) {
        //データがなかったら
        if (!data) {
            return;
        }
        console.log(data,"メッセージの情報");

        //投稿メッセージを送信する
        io.sockets.emit('receiveMessageEvent', data);
    });
};
