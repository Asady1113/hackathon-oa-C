'use strict';

let WhoVoted = [];

// // 最頻値(最も投票された回数の多いプレイヤー)算出
Array.prototype.mode = function () {
    if (this.length === 0){
        //配列の個数が0だとエラーを返す。
        throw new Error("配列の長さが0のため最頻値が計算できません");
        //nullを返しても困らない時(配列の中にnullが無い時)はnullを返すように実装しても良い。
        //return null
    }
    //回数を記録する連想配列
    var counter = {};
    //本来の値を入れた辞書
    var nativeValues = {};

    //最頻値とその出現回数を挿入する変数
    var maxCounter = 0;
    var maxValues = null;

    for (var i = 0; i < this.length; i++) {
        //counterに存在しなければ作る。keyは型を区別する
        if (!counter[this[i] + "_" + typeof this[i]]) {
            counter[this[i] + "_" + typeof this[i]] = 0;
        }
        counter[this[i] + "_" + typeof this[i]]++;
        nativeValues[this[i] + "_" + typeof this[i]] = this[i];

    }
    for (var j = 0; j < Object.keys(counter).length; j++) {
        let key = Object.keys(counter)[j];
        if (counter[key] > maxCounter) {
            maxCounter = counter[key];
            maxValues = [nativeValues[key]];
        }
        else if (counter[key] == maxCounter) {
            maxValues.push(nativeValues[key]);
        }
    }

    return maxValues;

}

module.exports = function (socket, io) {
    socket.on('sendVotedResult', function (checkValue) {
        WhoVoted.push(checkValue);
        console.log(WhoVoted);
        //投票内容を配列に格納（参加者全員分揃うまで）
        if (WhoVoted.length == 4) {
            //変数に最頻値代入
            var MostVotedPlayer = WhoVoted.mode();
            console.log("MostVotedPlayer");
            console.log(MostVotedPlayer);
            //配列初期化
            WhoVoted = [];
            let message = '';

            //結果の文章を条件で変更
            if (MostVotedPlayer.length == 2) {
                message = MostVotedPlayer[0] + 'さんと' + MostVotedPlayer[1] + 'さんを吊ります';
            } else if (MostVotedPlayer.length == 1) {
                message = MostVotedPlayer[0] + 'さんを吊ります';
            } else {
                console.log(MostVotedPlayer);
                message = '誰も吊られませんでした';
            }

            //最終的に出力する文章の決定＆人狼の答え取得
            let answer = users[2];
            let norm_theme = theme[0];
            let wolf_theme = theme[2];

            users = [];

            let resultmessage = message + '<br>今回のゲームはこれで終了です <br>人狼は' + answer + 'さんで,お題は' + wolf_theme + 'でした' + '<br>市民のお題は' + norm_theme + 'でした <br>' + '<br>「退室」ボタンを押してください';
            //表示文章を送信する
            io.sockets.emit('ResultMessageEvent', resultmessage);
        }
    });
};
