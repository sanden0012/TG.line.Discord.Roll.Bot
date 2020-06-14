"use strict";
try {
    const mongoose = require('mongoose');
    var rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    var gameName = function () {
        return '(公測中)TEST .TEST (add del show 自定關鍵字)'
    }
    var gameType = function () {
        return 'trpgDatabase:hktrpg'
    }
    var prefixs = function () {
        return [{
            first: /(^[.]TEST$)/ig,
            second: null
        }]
    }
    var getHelpMessage = function () {
        return "【資料庫功能】" + "\
        \n 這是根據關鍵字來顯示數據的,\
        \n 例如輸入 .db add 九大陣營 守序善良 (...太長省略) 中立邪惡 混亂邪惡 \
        \n 再輸入.db 九大陣營  守序善良 (...太長省略) 中立邪惡 混亂邪惡\
        \n add 後面第一個是關鍵字, 可以是漢字,數字,英文及emoji\
        \n P.S.如果沒立即生效 用.db show 刷新一下\
    \n 輸入.db add (關鍵字) (內容)即可增加關鍵字\
    \n 輸入.db show 顯示所有關鍵字\
    \n 輸入.db del(編號)或all 即可刪除\
    \n 輸入.db  (關鍵字) 即可顯示 \
    \n 如使用輸入.dbp 會變成全服版,全服可看, 可用add show功能 \
    \n "
    }
    var initialize = function () {
        return rply;
    }

    var rollDiceCommand = async function (inputStr, mainMsg, groupid, userid, userrole, botname, displayname, channelid) {

        rply.text = '';
        switch (true) {
            case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
                rply.text = this.getHelpMessage();
                return rply;

                // .DB(0) ADD(1) TOPIC(2) CONTACT(3)
            case /(^[.]db$)/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[2]):
                //add
                break;

            case /(^[.]db$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^all$/i.test(mainMsg[2]):
                //刪除資料庫

                return rply;
            case /(^[.]db$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^\d+$/i.test(mainMsg[2]):
                //刪除資料庫

                return rply;

            case /(^[.]db$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
                //顯示
                //顯示資料庫
                var kittySchema = new mongoose.Schema({
                    name: String
                  });
                  var Kitten = mongoose.model('Kitten', kittySchema);
                  var silence = new Kitten({ name: 'Silence' });
                  console.log(silence.name); // 'Silence'
                  
                return rply
            case /(^[.]db$)/i.test(mainMsg[0]) && /\S/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[1]):
                //顯示關鍵字
                //let times = /^[.]db/.exec(mainMsg[0])[1] || 1
                //if (times > 30) times = 30;
                //if (times < 1) times = 1
                //console.log(times)
                return rply;
            default:
                break;

        }
    }


    module.exports = {
        rollDiceCommand: rollDiceCommand,
        initialize: initialize,
        getHelpMessage: getHelpMessage,
        prefixs: prefixs,
        gameType: gameType,
        gameName: gameName
    };
} catch (e) {
    console.log(e)
}