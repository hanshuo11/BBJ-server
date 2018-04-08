var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

window.postJSON = function (url, data) {
    return require('superagent')
        .post('/api' + url)
        .send(data)
}

window.fetchGet = function (url, data, api) {
    if (api) {
        return require('superagent')
            .get('/api' + url)
            .query(data)

    } else {
        return require('superagent')
            .get(url)
            .query(data)
    }
}


// cookie的设置
window.getCookie = function (cookieName) {
    var strCookie = document.cookie;

    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
            return eval("(" + arr[1] + ")");
        }
    }
    return "";
}
window.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
window.clearCookie = function clearCookie(name) {
    setCookie(name, "", -1);
}

// export default {
//     getQueryStringByName: function (name) {
//         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//         var r = window.location.search.substr(1).match(reg);
//         var context = "";
//         if (r != null)
//             context = r[2];
//         reg = null;
//         r = null;
//         return context == null || context == "" || context == "undefined" ? "" : context;
//     },
//     formatDate: {
//         format: function (date, pattern) {
//             pattern = pattern || DEFAULT_PATTERN;
//             return pattern.replace(SIGN_REGEXP, function ($0) {
//                 switch ($0.charAt(0)) {
//                     case 'y': return padding(date.getFullYear(), $0.length);
//                     case 'M': return padding(date.getMonth() + 1, $0.length);
//                     case 'd': return padding(date.getDate(), $0.length);
//                     case 'w': return date.getDay() + 1;
//                     case 'h': return padding(date.getHours(), $0.length);
//                     case 'm': return padding(date.getMinutes(), $0.length);
//                     case 's': return padding(date.getSeconds(), $0.length);
//                 }
//             });
//         },
//         parse: function (dateString, pattern) {
//             var matchs1 = pattern.match(SIGN_REGEXP);
//             var matchs2 = dateString.match(/(\d)+/g);
//             if (matchs1.length == matchs2.length) {
//                 var _date = new Date(1970, 0, 1);
//                 for (var i = 0; i < matchs1.length; i++) {
//                     var _int = parseInt(matchs2[i]);
//                     var sign = matchs1[i];
//                     switch (sign.charAt(0)) {
//                         case 'y': _date.setFullYear(_int); break;
//                         case 'M': _date.setMonth(_int - 1); break;
//                         case 'd': _date.setDate(_int); break;
//                         case 'h': _date.setHours(_int); break;
//                         case 'm': _date.setMinutes(_int); break;
//                         case 's': _date.setSeconds(_int); break;
//                     }
//                 }
//                 return _date;
//             }
//             return null;
//         }

//     }

// };
