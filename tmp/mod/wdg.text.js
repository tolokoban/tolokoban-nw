{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n","src":"/** @module wdg.text */require( 'wdg.text', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    var $ = require(\"dom\");\nvar DB = require(\"tfw.data-binding\");\nvar Lang = require(\"wdg.lang\");\nvar LaterAction = require(\"tfw.timer\").laterAction;\n\n/**\n * @class Text\n * @description  HTML5 text input with many options.\n *\n * @param opts.value {string} - .\n * @param opts.type {string} - One of the following strings: 'text', 'button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file', 'hidden', 'image', 'month', 'password', 'radio', 'range', 'reset', 'number', 'search', 'submit', 'tel', 'time', 'url', 'week'.\n * @param opts.placeholder {string} - .\n * @param opts.enabled {boolean} - .\n * @param opts.validator {string|function} - .\n * @param opts.valid {} - .\n * @param opts.list {} - .\n * @param opts.label {string} - .\n * @param opts.placeholder {string} - .\n * @param opts.size {} - .\n * @param opts.width {} - .\n * @param opts.focus {} - .\n * @param opts.wide {boolean} - .\n * @param opts.visible {boolean} - .\n */\nvar Text = function(opts) {\n    var that = this;\n\n    var dataListHasFocus = false;\n    var autocompleteProposals = [];\n    var autocompleteShift = 0;\n\n    var label = $.div( 'theme-label', 'theme-color-bg-1' );\n    var input = $.tag( 'input' );\n    var lang = new Lang({ small: true, visible: true });\n    var body = $.div('nowrap', [input, lang]);\n    var datalist = $.div( 'datalist', 'theme-elevation-12' );\n    this._input = input;\n    var elem = $.elem( this, 'div', 'wdg-text', 'theme-elevation-2', [label, body, datalist] );\n\n    DB.bind( lang, 'value', function(v) {\n        input.value = that.value[v] || '';\n        if( !that.focus ) {\n            input.focus();\n        }\n    });\n\n    DB.prop(this, 'value')(function(v) {\n        if( v === null || typeof v === 'undefined') v = '';\n        if( typeof v === 'number' || typeof v === 'boolean') v = '' + v;\n        if( typeof v !== 'string' ) {\n            if( input.value != v[lang.value] ) {\n                input.value = v[lang.value];\n            }\n            var subset = [];\n            var isoLang;\n            for( isoLang in v ) {\n                subset.push( isoLang );\n            }\n            lang.subset = subset;\n            that.intl = true;\n        } else {\n            // Very important!\n            // In Google Chrome, when you set a value to an input,\n            // the cursor is sent to the end.\n            if( input.value != v ) {\n                input.value = v;\n            }\n            that.intl = false;\n        }\n        that.validate();\n    });\n    DB.propBoolean(this, 'intl')(function(v) {\n        lang.visible = v;\n    });\n    DB.propEnum(['text', 'button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file',\n                 'hidden', 'image', 'month', 'password', 'radio', 'range', 'reset',\n                 'search', 'submit', 'tel', 'time', 'url', 'week'])(this, 'type')\n    (function(v) {\n        $.att(input, {type: v});\n        if( v == 'password' ) {\n            $.att(input, {autocomplete: 'off'});\n        }\n    });\n    DB.propStringArray(this, 'list')(function(v) {\n        $.clear( datalist );\n        $.removeClass( elem, \"list\" );\n        if (!Array.isArray( v )) return;\n        v.forEach(function ( item ) {\n            $.add( datalist, $.div( [item] ) );\n        });\n        if( v.length > 0 ) {\n            $.att( elem, \"list\" );\n        }\n    });\n    DB.propValidator(this, 'validator')(this.validate.bind( this ));\n    DB.propBoolean(this, 'valid')(function(v) {\n        if (v === null || !that.validator) {\n            $.removeClass( elem, \"valid\", \"no-valid\" );\n        } else {\n            if (v) {\n                $.addClass( elem, \"valid\" );\n                $.removeClass( elem, \"no-valid\" );\n            } else {\n                $.removeClass( elem, \"valid\" );\n                $.addClass( elem, \"no-valid\" );\n            }\n        }\n    });\n    DB.propBoolean(this, 'enabled')(function(v) {\n        if (v) {\n            $.removeAtt(input, 'disabled');\n        } else {\n            $.att(input, {disabled: v});\n        }\n    });\n    DB.propInteger(this, 'size')(function(v) {\n        if (v < 1) {\n            $.removeAtt(input, 'size');\n        } else {\n            $.att(input, {size: v});\n        }\n    });\n    DB.propString(this, 'label')(function(v) {\n        if (v === null || (typeof v === 'string' && v.trim() == '')) {\n            $.addClass(elem, 'no-label');\n        } else {\n            $.removeClass(elem, 'no-label');\n            $.textOrHtml(label, v);\n            if (v.substr(0, 6) == '<html>') {\n                $.att(label, {title: ''});\n            } else {\n                $.att(label, {title: v});\n            }\n        }\n    });\n    DB.propString(this, 'placeholder')(function(v) {\n        $.att(input, {placeholder: v});\n    });\n    DB.propString(this, 'width')(function(v) {\n        elem.style.width = v;\n    });\n    DB.propBoolean(this, 'focus')(function(v) {\n        if (v) input.focus();\n        else input.blur();\n    });\n    DB.prop(this, 'action');\n    DB.propAddClass(this, 'wide');\n    DB.propRemoveClass(this, 'visible', 'hide');\n\n    opts = DB.extend({\n        action: true,\n        intl: false,\n        value: '',\n        type: 'text',\n        placeholder: '',\n        enabled: true,\n        validator: null,\n        valid: true,\n        list: null,\n        label: '',\n        placeholder: '',\n        size: 10,\n        width: 'auto',\n        focus: false,\n        wide: false,\n        visible: true\n    }, opts, this);\n\n    var complete = function() {\n        $.removeClass( elem, \"list\" );\n        if (!that.list || that.list.length == 0) return;\n\n        $.clear( datalist );\n        var list = that.list; //.map(String.toLowerCase);\n        var needle = input.value.trim().toLowerCase();\n\n        if (needle.length > 0) {\n            list = list.map(function(itm, idx) {\n                return [idx, itm.toLowerCase().indexOf( needle )];\n            }).filter(function(itm) {\n                return itm[1] > -1;\n            }).sort(function(a, b) {\n                var d = a[1] - b[1];\n                if (d != 0) return d;\n                var sa = that.list[a[0]];\n                var sb = that.list[b[0]];\n                if (sa < sb) return -1;\n                if (sa > sb) return 1;\n                return 0;\n            }).map(function(itm) {\n                var t = that.list[itm[0]];\n                var i = itm[1];\n                return t.substr(0, i)\n                    + \"<b>\" + t.substr(i, needle.length) + \"</b>\"\n                    + t.substr(i + needle.length);\n            });\n        } else {\n            list = list.sort();\n        }\n        if (autocompleteShift > 0) {\n            // Put the current item to the top of the list.\n            // Use arrow keys to change `autocompleteShift`.\n            list = list.slice( autocompleteShift ).concat( list.slice( 0, autocompleteShift ) );\n        }\n        autocompleteProposals = list;\n\n        list.forEach(function (item, idx) {\n            var div = $.div();\n            div.innerHTML = item;\n            list[idx] = div.textContent.trim();\n            $.add( datalist, div );\n            $.on( div, {\n                down: function() {\n                    dataListHasFocus = true;\n                },\n                up: function() {\n                    dataListHasFocus = false;\n                    that.focus = true;\n                },\n                tap: function() {\n                    that.value = div.textContent.trim();\n                    $.removeClass( elem, 'list' );\n                }\n            });\n        });\n        if (list.length > 0) {\n            $.addClass( elem, \"list\" );\n        } else {\n            $.removeClass( elem, \"list\" );\n        }\n    };\n\n    var actionUpdateValue = LaterAction(function() {\n        if( !that.intl ) {\n            that.value = input.value;\n        } else {\n            that.value[lang.value] = input.value;\n            DB.fire( that, 'value', that.value );\n        }\n    }, 300);\n    input.addEventListener('keyup', function(evt) {\n        if (evt.keyCode == 13) {\n            evt.preventDefault();\n            evt.stopPropagation();\n            if ($.hasClass( elem, 'list' )) {\n                $.removeClass( elem, 'list' );\n                that.value = autocompleteProposals[0];\n            }\n            else if (that.valid !== false) {\n                DB.fire( that, 'value', input.value );\n                DB.fire( that, 'action', input.value );\n            }\n        }\n        else if (evt.keyCode == 27) {\n            $.removeClass( elem, \"list\" );\n            autocompleteShift = 0;\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else if (evt.keyCode == 40 && $.hasClass( elem, 'list' )) {\n            autocompleteShift = (autocompleteShift + 1) % autocompleteProposals.length;\n            complete();\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else if (evt.keyCode == 38 && $.hasClass( elem, 'list' )) {\n            autocompleteShift = (autocompleteShift + autocompleteProposals.length - 1)\n                % autocompleteProposals.length;\n            complete();\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else {\n            autocompleteShift = 0;\n            complete();\n            actionUpdateValue.fire();\n        }\n    });\n    input.addEventListener('blur', function() {\n        if( !that.intl ) {\n            that.value = input.value;\n        } else {\n            that.value[lang.value] = input.value;\n            DB.fire( that, 'value', that.value );\n        }\n        if (!dataListHasFocus) {\n            $.removeClass( elem, \"list\" );\n        }\n        $.addClass( elem, \"theme-elevation-2\" );\n        $.removeClass( elem, \"theme-elevation-8\" );\n        $.removeClass(input, 'theme-color-bg-A1');\n        DB.fire( that, 'focus', false );\n    });\n    input.addEventListener('focus', function() {\n        that.selectAll();\n        $.removeClass( elem, \"theme-elevation-2\" );\n        $.addClass( elem, \"theme-elevation-8\" );\n        $.addClass(input, 'theme-color-bg-A1');\n        DB.fire( that, 'focus', true );\n    });\n    input.addEventListener('keydown', function(evt) {\n    });\n\n    this.validate();\n};\n\n\n/**\n * Force value validation.\n */\nText.prototype.validate = function() {\n    var validator = this.validator;\n    if (!validator) return;\n    try {\n        this.valid = validator( this.value );\n    }\n    catch (ex) {\n        console.error(\"[wdg.text:validate] Exception = \", ex);\n        console.error(\"[wdg.text:validate] Validator = \", validator);\n    }\n};\n\n/**\n * Select whole text.\n * @return {this}\n */\nText.prototype.selectAll = function() {\n    var e = this._input;\n    e.setSelectionRange(0, e.value.length);\n    return true;\n};\n\nmodule.exports = Text;\n\n\n  \nmodule.exports._ = _;\n/**\n * @module wdg.text\n * @see module:$\n * @see module:dom\n * @see module:tfw.data-binding\n * @see module:wdg.lang\n * @see module:tfw.timer\n\n */\n});","zip":"require(\"wdg.text\",function(e,t,l){var a=function(){function t(){return a(l,arguments)}var l={en:{}},a=e(\"$\").intl;return t.all=l,t}(),i=e(\"dom\"),o=e(\"tfw.data-binding\"),n=e(\"wdg.lang\"),s=e(\"tfw.timer\").laterAction,r=function(e){var t=this,l=!1,a=[],r=0,u=i.div(\"theme-label\",\"theme-color-bg-1\"),v=i.tag(\"input\"),d=new n({small:!0,visible:!0}),c=i.div(\"nowrap\",[v,d]),p=i.div(\"datalist\",\"theme-elevation-12\");this._input=v;var f=i.elem(this,\"div\",\"wdg-text\",\"theme-elevation-2\",[u,c,p]);o.bind(d,\"value\",function(e){v.value=t.value[e]||\"\",t.focus||v.focus()}),o.prop(this,\"value\")(function(e){if(null!==e&&void 0!==e||(e=\"\"),\"number\"!=typeof e&&\"boolean\"!=typeof e||(e=\"\"+e),\"string\"!=typeof e){v.value!=e[d.value]&&(v.value=e[d.value]);var l,a=[];for(l in e)a.push(l);d.subset=a,t.intl=!0}else v.value!=e&&(v.value=e),t.intl=!1;t.validate()}),o.propBoolean(this,\"intl\")(function(e){d.visible=e}),o.propEnum([\"text\",\"button\",\"checkbox\",\"color\",\"date\",\"datetime\",\"email\",\"file\",\"hidden\",\"image\",\"month\",\"password\",\"radio\",\"range\",\"reset\",\"search\",\"submit\",\"tel\",\"time\",\"url\",\"week\"])(this,\"type\")(function(e){i.att(v,{type:e}),\"password\"==e&&i.att(v,{autocomplete:\"off\"})}),o.propStringArray(this,\"list\")(function(e){i.clear(p),i.removeClass(f,\"list\"),Array.isArray(e)&&(e.forEach(function(e){i.add(p,i.div([e]))}),e.length>0&&i.att(f,\"list\"))}),o.propValidator(this,\"validator\")(this.validate.bind(this)),o.propBoolean(this,\"valid\")(function(e){null!==e&&t.validator?e?(i.addClass(f,\"valid\"),i.removeClass(f,\"no-valid\")):(i.removeClass(f,\"valid\"),i.addClass(f,\"no-valid\")):i.removeClass(f,\"valid\",\"no-valid\")}),o.propBoolean(this,\"enabled\")(function(e){e?i.removeAtt(v,\"disabled\"):i.att(v,{disabled:e})}),o.propInteger(this,\"size\")(function(e){e<1?i.removeAtt(v,\"size\"):i.att(v,{size:e})}),o.propString(this,\"label\")(function(e){null===e||\"string\"==typeof e&&\"\"==e.trim()?i.addClass(f,\"no-label\"):(i.removeClass(f,\"no-label\"),i.textOrHtml(u,e),\"<html>\"==e.substr(0,6)?i.att(u,{title:\"\"}):i.att(u,{title:e}))}),o.propString(this,\"placeholder\")(function(e){i.att(v,{placeholder:e})}),o.propString(this,\"width\")(function(e){f.style.width=e}),o.propBoolean(this,\"focus\")(function(e){e?v.focus():v.blur()}),o.prop(this,\"action\"),o.propAddClass(this,\"wide\"),o.propRemoveClass(this,\"visible\",\"hide\"),e=o.extend({action:!0,intl:!1,value:\"\",type:\"text\",placeholder:\"\",enabled:!0,validator:null,valid:!0,list:null,label:\"\",placeholder:\"\",size:10,width:\"auto\",focus:!1,wide:!1,visible:!0},e,this);var h=function(){if(i.removeClass(f,\"list\"),t.list&&0!=t.list.length){i.clear(p);var e=t.list,o=v.value.trim().toLowerCase();e=o.length>0?e.map(function(e,t){return[t,e.toLowerCase().indexOf(o)]}).filter(function(e){return e[1]>-1}).sort(function(e,l){var a=e[1]-l[1];if(0!=a)return a;var i=t.list[e[0]],o=t.list[l[0]];return i<o?-1:i>o?1:0}).map(function(e){var l=t.list[e[0]],a=e[1];return l.substr(0,a)+\"<b>\"+l.substr(a,o.length)+\"</b>\"+l.substr(a+o.length)}):e.sort(),r>0&&(e=e.slice(r).concat(e.slice(0,r))),a=e,e.forEach(function(a,o){var n=i.div();n.innerHTML=a,e[o]=n.textContent.trim(),i.add(p,n),i.on(n,{down:function(){l=!0},up:function(){l=!1,t.focus=!0},tap:function(){t.value=n.textContent.trim(),i.removeClass(f,\"list\")}})}),e.length>0?i.addClass(f,\"list\"):i.removeClass(f,\"list\")}},m=s(function(){t.intl?(t.value[d.value]=v.value,o.fire(t,\"value\",t.value)):t.value=v.value},300);v.addEventListener(\"keyup\",function(e){13==e.keyCode?(e.preventDefault(),e.stopPropagation(),i.hasClass(f,\"list\")?(i.removeClass(f,\"list\"),t.value=a[0]):!1!==t.valid&&(o.fire(t,\"value\",v.value),o.fire(t,\"action\",v.value))):27==e.keyCode?(i.removeClass(f,\"list\"),r=0,e.preventDefault(),e.stopPropagation()):40==e.keyCode&&i.hasClass(f,\"list\")?(r=(r+1)%a.length,h(),e.preventDefault(),e.stopPropagation()):38==e.keyCode&&i.hasClass(f,\"list\")?(r=(r+a.length-1)%a.length,h(),e.preventDefault(),e.stopPropagation()):(r=0,h(),m.fire())}),v.addEventListener(\"blur\",function(){t.intl?(t.value[d.value]=v.value,o.fire(t,\"value\",t.value)):t.value=v.value,l||i.removeClass(f,\"list\"),i.addClass(f,\"theme-elevation-2\"),i.removeClass(f,\"theme-elevation-8\"),i.removeClass(v,\"theme-color-bg-A1\"),o.fire(t,\"focus\",!1)}),v.addEventListener(\"focus\",function(){t.selectAll(),i.removeClass(f,\"theme-elevation-2\"),i.addClass(f,\"theme-elevation-8\"),i.addClass(v,\"theme-color-bg-A1\"),o.fire(t,\"focus\",!0)}),v.addEventListener(\"keydown\",function(e){}),this.validate()};r.prototype.validate=function(){var e=this.validator;if(e)try{this.valid=e(this.value)}catch(t){console.error(\"[wdg.text:validate] Exception = \",t),console.error(\"[wdg.text:validate] Validator = \",e)}},r.prototype.selectAll=function(){var e=this._input;return e.setSelectionRange(0,e.value.length),!0},t.exports=r,t.exports._=a});\n//# sourceMappingURL=wdg.text.js.map","map":{"version":3,"file":"wdg.text.js","sources":["wdg.text.js"],"sourcesContent":["/** @module wdg.text */require( 'wdg.text', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\n    var $ = require(\"dom\");\nvar DB = require(\"tfw.data-binding\");\nvar Lang = require(\"wdg.lang\");\nvar LaterAction = require(\"tfw.timer\").laterAction;\n\n/**\n * @class Text\n * @description  HTML5 text input with many options.\n *\n * @param opts.value {string} - .\n * @param opts.type {string} - One of the following strings: 'text', 'button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file', 'hidden', 'image', 'month', 'password', 'radio', 'range', 'reset', 'number', 'search', 'submit', 'tel', 'time', 'url', 'week'.\n * @param opts.placeholder {string} - .\n * @param opts.enabled {boolean} - .\n * @param opts.validator {string|function} - .\n * @param opts.valid {} - .\n * @param opts.list {} - .\n * @param opts.label {string} - .\n * @param opts.placeholder {string} - .\n * @param opts.size {} - .\n * @param opts.width {} - .\n * @param opts.focus {} - .\n * @param opts.wide {boolean} - .\n * @param opts.visible {boolean} - .\n */\nvar Text = function(opts) {\n    var that = this;\n\n    var dataListHasFocus = false;\n    var autocompleteProposals = [];\n    var autocompleteShift = 0;\n\n    var label = $.div( 'theme-label', 'theme-color-bg-1' );\n    var input = $.tag( 'input' );\n    var lang = new Lang({ small: true, visible: true });\n    var body = $.div('nowrap', [input, lang]);\n    var datalist = $.div( 'datalist', 'theme-elevation-12' );\n    this._input = input;\n    var elem = $.elem( this, 'div', 'wdg-text', 'theme-elevation-2', [label, body, datalist] );\n\n    DB.bind( lang, 'value', function(v) {\n        input.value = that.value[v] || '';\n        if( !that.focus ) {\n            input.focus();\n        }\n    });\n\n    DB.prop(this, 'value')(function(v) {\n        if( v === null || typeof v === 'undefined') v = '';\n        if( typeof v === 'number' || typeof v === 'boolean') v = '' + v;\n        if( typeof v !== 'string' ) {\n            if( input.value != v[lang.value] ) {\n                input.value = v[lang.value];\n            }\n            var subset = [];\n            var isoLang;\n            for( isoLang in v ) {\n                subset.push( isoLang );\n            }\n            lang.subset = subset;\n            that.intl = true;\n        } else {\n            // Very important!\n            // In Google Chrome, when you set a value to an input,\n            // the cursor is sent to the end.\n            if( input.value != v ) {\n                input.value = v;\n            }\n            that.intl = false;\n        }\n        that.validate();\n    });\n    DB.propBoolean(this, 'intl')(function(v) {\n        lang.visible = v;\n    });\n    DB.propEnum(['text', 'button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file',\n                 'hidden', 'image', 'month', 'password', 'radio', 'range', 'reset',\n                 'search', 'submit', 'tel', 'time', 'url', 'week'])(this, 'type')\n    (function(v) {\n        $.att(input, {type: v});\n        if( v == 'password' ) {\n            $.att(input, {autocomplete: 'off'});\n        }\n    });\n    DB.propStringArray(this, 'list')(function(v) {\n        $.clear( datalist );\n        $.removeClass( elem, \"list\" );\n        if (!Array.isArray( v )) return;\n        v.forEach(function ( item ) {\n            $.add( datalist, $.div( [item] ) );\n        });\n        if( v.length > 0 ) {\n            $.att( elem, \"list\" );\n        }\n    });\n    DB.propValidator(this, 'validator')(this.validate.bind( this ));\n    DB.propBoolean(this, 'valid')(function(v) {\n        if (v === null || !that.validator) {\n            $.removeClass( elem, \"valid\", \"no-valid\" );\n        } else {\n            if (v) {\n                $.addClass( elem, \"valid\" );\n                $.removeClass( elem, \"no-valid\" );\n            } else {\n                $.removeClass( elem, \"valid\" );\n                $.addClass( elem, \"no-valid\" );\n            }\n        }\n    });\n    DB.propBoolean(this, 'enabled')(function(v) {\n        if (v) {\n            $.removeAtt(input, 'disabled');\n        } else {\n            $.att(input, {disabled: v});\n        }\n    });\n    DB.propInteger(this, 'size')(function(v) {\n        if (v < 1) {\n            $.removeAtt(input, 'size');\n        } else {\n            $.att(input, {size: v});\n        }\n    });\n    DB.propString(this, 'label')(function(v) {\n        if (v === null || (typeof v === 'string' && v.trim() == '')) {\n            $.addClass(elem, 'no-label');\n        } else {\n            $.removeClass(elem, 'no-label');\n            $.textOrHtml(label, v);\n            if (v.substr(0, 6) == '<html>') {\n                $.att(label, {title: ''});\n            } else {\n                $.att(label, {title: v});\n            }\n        }\n    });\n    DB.propString(this, 'placeholder')(function(v) {\n        $.att(input, {placeholder: v});\n    });\n    DB.propString(this, 'width')(function(v) {\n        elem.style.width = v;\n    });\n    DB.propBoolean(this, 'focus')(function(v) {\n        if (v) input.focus();\n        else input.blur();\n    });\n    DB.prop(this, 'action');\n    DB.propAddClass(this, 'wide');\n    DB.propRemoveClass(this, 'visible', 'hide');\n\n    opts = DB.extend({\n        action: true,\n        intl: false,\n        value: '',\n        type: 'text',\n        placeholder: '',\n        enabled: true,\n        validator: null,\n        valid: true,\n        list: null,\n        label: '',\n        placeholder: '',\n        size: 10,\n        width: 'auto',\n        focus: false,\n        wide: false,\n        visible: true\n    }, opts, this);\n\n    var complete = function() {\n        $.removeClass( elem, \"list\" );\n        if (!that.list || that.list.length == 0) return;\n\n        $.clear( datalist );\n        var list = that.list; //.map(String.toLowerCase);\n        var needle = input.value.trim().toLowerCase();\n\n        if (needle.length > 0) {\n            list = list.map(function(itm, idx) {\n                return [idx, itm.toLowerCase().indexOf( needle )];\n            }).filter(function(itm) {\n                return itm[1] > -1;\n            }).sort(function(a, b) {\n                var d = a[1] - b[1];\n                if (d != 0) return d;\n                var sa = that.list[a[0]];\n                var sb = that.list[b[0]];\n                if (sa < sb) return -1;\n                if (sa > sb) return 1;\n                return 0;\n            }).map(function(itm) {\n                var t = that.list[itm[0]];\n                var i = itm[1];\n                return t.substr(0, i)\n                    + \"<b>\" + t.substr(i, needle.length) + \"</b>\"\n                    + t.substr(i + needle.length);\n            });\n        } else {\n            list = list.sort();\n        }\n        if (autocompleteShift > 0) {\n            // Put the current item to the top of the list.\n            // Use arrow keys to change `autocompleteShift`.\n            list = list.slice( autocompleteShift ).concat( list.slice( 0, autocompleteShift ) );\n        }\n        autocompleteProposals = list;\n\n        list.forEach(function (item, idx) {\n            var div = $.div();\n            div.innerHTML = item;\n            list[idx] = div.textContent.trim();\n            $.add( datalist, div );\n            $.on( div, {\n                down: function() {\n                    dataListHasFocus = true;\n                },\n                up: function() {\n                    dataListHasFocus = false;\n                    that.focus = true;\n                },\n                tap: function() {\n                    that.value = div.textContent.trim();\n                    $.removeClass( elem, 'list' );\n                }\n            });\n        });\n        if (list.length > 0) {\n            $.addClass( elem, \"list\" );\n        } else {\n            $.removeClass( elem, \"list\" );\n        }\n    };\n\n    var actionUpdateValue = LaterAction(function() {\n        if( !that.intl ) {\n            that.value = input.value;\n        } else {\n            that.value[lang.value] = input.value;\n            DB.fire( that, 'value', that.value );\n        }\n    }, 300);\n    input.addEventListener('keyup', function(evt) {\n        if (evt.keyCode == 13) {\n            evt.preventDefault();\n            evt.stopPropagation();\n            if ($.hasClass( elem, 'list' )) {\n                $.removeClass( elem, 'list' );\n                that.value = autocompleteProposals[0];\n            }\n            else if (that.valid !== false) {\n                DB.fire( that, 'value', input.value );\n                DB.fire( that, 'action', input.value );\n            }\n        }\n        else if (evt.keyCode == 27) {\n            $.removeClass( elem, \"list\" );\n            autocompleteShift = 0;\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else if (evt.keyCode == 40 && $.hasClass( elem, 'list' )) {\n            autocompleteShift = (autocompleteShift + 1) % autocompleteProposals.length;\n            complete();\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else if (evt.keyCode == 38 && $.hasClass( elem, 'list' )) {\n            autocompleteShift = (autocompleteShift + autocompleteProposals.length - 1)\n                % autocompleteProposals.length;\n            complete();\n            evt.preventDefault();\n            evt.stopPropagation();\n        }\n        else {\n            autocompleteShift = 0;\n            complete();\n            actionUpdateValue.fire();\n        }\n    });\n    input.addEventListener('blur', function() {\n        if( !that.intl ) {\n            that.value = input.value;\n        } else {\n            that.value[lang.value] = input.value;\n            DB.fire( that, 'value', that.value );\n        }\n        if (!dataListHasFocus) {\n            $.removeClass( elem, \"list\" );\n        }\n        $.addClass( elem, \"theme-elevation-2\" );\n        $.removeClass( elem, \"theme-elevation-8\" );\n        $.removeClass(input, 'theme-color-bg-A1');\n        DB.fire( that, 'focus', false );\n    });\n    input.addEventListener('focus', function() {\n        that.selectAll();\n        $.removeClass( elem, \"theme-elevation-2\" );\n        $.addClass( elem, \"theme-elevation-8\" );\n        $.addClass(input, 'theme-color-bg-A1');\n        DB.fire( that, 'focus', true );\n    });\n    input.addEventListener('keydown', function(evt) {\n    });\n\n    this.validate();\n};\n\n\n/**\n * Force value validation.\n */\nText.prototype.validate = function() {\n    var validator = this.validator;\n    if (!validator) return;\n    try {\n        this.valid = validator( this.value );\n    }\n    catch (ex) {\n        console.error(\"[wdg.text:validate] Exception = \", ex);\n        console.error(\"[wdg.text:validate] Validator = \", validator);\n    }\n};\n\n/**\n * Select whole text.\n * @return {this}\n */\nText.prototype.selectAll = function() {\n    var e = this._input;\n    e.setSelectionRange(0, e.value.length);\n    return true;\n};\n\nmodule.exports = Text;\n\n\n  \nmodule.exports._ = _;\n});"],"names":["require","module","exports","_","X","D","arguments","en","intl","all","$","DB","Lang","LaterAction","laterAction","Text","opts","that","this","dataListHasFocus","autocompleteProposals","autocompleteShift","label","div","input","tag","lang","small","visible","body","datalist","_input","elem","bind","v","value","focus","prop","isoLang","subset","push","validate","propBoolean","propEnum","att","type","autocomplete","propStringArray","clear","removeClass","Array","isArray","forEach","item","add","length","propValidator","validator","addClass","removeAtt","disabled","propInteger","size","propString","trim","textOrHtml","substr","title","placeholder","style","width","blur","propAddClass","propRemoveClass","extend","action","enabled","valid","list","wide","complete","needle","toLowerCase","map","itm","idx","indexOf","filter","sort","a","b","d","sa","sb","t","i","slice","concat","innerHTML","textContent","on","down","up","tap","actionUpdateValue","fire","addEventListener","evt","keyCode","preventDefault","stopPropagation","hasClass","selectAll","prototype","ex","console","error","e","setSelectionRange"],"mappings":"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"},"dependencies":["mod/$","mod/dom","mod/tfw.data-binding","mod/wdg.lang","mod/tfw.timer"]}