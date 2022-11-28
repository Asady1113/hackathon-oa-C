'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('exitEvent', function (userName) {
        socket.broadcast.emit('receiveExitEvent', userName + 'さんが退室しました');
    });
};
