{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n","src":"/** @module tfw.css */require( 'tfw.css', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    \nvar RX_NUMBER = /[ \\t\\n\\r]*[+-]?(\\.[0-9]+|[0-9]+(\\.[0-9]+)?)/g;\n\nexports.parseUnit = function(txt) {\n    var c;\n    var mode = 0;\n    for (var i = 0; i < txt.length; i++) {\n        c = txt.charAt(i);\n        if (mode == 0) {\n            if (c == '-' || c == '+' || (c >= '0' && c <= '9')) mode = 1;\n            else if (c == '.') mode = 2;\n            else if (c > ' ') break;\n        }\n        else if (mode == 1) {\n            if (c == '.') mode = 2;\n            else if (c < '0' || c > '9') break;\n        }\n        else if (mode == 2) {\n            if (c < '0' || c > '9') break;\n        }\n    }\n\n    return {\n        v: parseFloat(txt.substr(0, i)),\n        u: txt.substr(i).trim()\n    };\n};\n\n\n  \nmodule.exports._ = _;\n/**\n * @module tfw.css\n * @see module:$\n\n */\n});","zip":"require(\"tfw.css\",function(e,r,t){var i=function(){function r(){return i(t,arguments)}var t={en:{}},i=e(\"$\").intl;return r.all=t,r}();t.parseUnit=function(e){for(var r,t=0,i=0;i<e.length;i++)if(r=e.charAt(i),0==t){if(\"-\"==r||\"+\"==r||r>=\"0\"&&r<=\"9\")t=1;else if(\".\"==r)t=2;else if(r>\" \")break}else if(1==t){if(\".\"==r)t=2;else if(r<\"0\"||r>\"9\")break}else if(2==t&&(r<\"0\"||r>\"9\"))break;return{v:parseFloat(e.substr(0,i)),u:e.substr(i).trim()}},r.exports._=i});\n//# sourceMappingURL=tfw.css.js.map","map":{"version":3,"file":"tfw.css.js.map","sources":["tfw.css.js"],"sourcesContent":["/** @module tfw.css */require( 'tfw.css', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    \nvar RX_NUMBER = /[ \\t\\n\\r]*[+-]?(\\.[0-9]+|[0-9]+(\\.[0-9]+)?)/g;\n\nexports.parseUnit = function(txt) {\n    var c;\n    var mode = 0;\n    for (var i = 0; i < txt.length; i++) {\n        c = txt.charAt(i);\n        if (mode == 0) {\n            if (c == '-' || c == '+' || (c >= '0' && c <= '9')) mode = 1;\n            else if (c == '.') mode = 2;\n            else if (c > ' ') break;\n        }\n        else if (mode == 1) {\n            if (c == '.') mode = 2;\n            else if (c < '0' || c > '9') break;\n        }\n        else if (mode == 2) {\n            if (c < '0' || c > '9') break;\n        }\n    }\n\n    return {\n        v: parseFloat(txt.substr(0, i)),\n        u: txt.substr(i).trim()\n    };\n};\n\n\n  \nmodule.exports._ = _;\n});"],"names":["require","module","exports","_","X","D","arguments","en","intl","all","parseUnit","txt","c","mode","i","length","charAt","v","parseFloat","substr","u","trim"],"mappings":"AAAsBA,QAAS,UAAW,SAASA,EAASC,EAAQC,GAAW,GAAIC,GAAE,WAA+C,QAASA,KAAI,MAAOC,GAAEC,EAAEC,WAA5D,GAAID,IAAGE,OAASH,EAAEJ,EAAQ,KAAKQ,IAAiD,OAARL,GAAEM,IAAIJ,EAASF,IAIvLD,GAAQQ,UAAY,SAASC,GAGzB,IAAK,GAFDC,GACAC,EAAO,EACFC,EAAI,EAAGA,EAAIH,EAAII,OAAQD,IAE5B,GADAF,EAAID,EAAIK,OAAOF,GACH,GAARD,GACA,GAAS,KAALD,GAAiB,KAALA,GAAaA,GAAK,KAAOA,GAAK,IAAMC,EAAO,MACtD,IAAS,KAALD,EAAUC,EAAO,MACrB,IAAID,EAAI,IAAK,UAEjB,IAAY,GAARC,GACL,GAAS,KAALD,EAAUC,EAAO,MAChB,IAAID,EAAI,KAAOA,EAAI,IAAK,UAE5B,IAAY,GAARC,IACDD,EAAI,KAAOA,EAAI,KAAK,KAIhC,QACIK,EAAGC,WAAWP,EAAIQ,OAAO,EAAGL,IAC5BM,EAAGT,EAAIQ,OAAOL,GAAGO,SAMzBpB,EAAOC,QAAQC,EAAIA"},"dependencies":["mod/$"]}