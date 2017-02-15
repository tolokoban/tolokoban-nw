{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n","src":"/** @module tfw.storage */require( 'tfw.storage', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    function load(storage) {\n    return function(key, def) {\n        var v = storage.getItem(key);\n        if (v === null) {\n            return def;\n        }\n        try {\n            v = JSON.parse(v);\n        }\n        catch(ex) {}\n        return v;\n    };\n}\n\nfunction save(storage) {\n    return function(key, val) {\n        storage.setItem(key, JSON.stringify(val));\n    };\n}\n\n\nif( !window.localStorage ) {\n    window.localStorage = new DBStorage();\n    window.sessionStorage = new DBStorage();\n}\nelse if( !window.sessionStorage ) {\n    window.sessionStorage = window.localStorage;\n}\n\nexports.local = {\n    get: load(window.localStorage),\n    set: save(window.localStorage)\n};\n\nexports.session = {\n    get: load(window.sessionStorage),\n    set: save(window.sessionStorage)\n};\n\n\nfunction DBStorage() {\n    this._data = {};\n}\n\n\n/**\n * @member DBStorage.getItem\n * @param key\n */\nDBStorage.prototype.getItem = function(key, def) {\n    var val = this._data[key];\n    return typeof val === 'undefined' ? def : val;\n};\n\nDBStorage.prototype.setItem = function(key, val) {\n    this._data[key] = val;\n};\n\n\n  \nmodule.exports._ = _;\n/**\n * @module tfw.storage\n * @see module:$\n\n */\n});","zip":"require(\"tfw.storage\",function(t,n,o){function e(t){return function(n,o){var e=t.getItem(n);if(null===e)return o;try{e=JSON.parse(e)}catch(t){}return e}}function r(t){return function(n,o){t.setItem(n,JSON.stringify(o))}}function i(){this._data={}}var a=function(){function n(){return e(o,arguments)}var o={en:{}},e=t(\"$\").intl;return n.all=o,n}();window.localStorage?window.sessionStorage||(window.sessionStorage=window.localStorage):(window.localStorage=new i,window.sessionStorage=new i),o.local={get:e(window.localStorage),set:r(window.localStorage)},o.session={get:e(window.sessionStorage),set:r(window.sessionStorage)},i.prototype.getItem=function(t,n){var o=this._data[t];return\"undefined\"==typeof o?n:o},i.prototype.setItem=function(t,n){this._data[t]=n},n.exports._=a});\n//# sourceMappingURL=tfw.storage.js.map","map":{"version":3,"file":"tfw.storage.js.map","sources":["tfw.storage.js"],"sourcesContent":["/** @module tfw.storage */require( 'tfw.storage', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    function load(storage) {\n    return function(key, def) {\n        var v = storage.getItem(key);\n        if (v === null) {\n            return def;\n        }\n        try {\n            v = JSON.parse(v);\n        }\n        catch(ex) {}\n        return v;\n    };\n}\n\nfunction save(storage) {\n    return function(key, val) {\n        storage.setItem(key, JSON.stringify(val));\n    };\n}\n\n\nif( !window.localStorage ) {\n    window.localStorage = new DBStorage();\n    window.sessionStorage = new DBStorage();\n}\nelse if( !window.sessionStorage ) {\n    window.sessionStorage = window.localStorage;\n}\n\nexports.local = {\n    get: load(window.localStorage),\n    set: save(window.localStorage)\n};\n\nexports.session = {\n    get: load(window.sessionStorage),\n    set: save(window.sessionStorage)\n};\n\n\nfunction DBStorage() {\n    this._data = {};\n}\n\n\n/**\n * @member DBStorage.getItem\n * @param key\n */\nDBStorage.prototype.getItem = function(key, def) {\n    var val = this._data[key];\n    return typeof val === 'undefined' ? def : val;\n};\n\nDBStorage.prototype.setItem = function(key, val) {\n    this._data[key] = val;\n};\n\n\n  \nmodule.exports._ = _;\n});"],"names":["require","module","exports","load","storage","key","def","v","getItem","JSON","parse","ex","save","val","setItem","stringify","DBStorage","this","_data","_","X","D","arguments","en","intl","all","window","localStorage","sessionStorage","local","get","set","session","prototype"],"mappings":"AAA0BA,QAAS,cAAe,SAASA,EAASC,EAAQC,GACxE,QAASC,GAAKC,GACd,MAAO,UAASC,EAAKC,GACjB,GAAIC,GAAIH,EAAQI,QAAQH,EACxB,IAAU,OAANE,EACA,MAAOD,EAEX,KACIC,EAAIE,KAAKC,MAAMH,GAEnB,MAAMI,IACN,MAAOJ,IAIf,QAASK,GAAKR,GACV,MAAO,UAASC,EAAKQ,GACjBT,EAAQU,QAAQT,EAAKI,KAAKM,UAAUF,KAwB5C,QAASG,KACLC,KAAKC,SA1C8E,GAAIC,GAAE,WAA+C,QAASA,KAAI,MAAOC,GAAEC,EAAEC,WAA5D,GAAID,IAAGE,OAASH,EAAEpB,EAAQ,KAAKwB,IAAiD,OAARL,GAAEM,IAAIJ,EAASF,IAsB1LO,QAAOC,aAIFD,OAAOE,iBACbF,OAAOE,eAAiBF,OAAOC,eAJ/BD,OAAOC,aAAe,GAAIX,GAC1BU,OAAOE,eAAiB,GAAIZ,IAMhCd,EAAQ2B,OACJC,IAAK3B,EAAKuB,OAAOC,cACjBI,IAAKnB,EAAKc,OAAOC,eAGrBzB,EAAQ8B,SACJF,IAAK3B,EAAKuB,OAAOE,gBACjBG,IAAKnB,EAAKc,OAAOE,iBAarBZ,EAAUiB,UAAUzB,QAAU,SAASH,EAAKC,GACxC,GAAIO,GAAMI,KAAKC,MAAMb,EACrB,OAAsB,mBAARQ,GAAsBP,EAAMO,GAG9CG,EAAUiB,UAAUnB,QAAU,SAAST,EAAKQ,GACxCI,KAAKC,MAAMb,GAAOQ,GAKtBZ,EAAOC,QAAQiB,EAAIA"},"dependencies":["mod/$"]}