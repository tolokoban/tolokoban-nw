{"intl":"","src":"/** @module $ */require( '$', function(require, module, exports) {     exports.config={\"name\":\"\\\"tlk-app-shell\\\"\",\"description\":\"\\\"Tolokoban App Shell\\\"\",\"author\":\"\\\"tolokoban\\\"\",\"version\":\"\\\"0.2.30\\\"\",\"major\":\"0\",\"minor\":\"2\",\"revision\":\"30\",\"date\":\"2017-02-22T13:50:02.000Z\",\"consts\":{\"mode\":\"release\"}};\nvar currentLang = null;\nexports.lang = function(lang) {\n    if (lang === undefined) {\n        if (window.localStorage) {\n            lang = window.localStorage.getItem(\"Language\");\n        }\n        if (!lang) {\n            lang = window.navigator.language;\n            if (!lang) {\n                lang = window.navigator.browserLanguage;\n                if (!lang) {\n                    lang = \"fr\";\n                }\n            }\n        }\n        lang = lang.substr(0, 2).toLowerCase();\n    }\n    currentLang = lang;\n    if (window.localStorage) {\n        window.localStorage.setItem(\"Language\", lang);\n    }\n    return lang;\n};\nexports.intl = function(words, params) {\n    var dic = words[exports.lang()],\n        k = params[0],\n        txt, newTxt, i, c, lastIdx, pos;\n    var defLang;\n    for( defLang in words ) break;\n    if( !defLang ) return k;\n    if (!dic) {\n        dic = words[defLang];\n        if( !dic ) {\n            return k;\n        }\n    }\n    txt = dic[k];\n    if( !txt ) {\n        dic = words[defLang];\n        txt = dic[k];\n    }\n    if (!txt) return k;\n    if (params.length > 1) {\n        newTxt = \"\";\n        lastIdx = 0;\n        for (i = 0 ; i < txt.length ; i++) {\n            c = txt.charAt(i);\n            if (c === '$') {\n                newTxt += txt.substring(lastIdx, i);\n                i++;\n                pos = txt.charCodeAt(i) - 48;\n                if (pos < 0 || pos >= params.length) {\n                    newTxt += \"$\" + txt.charAt(i);\n                } else {\n                    newTxt += params[pos];\n                }\n                lastIdx = i + 1;\n            } else if (c === '\\\\') {\n                newTxt += txt.substring(lastIdx, i);\n                i++;\n                newTxt += txt.charAt(i);\n                lastIdx = i + 1;\n            }\n        }\n        newTxt += txt.substr(lastIdx);\n        txt = newTxt;\n    }\n    return txt;\n};\n\n\n  \n});","zip":"require(\"$\",function(n,r,o){o.config={name:'\"tlk-app-shell\"',description:'\"Tolokoban App Shell\"',author:'\"tolokoban\"',version:'\"0.2.30\"',major:\"0\",minor:\"2\",revision:\"30\",date:\"2017-02-22T13:50:02.000Z\",consts:{mode:\"release\"}};var a=null;o.lang=function(n){return void 0===n&&(window.localStorage&&(n=window.localStorage.getItem(\"Language\")),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n=\"fr\"))),n=n.substr(0,2).toLowerCase()),a=n,window.localStorage&&window.localStorage.setItem(\"Language\",n),n},o.intl=function(n,r){var a,e,t,i,l,g,u,s=n[o.lang()],c=r[0];for(u in n)break;if(!u)return c;if(!s&&(s=n[u],!s))return c;if(a=s[c],a||(s=n[u],a=s[c]),!a)return c;if(r.length>1){for(e=\"\",l=0,t=0;t<a.length;t++)i=a.charAt(t),\"$\"===i?(e+=a.substring(l,t),t++,g=a.charCodeAt(t)-48,e+=g<0||g>=r.length?\"$\"+a.charAt(t):r[g],l=t+1):\"\\\\\"===i&&(e+=a.substring(l,t),t++,e+=a.charAt(t),l=t+1);e+=a.substr(l),a=e}return a}});\n//# sourceMappingURL=$.js.map","map":{"version":3,"file":"$.js","sources":["$.js"],"sourcesContent":["/** @module $ */require( '$', function(require, module, exports) {     exports.config={\"name\":\"\\\"tlk-app-shell\\\"\",\"description\":\"\\\"Tolokoban App Shell\\\"\",\"author\":\"\\\"tolokoban\\\"\",\"version\":\"\\\"0.2.30\\\"\",\"major\":\"0\",\"minor\":\"2\",\"revision\":\"30\",\"date\":\"2017-02-22T13:50:02.000Z\",\"consts\":{\"mode\":\"release\"}};\nvar currentLang = null;\nexports.lang = function(lang) {\n    if (lang === undefined) {\n        if (window.localStorage) {\n            lang = window.localStorage.getItem(\"Language\");\n        }\n        if (!lang) {\n            lang = window.navigator.language;\n            if (!lang) {\n                lang = window.navigator.browserLanguage;\n                if (!lang) {\n                    lang = \"fr\";\n                }\n            }\n        }\n        lang = lang.substr(0, 2).toLowerCase();\n    }\n    currentLang = lang;\n    if (window.localStorage) {\n        window.localStorage.setItem(\"Language\", lang);\n    }\n    return lang;\n};\nexports.intl = function(words, params) {\n    var dic = words[exports.lang()],\n        k = params[0],\n        txt, newTxt, i, c, lastIdx, pos;\n    var defLang;\n    for( defLang in words ) break;\n    if( !defLang ) return k;\n    if (!dic) {\n        dic = words[defLang];\n        if( !dic ) {\n            return k;\n        }\n    }\n    txt = dic[k];\n    if( !txt ) {\n        dic = words[defLang];\n        txt = dic[k];\n    }\n    if (!txt) return k;\n    if (params.length > 1) {\n        newTxt = \"\";\n        lastIdx = 0;\n        for (i = 0 ; i < txt.length ; i++) {\n            c = txt.charAt(i);\n            if (c === '$') {\n                newTxt += txt.substring(lastIdx, i);\n                i++;\n                pos = txt.charCodeAt(i) - 48;\n                if (pos < 0 || pos >= params.length) {\n                    newTxt += \"$\" + txt.charAt(i);\n                } else {\n                    newTxt += params[pos];\n                }\n                lastIdx = i + 1;\n            } else if (c === '\\\\') {\n                newTxt += txt.substring(lastIdx, i);\n                i++;\n                newTxt += txt.charAt(i);\n                lastIdx = i + 1;\n            }\n        }\n        newTxt += txt.substr(lastIdx);\n        txt = newTxt;\n    }\n    return txt;\n};\n\n\n  \n});"],"names":["require","module","exports","config","name","description","author","version","major","minor","revision","date","consts","mode","currentLang","lang","undefined","window","localStorage","getItem","navigator","language","browserLanguage","substr","toLowerCase","setItem","intl","words","params","txt","newTxt","i","c","lastIdx","pos","defLang","dic","k","length","charAt","substring","charCodeAt"],"mappings":"AAAgBA,QAAS,IAAK,SAASA,EAASC,EAAQC,GAAeA,EAAQC,QAAQC,KAAO,kBAAoBC,YAAc,wBAA0BC,OAAS,cAAgBC,QAAU,WAAaC,MAAQ,IAAIC,MAAQ,IAAIC,SAAW,KAAKC,KAAO,2BAA2BC,QAAUC,KAAO,WACrS,IAAIC,GAAc,IAClBZ,GAAQa,KAAO,SAASA,GAoBpB,MAnBaC,UAATD,IACIE,OAAOC,eACPH,EAAOE,OAAOC,aAAaC,QAAQ,aAElCJ,IACDA,EAAOE,OAAOG,UAAUC,SACnBN,IACDA,EAAOE,OAAOG,UAAUE,gBACnBP,IACDA,EAAO,QAInBA,EAAOA,EAAKQ,OAAO,EAAG,GAAGC,eAE7BV,EAAcC,EACVE,OAAOC,cACPD,OAAOC,aAAaO,QAAQ,WAAYV,GAErCA,GAEXb,EAAQwB,KAAO,SAASC,EAAOC,GAC3B,GAEIC,GAAKC,EAAQC,EAAGC,EAAGC,EAASC,EAC5BC,EAHAC,EAAMT,EAAMzB,EAAQa,QACpBsB,EAAIT,EAAO,EAGf,KAAKO,IAAWR,GAAQ,KACxB,KAAKQ,EAAU,MAAOE,EACtB,KAAKD,IACDA,EAAMT,EAAMQ,IACPC,GACD,MAAOC,EAQf,IALAR,EAAMO,EAAIC,GACLR,IACDO,EAAMT,EAAMQ,GACZN,EAAMO,EAAIC,KAETR,EAAK,MAAOQ,EACjB,IAAIT,EAAOU,OAAS,EAAG,CAGnB,IAFAR,EAAS,GACTG,EAAU,EACLF,EAAI,EAAIA,EAAIF,EAAIS,OAASP,IAC1BC,EAAIH,EAAIU,OAAOR,GACL,MAANC,GACAF,GAAUD,EAAIW,UAAUP,EAASF,GACjCA,IACAG,EAAML,EAAIY,WAAWV,GAAK,GAEtBD,GADAI,EAAM,GAAKA,GAAON,EAAOU,OACf,IAAMT,EAAIU,OAAOR,GAEjBH,EAAOM,GAErBD,EAAUF,EAAI,GACD,OAANC,IACPF,GAAUD,EAAIW,UAAUP,EAASF,GACjCA,IACAD,GAAUD,EAAIU,OAAOR,GACrBE,EAAUF,EAAI,EAGtBD,IAAUD,EAAIN,OAAOU,GACrBJ,EAAMC,EAEV,MAAOD"},"dependencies":[]}