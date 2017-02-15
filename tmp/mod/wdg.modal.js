{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n","src":"/** @module wdg.modal */require( 'wdg.modal', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    /**\n * @module wdg.modal\n *\n * @description\n *\n *\n * @example\n * var mod = require('wdg.modal');\n */\nvar $ = require(\"dom\");\nvar DB = require(\"tfw.data-binding\");\nvar Flex = require(\"wdg.flex\");\nvar Button = require(\"wdg.button\");\n\n\nfunction Modal( opts ) {\n    var that = this;\n\n    var body = $.div( 'theme-elevation-24', 'theme-color-bg-B3' );\n    var cell = $.div( [body] );\n    var elem = $.elem( this, 'div', 'wdg-modal', [cell] );\n\n    DB.prop(this, 'content')(function(v) {\n        $.clear( body );\n        if (Array.isArray( v )) {\n            v.forEach(function (itm) {\n                $.add( body, itm );\n            });\n        } else if (typeof v !== 'undefined' && v !== null){\n            $.add( body, v );\n        }\n    });\n    DB.propAddClass(this, 'padding');\n    DB.propAddClass(this, 'scroll');\n    DB.propAddClass(this, 'wide');\n    DB.propBoolean(this, 'visible')(function(v) {\n        if( v ) {\n            that.attach();\n        }\n        else {\n            that.detach();\n        }\n    });\n\n    opts = DB.extend({\n        visible: false, content: [], padding: true, scroll: true, wide: false\n    }, opts, this );\n}\n\n\n/**\n * @member Modal.refresh\n * Refresh the content.\n */\nModal.prototype.refresh = function() {\n    DB.fire( this, 'content' );\n    return this;\n};\n\n/**\n * @member Modal.attach\n * Append element to body.\n */\nModal.prototype.attach = function() {\n    var that = this;\n    \n    if( this._timeoutDetach ) {\n        window.clearTimeout( this._timeoutDetach );\n        delete this._timeoutDetach;\n    }\n    document.body.appendChild( this.element );\n    DB.set( this, 'visible', true );\n    $.addClass( this, 'fadeout' );\n    window.setTimeout(function() {\n        $.removeClass( that, 'fadeout' );\n    });\n};\n\n/**\n * @member Modal.detach\n * Remove element from body.\n */\nModal.prototype.detach = function() {\n    var that = this;\n\n    window.setTimeout(function() {\n        $.addClass( that, 'fadeout' );\n    });\n    this._timeoutDetach = window.setTimeout(function() {\n        delete this._timeoutDetach;\n        DB.set( that, 'visible', false );\n        $.detach( that.element );\n    }, 250);\n};\n\n/**\n * @function Modal.comfirm\n */\nModal.confirm = function( content, onYes, onNo ) {\n    var btnNo = Button.No();\n    var btnYes = Button.Yes('warning');\n    var buttons = $.div([$.tag('hr'), new Flex({ content: [btnNo, btnYes] })]);\n    if (typeof content === 'string' && content.substr(0, 6) == '<html>') {\n        // This is HTML code.\n        var html = content.substr(6);\n        content = $.div();\n        content.innerHTML = html;\n    }\n    var modal = new Modal({ content: $.div([content, buttons]), padding: true });\n    modal.attach();\n\n    btnNo.on(function() {\n        modal.detach();\n        if (typeof onNo === 'function') {\n            onNo();\n        }\n    });\n    btnYes.on(function() {\n        if (typeof onYes === 'function') {\n            var caption = onYes();\n            if( typeof caption !== 'string' ) modal.detach();\n            else {\n                btnNo.visible = false;\n                btnYes.waitOn( caption );\n            }\n        } else {\n            modal.detach();\n        }\n    });\n    return modal;\n};\n\n/**\n * Display a message with an OK button.\n */\nModal.alert = function(content, onOK) {\n    var btnOK = Button.Close('simple');\n    var buttons = $.div([$.tag('hr'), new Flex({ content: [btnOK] })]);\n    if (typeof content === 'string' && content.substr(0, 6) == '<html>') {\n        // This is HTML code.\n        var html = content.substr(6);\n        content = $.div();\n        content.innerHTML = html;\n    }\n    var modal = new Modal({ scroll: false, content: $.div([\n        $.div( 'scrollable', [content] ), buttons\n    ]), padding: true });\n    modal.attach();\n\n    btnOK.on(function() {\n        modal.detach();\n        if (typeof onOK === 'function') onOK();\n    });\n    return modal;\n};\n\n\nmodule.exports = Modal;\n\n\n  \nmodule.exports._ = _;\n/**\n * @module wdg.modal\n * @see module:$\n * @see module:dom\n * @see module:tfw.data-binding\n * @see module:wdg.flex\n * @see module:wdg.button\n\n */\n});","zip":"require(\"wdg.modal\",function(t,e,n){function i(t){var e=this,n=a.div(\"theme-elevation-24\",\"theme-color-bg-B3\"),i=a.div([n]);a.elem(this,\"div\",\"wdg-modal\",[i]);d.prop(this,\"content\")(function(t){a.clear(n),Array.isArray(t)?t.forEach(function(t){a.add(n,t)}):\"undefined\"!=typeof t&&null!==t&&a.add(n,t)}),d.propAddClass(this,\"padding\"),d.propAddClass(this,\"scroll\"),d.propAddClass(this,\"wide\"),d.propBoolean(this,\"visible\")(function(t){t?e.attach():e.detach()}),t=d.extend({visible:!1,content:[],padding:!0,scroll:!0,wide:!1},t,this)}var o=function(){function e(){return i(n,arguments)}var n={en:{}},i=t(\"$\").intl;return e.all=n,e}(),a=t(\"dom\"),d=t(\"tfw.data-binding\"),s=t(\"wdg.flex\"),r=t(\"wdg.button\");i.prototype.refresh=function(){return d.fire(this,\"content\"),this},i.prototype.attach=function(){var t=this;this._timeoutDetach&&(window.clearTimeout(this._timeoutDetach),delete this._timeoutDetach),document.body.appendChild(this.element),d.set(this,\"visible\",!0),a.addClass(this,\"fadeout\"),window.setTimeout(function(){a.removeClass(t,\"fadeout\")})},i.prototype.detach=function(){var t=this;window.setTimeout(function(){a.addClass(t,\"fadeout\")}),this._timeoutDetach=window.setTimeout(function(){delete this._timeoutDetach,d.set(t,\"visible\",!1),a.detach(t.element)},250)},i.confirm=function(t,e,n){var o=r.No(),d=r.Yes(\"warning\"),c=a.div([a.tag(\"hr\"),new s({content:[o,d]})]);if(\"string\"==typeof t&&\"<html>\"==t.substr(0,6)){var u=t.substr(6);t=a.div(),t.innerHTML=u}var h=new i({content:a.div([t,c]),padding:!0});return h.attach(),o.on(function(){h.detach(),\"function\"==typeof n&&n()}),d.on(function(){if(\"function\"==typeof e){var t=e();\"string\"!=typeof t?h.detach():(o.visible=!1,d.waitOn(t))}else h.detach()}),h},i.alert=function(t,e){var n=r.Close(\"simple\"),o=a.div([a.tag(\"hr\"),new s({content:[n]})]);if(\"string\"==typeof t&&\"<html>\"==t.substr(0,6)){var d=t.substr(6);t=a.div(),t.innerHTML=d}var c=new i({scroll:!1,content:a.div([a.div(\"scrollable\",[t]),o]),padding:!0});return c.attach(),n.on(function(){c.detach(),\"function\"==typeof e&&e()}),c},e.exports=i,e.exports._=o});\n//# sourceMappingURL=wdg.modal.js.map","map":{"version":3,"file":"wdg.modal.js.map","sources":["wdg.modal.js"],"sourcesContent":["/** @module wdg.modal */require( 'wdg.modal', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    /**\n * @module wdg.modal\n *\n * @description\n *\n *\n * @example\n * var mod = require('wdg.modal');\n */\nvar $ = require(\"dom\");\nvar DB = require(\"tfw.data-binding\");\nvar Flex = require(\"wdg.flex\");\nvar Button = require(\"wdg.button\");\n\n\nfunction Modal( opts ) {\n    var that = this;\n\n    var body = $.div( 'theme-elevation-24', 'theme-color-bg-B3' );\n    var cell = $.div( [body] );\n    var elem = $.elem( this, 'div', 'wdg-modal', [cell] );\n\n    DB.prop(this, 'content')(function(v) {\n        $.clear( body );\n        if (Array.isArray( v )) {\n            v.forEach(function (itm) {\n                $.add( body, itm );\n            });\n        } else if (typeof v !== 'undefined' && v !== null){\n            $.add( body, v );\n        }\n    });\n    DB.propAddClass(this, 'padding');\n    DB.propAddClass(this, 'scroll');\n    DB.propAddClass(this, 'wide');\n    DB.propBoolean(this, 'visible')(function(v) {\n        if( v ) {\n            that.attach();\n        }\n        else {\n            that.detach();\n        }\n    });\n\n    opts = DB.extend({\n        visible: false, content: [], padding: true, scroll: true, wide: false\n    }, opts, this );\n}\n\n\n/**\n * @member Modal.refresh\n * Refresh the content.\n */\nModal.prototype.refresh = function() {\n    DB.fire( this, 'content' );\n    return this;\n};\n\n/**\n * @member Modal.attach\n * Append element to body.\n */\nModal.prototype.attach = function() {\n    var that = this;\n    \n    if( this._timeoutDetach ) {\n        window.clearTimeout( this._timeoutDetach );\n        delete this._timeoutDetach;\n    }\n    document.body.appendChild( this.element );\n    DB.set( this, 'visible', true );\n    $.addClass( this, 'fadeout' );\n    window.setTimeout(function() {\n        $.removeClass( that, 'fadeout' );\n    });\n};\n\n/**\n * @member Modal.detach\n * Remove element from body.\n */\nModal.prototype.detach = function() {\n    var that = this;\n\n    window.setTimeout(function() {\n        $.addClass( that, 'fadeout' );\n    });\n    this._timeoutDetach = window.setTimeout(function() {\n        delete this._timeoutDetach;\n        DB.set( that, 'visible', false );\n        $.detach( that.element );\n    }, 250);\n};\n\n/**\n * @function Modal.comfirm\n */\nModal.confirm = function( content, onYes, onNo ) {\n    var btnNo = Button.No();\n    var btnYes = Button.Yes('warning');\n    var buttons = $.div([$.tag('hr'), new Flex({ content: [btnNo, btnYes] })]);\n    if (typeof content === 'string' && content.substr(0, 6) == '<html>') {\n        // This is HTML code.\n        var html = content.substr(6);\n        content = $.div();\n        content.innerHTML = html;\n    }\n    var modal = new Modal({ content: $.div([content, buttons]), padding: true });\n    modal.attach();\n\n    btnNo.on(function() {\n        modal.detach();\n        if (typeof onNo === 'function') {\n            onNo();\n        }\n    });\n    btnYes.on(function() {\n        if (typeof onYes === 'function') {\n            var caption = onYes();\n            if( typeof caption !== 'string' ) modal.detach();\n            else {\n                btnNo.visible = false;\n                btnYes.waitOn( caption );\n            }\n        } else {\n            modal.detach();\n        }\n    });\n    return modal;\n};\n\n/**\n * Display a message with an OK button.\n */\nModal.alert = function(content, onOK) {\n    var btnOK = Button.Close('simple');\n    var buttons = $.div([$.tag('hr'), new Flex({ content: [btnOK] })]);\n    if (typeof content === 'string' && content.substr(0, 6) == '<html>') {\n        // This is HTML code.\n        var html = content.substr(6);\n        content = $.div();\n        content.innerHTML = html;\n    }\n    var modal = new Modal({ scroll: false, content: $.div([\n        $.div( 'scrollable', [content] ), buttons\n    ]), padding: true });\n    modal.attach();\n\n    btnOK.on(function() {\n        modal.detach();\n        if (typeof onOK === 'function') onOK();\n    });\n    return modal;\n};\n\n\nmodule.exports = Modal;\n\n\n  \nmodule.exports._ = _;\n});"],"names":["require","module","exports","Modal","opts","that","this","body","$","div","cell","elem","DB","prop","v","clear","Array","isArray","forEach","itm","add","propAddClass","propBoolean","attach","detach","extend","visible","content","padding","scroll","wide","_","X","D","arguments","en","intl","all","Flex","Button","prototype","refresh","fire","_timeoutDetach","window","clearTimeout","document","appendChild","element","set","addClass","setTimeout","removeClass","confirm","onYes","onNo","btnNo","No","btnYes","Yes","buttons","tag","substr","html","innerHTML","modal","on","caption","waitOn","alert","onOK","btnOK","Close"],"mappings":"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"},"dependencies":["mod/$","mod/dom","mod/tfw.data-binding","mod/wdg.flex","mod/wdg.button"]}