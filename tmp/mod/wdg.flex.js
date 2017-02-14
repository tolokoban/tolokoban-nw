{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n","src":"/** @module wdg.flex */require( 'wdg.flex', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * @module wdg.flex\r\n *\r\n * @description\r\n * Simple flex alignement of children.\r\n *\r\n * @example\r\n * var mod = require('wdg.flex');\r\n */\r\nvar $ = require(\"dom\");\r\nvar DB = require(\"tfw.data-binding\");\r\n\r\n\r\nvar ENUM_ORIENTATION = ['H', 'V', 'W', 'N'];\r\nvar ENUM_TYPE = ['default', 'fill'];\r\n\r\n\r\nfunction Flex(opts) {\r\n    var elem = $.elem( this, 'div', 'wdg-flex' );\r\n\r\n    DB.propToggleClass(this, 'orientation', ENUM_ORIENTATION);\r\n    DB.propToggleClass(this, 'type', ENUM_TYPE);\r\n    DB.propArray(this, 'content')(function(v) {\r\n        $.clear( elem );\r\n        v.forEach(function (itm) {\r\n            $.add( elem, itm );\r\n            if (typeof itm.$grow !== 'undefined') {\r\n                $.css( itm, {'flex-grow': parseFloat(itm.$grow)} );\r\n            }\r\n            if (typeof itm.$shrink !== 'undefined') {\r\n                $.css( itm, {'flex-shrink': parseFloat(itm.$shrink)} );\r\n            }\r\n        });\r\n    });\r\n    DB.propAddClass(this, 'wide');\r\n    DB.propRemoveClass(this, 'visible', 'hide');\r\n\r\n    opts = DB.extend({\r\n        orientation: ENUM_ORIENTATION[0],\r\n        type: ENUM_TYPE[0],\r\n        content: [],\r\n        wide: true,\r\n        visible: true\r\n    }, opts, this);\r\n}\r\n\r\nmodule.exports = Flex;\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n/**\n * @module wdg.flex\n * @see module:$\n * @see module:dom\n * @see module:tfw.data-binding\n\n */\n});","zip":"require(\"wdg.flex\",function(e,t,i){function n(e){var t=r.elem(this,\"div\",\"wdg-flex\");s.propToggleClass(this,\"orientation\",l),s.propToggleClass(this,\"type\",a),s.propArray(this,\"content\")(function(e){r.clear(t),e.forEach(function(e){r.add(t,e),\"undefined\"!=typeof e.$grow&&r.css(e,{\"flex-grow\":parseFloat(e.$grow)}),\"undefined\"!=typeof e.$shrink&&r.css(e,{\"flex-shrink\":parseFloat(e.$shrink)})})}),s.propAddClass(this,\"wide\"),s.propRemoveClass(this,\"visible\",\"hide\"),e=s.extend({orientation:l[0],type:a[0],content:[],wide:!0,visible:!0},e,this)}var o=function(){function t(){return n(i,arguments)}var i={en:{}},n=e(\"$\").intl;return t.all=i,t}(),r=e(\"dom\"),s=e(\"tfw.data-binding\"),l=[\"H\",\"V\",\"W\",\"N\"],a=[\"default\",\"fill\"];t.exports=n,t.exports._=o});\n//# sourceMappingURL=wdg.flex.js.map","map":{"version":3,"file":"wdg.flex.js","sources":["wdg.flex.js"],"sourcesContent":["/** @module wdg.flex */require( 'wdg.flex', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * @module wdg.flex\r\n *\r\n * @description\r\n * Simple flex alignement of children.\r\n *\r\n * @example\r\n * var mod = require('wdg.flex');\r\n */\r\nvar $ = require(\"dom\");\r\nvar DB = require(\"tfw.data-binding\");\r\n\r\n\r\nvar ENUM_ORIENTATION = ['H', 'V', 'W', 'N'];\r\nvar ENUM_TYPE = ['default', 'fill'];\r\n\r\n\r\nfunction Flex(opts) {\r\n    var elem = $.elem( this, 'div', 'wdg-flex' );\r\n\r\n    DB.propToggleClass(this, 'orientation', ENUM_ORIENTATION);\r\n    DB.propToggleClass(this, 'type', ENUM_TYPE);\r\n    DB.propArray(this, 'content')(function(v) {\r\n        $.clear( elem );\r\n        v.forEach(function (itm) {\r\n            $.add( elem, itm );\r\n            if (typeof itm.$grow !== 'undefined') {\r\n                $.css( itm, {'flex-grow': parseFloat(itm.$grow)} );\r\n            }\r\n            if (typeof itm.$shrink !== 'undefined') {\r\n                $.css( itm, {'flex-shrink': parseFloat(itm.$shrink)} );\r\n            }\r\n        });\r\n    });\r\n    DB.propAddClass(this, 'wide');\r\n    DB.propRemoveClass(this, 'visible', 'hide');\r\n\r\n    opts = DB.extend({\r\n        orientation: ENUM_ORIENTATION[0],\r\n        type: ENUM_TYPE[0],\r\n        content: [],\r\n        wide: true,\r\n        visible: true\r\n    }, opts, this);\r\n}\r\n\r\nmodule.exports = Flex;\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n});"],"names":["require","module","exports","Flex","opts","elem","$","this","DB","propToggleClass","ENUM_ORIENTATION","ENUM_TYPE","propArray","v","clear","forEach","itm","add","$grow","css","flex-grow","parseFloat","$shrink","flex-shrink","propAddClass","propRemoveClass","extend","orientation","type","content","wide","visible","_","X","D","arguments","en","intl","all"],"mappings":"AAAuBA,QAAS,WAAY,SAASA,EAASC,EAAQC,GAkBtE,QAASC,GAAKC,GACV,GAAIC,GAAOC,EAAED,KAAME,KAAM,MAAO,WAEhCC,GAAGC,gBAAgBF,KAAM,cAAeG,GACxCF,EAAGC,gBAAgBF,KAAM,OAAQI,GACjCH,EAAGI,UAAUL,KAAM,WAAW,SAASM,GACnCP,EAAEQ,MAAOT,GACTQ,EAAEE,QAAQ,SAAUC,GAChBV,EAAEW,IAAKZ,EAAMW,GACY,mBAAdA,GAAIE,OACXZ,EAAEa,IAAKH,GAAMI,YAAaC,WAAWL,EAAIE,SAElB,mBAAhBF,GAAIM,SACXhB,EAAEa,IAAKH,GAAMO,cAAeF,WAAWL,EAAIM,eAIvDd,EAAGgB,aAAajB,KAAM,QACtBC,EAAGiB,gBAAgBlB,KAAM,UAAW,QAEpCH,EAAOI,EAAGkB,QACNC,YAAajB,EAAiB,GAC9BkB,KAAMjB,EAAU,GAChBkB,WACAC,MAAM,EACNC,SAAS,GACV3B,EAAMG,MA5CoE,GAAIyB,GAAE,WAA+C,QAASA,KAAI,MAAOC,GAAEC,EAAEC,WAA5D,GAAID,IAAGE,OAASH,EAAEjC,EAAQ,KAAKqC,IAAiD,OAARL,GAAEM,IAAIJ,EAASF,KAUrL1B,EAAIN,EAAQ,OACZQ,EAAKR,EAAQ,oBAGbU,GAAoB,IAAK,IAAK,IAAK,KACnCC,GAAa,UAAW,OAgC5BV,GAAOC,QAAUC,EAIjBF,EAAOC,QAAQ8B,EAAIA"},"dependencies":["mod/$","mod/dom","mod/tfw.data-binding"]}