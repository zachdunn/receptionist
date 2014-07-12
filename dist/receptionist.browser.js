function isDefined(n){return"undefined"==typeof n||""==n?!1:!0}function isFunction(n){return"function"==typeof n}function isString(n){return"string"==typeof n}function isObject(n){return null!=n&&"object"==typeof n}function isNumber(n){return"number"==typeof n}function isArray(n){return"[object Array]"===toString.call(n)}function isWindow(n){return n&&n.document&&n.location&&n.alert&&n.setInterval}function isArrayLike(n){if(null==n||isWindow(n))return!1;var t=n.length;return 1===n.nodeType&&t?!0:isString(n)||isArray(n)||0===t||"number"==typeof t&&t>0&&t-1 in n}function forEach(n,t,e){var r;if(n)if("function"==typeof n)for(r in n)"prototype"==r||"length"==r||"name"==r||n.hasOwnProperty&&!n.hasOwnProperty(r)||t.call(e,n[r],r);else if(n.forEach&&n.forEach!==forEach)n.forEach(t,e);else if(isArrayLike(n))for(r=0;r<n.length;r++)t.call(e,n[r],r);else for(r in n)n.hasOwnProperty(r)&&t.call(e,n[r],r);return n}function extend(n){return forEach(arguments,function(t){t!==n&&forEach(t,function(t,e){n[e]=t})}),n}function getObjects(n,t,e){var r=[];for(var i in n)n.hasOwnProperty(i)&&("object"==typeof n[i]?r=r.concat(getObjects(n[i],t,e)):i==t&&isString(n[t])&&n[t].toLowerCase()==e?r.push(n):i==t&&n[t]==e&&r.push(n));return r}function loadJSON(n,t,e){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?t&&t(JSON.parse(r.responseText)):e&&e(r))},r.open("GET",n,!0),r.send()}!function n(t,e,r){function i(o,a){if(!e[o]){if(!t[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(u)return u(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=e[o]={exports:{}};t[o][0].call(l.exports,function(n){var e=t[o][1][n];return i(e?e:n)},l,l.exports,n,t,e,r)}return e[o].exports}for(var u="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(n,t){(function(e){var r=n("underscore"),i=function(){function n(n){this.options=r.extend(l,n),this.setName(this.options.name),console.log('Receptionist started as "'+this.getName()+'"')}var t,e,i,u="",o=!1,a=!1,c={},l={name:"Robin"};return n.prototype.load=function(n,t){i=document.getElementById("listen"),searchedFor=document.getElementById("searchedFor"),matchedDisplay=document.getElementById("matched"),defaultOptions={name:"Robin",rosterURL:"people.json",imageBase:"http://static.onemightyroar.com/site-assets/images/roster/",voiceEnabled:!0},isDefined(n)&&extend(defaultOptions,n),c=defaultOptions,console.log(c),c.voiceEnabled&&this.loadSpeech(),loadJSON(c.rosterURL,function(n){e=n,console.log(e),t&&t()},function(n){error&&error(n)})},n.prototype.loadSpeech=function(){"webkitSpeechRecognition"in window?(t=new webkitSpeechRecognition,t.continuous=!0,t.interimResults=!1,t.onstart=function(){o=!0,u="",searchedFor.innerHTML="",i.textContent="Listening",console.log("Turned voice on")},t.onresult=function(n){console.log("Result in");for(var t="",e=n.resultIndex;e<n.results.length;++e)n.results[e].isFinal?u+=n.results[e][0].transcript:t+=n.results[e][0].transcript;""!=u&&(searchedFor.innerHTML='<strong>I heard:</strong> "'+u+'"',isDefined(a)&&a(u.toLowerCase()))},t.onerror=function(){},t.onend=function(){o=!1,i.textContent="Listen",console.log("Turned voice off")}):upgrade()},n.prototype.listen=function(n){return isDefined(n)&&(console.log("Assigning Callback"),a=n),o?void t.stop():void t.start()},n.prototype.setName=function(n){this.name=n},n.prototype.getName=function(){return this.name},n.prototype.showPerson=function(n){return n?void(matchedDisplay.innerHTML='<img width="400px" src="'+defaultOptions.imageBase+n.picture+'" alt="'+n.name+'"> <p>'+n.title+"</p>"):void console.log("We need a person to display")},n.prototype.upgrade=function(){console.log("Update to a webkit browser for speech")},n.prototype.search=function(n,t){isDefined(t)||(t=e);var r=getObjects(t,"name",n);return r},n}(this);t.exports=i,e.Receptionist=i}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{underscore:2}],2:[function(n,t,e){(function(){var n=this,r=n._,i={},u=Array.prototype,o=Object.prototype,a=Function.prototype,c=u.push,l=u.slice,f=u.concat,s=o.toString,p=o.hasOwnProperty,h=u.forEach,d=u.map,g=u.reduce,v=u.reduceRight,y=u.filter,m=u.every,w=u.some,b=u.indexOf,x=u.lastIndexOf,j=Array.isArray,_=Object.keys,O=a.bind,A=function(n){return n instanceof A?n:this instanceof A?void(this._wrapped=n):new A(n)};"undefined"!=typeof e?("undefined"!=typeof t&&t.exports&&(e=t.exports=A),e._=A):n._=A,A.VERSION="1.6.0";var E=A.each=A.forEach=function(n,t,e){if(null==n)return n;if(h&&n.forEach===h)n.forEach(t,e);else if(n.length===+n.length){for(var r=0,u=n.length;u>r;r++)if(t.call(e,n[r],r,n)===i)return}else for(var o=A.keys(n),r=0,u=o.length;u>r;r++)if(t.call(e,n[o[r]],o[r],n)===i)return;return n};A.map=A.collect=function(n,t,e){var r=[];return null==n?r:d&&n.map===d?n.map(t,e):(E(n,function(n,i,u){r.push(t.call(e,n,i,u))}),r)};var k="Reduce of empty array with no initial value";A.reduce=A.foldl=A.inject=function(n,t,e,r){var i=arguments.length>2;if(null==n&&(n=[]),g&&n.reduce===g)return r&&(t=A.bind(t,r)),i?n.reduce(t,e):n.reduce(t);if(E(n,function(n,u,o){i?e=t.call(r,e,n,u,o):(e=n,i=!0)}),!i)throw new TypeError(k);return e},A.reduceRight=A.foldr=function(n,t,e,r){var i=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return r&&(t=A.bind(t,r)),i?n.reduceRight(t,e):n.reduceRight(t);var u=n.length;if(u!==+u){var o=A.keys(n);u=o.length}if(E(n,function(a,c,l){c=o?o[--u]:--u,i?e=t.call(r,e,n[c],c,l):(e=n[c],i=!0)}),!i)throw new TypeError(k);return e},A.find=A.detect=function(n,t,e){var r;return R(n,function(n,i,u){return t.call(e,n,i,u)?(r=n,!0):void 0}),r},A.filter=A.select=function(n,t,e){var r=[];return null==n?r:y&&n.filter===y?n.filter(t,e):(E(n,function(n,i,u){t.call(e,n,i,u)&&r.push(n)}),r)},A.reject=function(n,t,e){return A.filter(n,function(n,r,i){return!t.call(e,n,r,i)},e)},A.every=A.all=function(n,t,e){t||(t=A.identity);var r=!0;return null==n?r:m&&n.every===m?n.every(t,e):(E(n,function(n,u,o){return(r=r&&t.call(e,n,u,o))?void 0:i}),!!r)};var R=A.some=A.any=function(n,t,e){t||(t=A.identity);var r=!1;return null==n?r:w&&n.some===w?n.some(t,e):(E(n,function(n,u,o){return r||(r=t.call(e,n,u,o))?i:void 0}),!!r)};A.contains=A.include=function(n,t){return null==n?!1:b&&n.indexOf===b?-1!=n.indexOf(t):R(n,function(n){return n===t})},A.invoke=function(n,t){var e=l.call(arguments,2),r=A.isFunction(t);return A.map(n,function(n){return(r?t:n[t]).apply(n,e)})},A.pluck=function(n,t){return A.map(n,A.property(t))},A.where=function(n,t){return A.filter(n,A.matches(t))},A.findWhere=function(n,t){return A.find(n,A.matches(t))},A.max=function(n,t,e){if(!t&&A.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var r=-1/0,i=-1/0;return E(n,function(n,u,o){var a=t?t.call(e,n,u,o):n;a>i&&(r=n,i=a)}),r},A.min=function(n,t,e){if(!t&&A.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var r=1/0,i=1/0;return E(n,function(n,u,o){var a=t?t.call(e,n,u,o):n;i>a&&(r=n,i=a)}),r},A.shuffle=function(n){var t,e=0,r=[];return E(n,function(n){t=A.random(e++),r[e-1]=r[t],r[t]=n}),r},A.sample=function(n,t,e){return null==t||e?(n.length!==+n.length&&(n=A.values(n)),n[A.random(n.length-1)]):A.shuffle(n).slice(0,Math.max(0,t))};var S=function(n){return null==n?A.identity:A.isFunction(n)?n:A.property(n)};A.sortBy=function(n,t,e){return t=S(t),A.pluck(A.map(n,function(n,r,i){return{value:n,index:r,criteria:t.call(e,n,r,i)}}).sort(function(n,t){var e=n.criteria,r=t.criteria;if(e!==r){if(e>r||void 0===e)return 1;if(r>e||void 0===r)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,e,r){var i={};return e=S(e),E(t,function(u,o){var a=e.call(r,u,o,t);n(i,a,u)}),i}};A.groupBy=F(function(n,t,e){A.has(n,t)?n[t].push(e):n[t]=[e]}),A.indexBy=F(function(n,t,e){n[t]=e}),A.countBy=F(function(n,t){A.has(n,t)?n[t]++:n[t]=1}),A.sortedIndex=function(n,t,e,r){e=S(e);for(var i=e.call(r,t),u=0,o=n.length;o>u;){var a=u+o>>>1;e.call(r,n[a])<i?u=a+1:o=a}return u},A.toArray=function(n){return n?A.isArray(n)?l.call(n):n.length===+n.length?A.map(n,A.identity):A.values(n):[]},A.size=function(n){return null==n?0:n.length===+n.length?n.length:A.keys(n).length},A.first=A.head=A.take=function(n,t,e){return null==n?void 0:null==t||e?n[0]:0>t?[]:l.call(n,0,t)},A.initial=function(n,t,e){return l.call(n,0,n.length-(null==t||e?1:t))},A.last=function(n,t,e){return null==n?void 0:null==t||e?n[n.length-1]:l.call(n,Math.max(n.length-t,0))},A.rest=A.tail=A.drop=function(n,t,e){return l.call(n,null==t||e?1:t)},A.compact=function(n){return A.filter(n,A.identity)};var T=function(n,t,e){return t&&A.every(n,A.isArray)?f.apply(e,n):(E(n,function(n){A.isArray(n)||A.isArguments(n)?t?c.apply(e,n):T(n,t,e):e.push(n)}),e)};A.flatten=function(n,t){return T(n,t,[])},A.without=function(n){return A.difference(n,l.call(arguments,1))},A.partition=function(n,t){var e=[],r=[];return E(n,function(n){(t(n)?e:r).push(n)}),[e,r]},A.uniq=A.unique=function(n,t,e,r){A.isFunction(t)&&(r=e,e=t,t=!1);var i=e?A.map(n,e,r):n,u=[],o=[];return E(i,function(e,r){(t?r&&o[o.length-1]===e:A.contains(o,e))||(o.push(e),u.push(n[r]))}),u},A.union=function(){return A.uniq(A.flatten(arguments,!0))},A.intersection=function(n){var t=l.call(arguments,1);return A.filter(A.uniq(n),function(n){return A.every(t,function(t){return A.contains(t,n)})})},A.difference=function(n){var t=f.apply(u,l.call(arguments,1));return A.filter(n,function(n){return!A.contains(t,n)})},A.zip=function(){for(var n=A.max(A.pluck(arguments,"length").concat(0)),t=new Array(n),e=0;n>e;e++)t[e]=A.pluck(arguments,""+e);return t},A.object=function(n,t){if(null==n)return{};for(var e={},r=0,i=n.length;i>r;r++)t?e[n[r]]=t[r]:e[n[r][0]]=n[r][1];return e},A.indexOf=function(n,t,e){if(null==n)return-1;var r=0,i=n.length;if(e){if("number"!=typeof e)return r=A.sortedIndex(n,t),n[r]===t?r:-1;r=0>e?Math.max(0,i+e):e}if(b&&n.indexOf===b)return n.indexOf(t,e);for(;i>r;r++)if(n[r]===t)return r;return-1},A.lastIndexOf=function(n,t,e){if(null==n)return-1;var r=null!=e;if(x&&n.lastIndexOf===x)return r?n.lastIndexOf(t,e):n.lastIndexOf(t);for(var i=r?e:n.length;i--;)if(n[i]===t)return i;return-1},A.range=function(n,t,e){arguments.length<=1&&(t=n||0,n=0),e=arguments[2]||1;for(var r=Math.max(Math.ceil((t-n)/e),0),i=0,u=new Array(r);r>i;)u[i++]=n,n+=e;return u};var N=function(){};A.bind=function(n,t){var e,r;if(O&&n.bind===O)return O.apply(n,l.call(arguments,1));if(!A.isFunction(n))throw new TypeError;return e=l.call(arguments,2),r=function(){if(!(this instanceof r))return n.apply(t,e.concat(l.call(arguments)));N.prototype=n.prototype;var i=new N;N.prototype=null;var u=n.apply(i,e.concat(l.call(arguments)));return Object(u)===u?u:i}},A.partial=function(n){var t=l.call(arguments,1);return function(){for(var e=0,r=t.slice(),i=0,u=r.length;u>i;i++)r[i]===A&&(r[i]=arguments[e++]);for(;e<arguments.length;)r.push(arguments[e++]);return n.apply(this,r)}},A.bindAll=function(n){var t=l.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return E(t,function(t){n[t]=A.bind(n[t],n)}),n},A.memoize=function(n,t){var e={};return t||(t=A.identity),function(){var r=t.apply(this,arguments);return A.has(e,r)?e[r]:e[r]=n.apply(this,arguments)}},A.delay=function(n,t){var e=l.call(arguments,2);return setTimeout(function(){return n.apply(null,e)},t)},A.defer=function(n){return A.delay.apply(A,[n,1].concat(l.call(arguments,1)))},A.throttle=function(n,t,e){var r,i,u,o=null,a=0;e||(e={});var c=function(){a=e.leading===!1?0:A.now(),o=null,u=n.apply(r,i),r=i=null};return function(){var l=A.now();a||e.leading!==!1||(a=l);var f=t-(l-a);return r=this,i=arguments,0>=f?(clearTimeout(o),o=null,a=l,u=n.apply(r,i),r=i=null):o||e.trailing===!1||(o=setTimeout(c,f)),u}},A.debounce=function(n,t,e){var r,i,u,o,a,c=function(){var l=A.now()-o;t>l?r=setTimeout(c,t-l):(r=null,e||(a=n.apply(u,i),u=i=null))};return function(){u=this,i=arguments,o=A.now();var l=e&&!r;return r||(r=setTimeout(c,t)),l&&(a=n.apply(u,i),u=i=null),a}},A.once=function(n){var t,e=!1;return function(){return e?t:(e=!0,t=n.apply(this,arguments),n=null,t)}},A.wrap=function(n,t){return A.partial(t,n)},A.compose=function(){var n=arguments;return function(){for(var t=arguments,e=n.length-1;e>=0;e--)t=[n[e].apply(this,t)];return t[0]}},A.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},A.keys=function(n){if(!A.isObject(n))return[];if(_)return _(n);var t=[];for(var e in n)A.has(n,e)&&t.push(e);return t},A.values=function(n){for(var t=A.keys(n),e=t.length,r=new Array(e),i=0;e>i;i++)r[i]=n[t[i]];return r},A.pairs=function(n){for(var t=A.keys(n),e=t.length,r=new Array(e),i=0;e>i;i++)r[i]=[t[i],n[t[i]]];return r},A.invert=function(n){for(var t={},e=A.keys(n),r=0,i=e.length;i>r;r++)t[n[e[r]]]=e[r];return t},A.functions=A.methods=function(n){var t=[];for(var e in n)A.isFunction(n[e])&&t.push(e);return t.sort()},A.extend=function(n){return E(l.call(arguments,1),function(t){if(t)for(var e in t)n[e]=t[e]}),n},A.pick=function(n){var t={},e=f.apply(u,l.call(arguments,1));return E(e,function(e){e in n&&(t[e]=n[e])}),t},A.omit=function(n){var t={},e=f.apply(u,l.call(arguments,1));for(var r in n)A.contains(e,r)||(t[r]=n[r]);return t},A.defaults=function(n){return E(l.call(arguments,1),function(t){if(t)for(var e in t)void 0===n[e]&&(n[e]=t[e])}),n},A.clone=function(n){return A.isObject(n)?A.isArray(n)?n.slice():A.extend({},n):n},A.tap=function(n,t){return t(n),n};var M=function(n,t,e,r){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof A&&(n=n._wrapped),t instanceof A&&(t=t._wrapped);var i=s.call(n);if(i!=s.call(t))return!1;switch(i){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var u=e.length;u--;)if(e[u]==n)return r[u]==t;var o=n.constructor,a=t.constructor;if(o!==a&&!(A.isFunction(o)&&o instanceof o&&A.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1;e.push(n),r.push(t);var c=0,l=!0;if("[object Array]"==i){if(c=n.length,l=c==t.length)for(;c--&&(l=M(n[c],t[c],e,r)););}else{for(var f in n)if(A.has(n,f)&&(c++,!(l=A.has(t,f)&&M(n[f],t[f],e,r))))break;if(l){for(f in t)if(A.has(t,f)&&!c--)break;l=!c}}return e.pop(),r.pop(),l};A.isEqual=function(n,t){return M(n,t,[],[])},A.isEmpty=function(n){if(null==n)return!0;if(A.isArray(n)||A.isString(n))return 0===n.length;for(var t in n)if(A.has(n,t))return!1;return!0},A.isElement=function(n){return!(!n||1!==n.nodeType)},A.isArray=j||function(n){return"[object Array]"==s.call(n)},A.isObject=function(n){return n===Object(n)},E(["Arguments","Function","String","Number","Date","RegExp"],function(n){A["is"+n]=function(t){return s.call(t)=="[object "+n+"]"}}),A.isArguments(arguments)||(A.isArguments=function(n){return!(!n||!A.has(n,"callee"))}),"function"!=typeof/./&&(A.isFunction=function(n){return"function"==typeof n}),A.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},A.isNaN=function(n){return A.isNumber(n)&&n!=+n},A.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==s.call(n)},A.isNull=function(n){return null===n},A.isUndefined=function(n){return void 0===n},A.has=function(n,t){return p.call(n,t)},A.noConflict=function(){return n._=r,this},A.identity=function(n){return n},A.constant=function(n){return function(){return n}},A.property=function(n){return function(t){return t[n]}},A.matches=function(n){return function(t){if(t===n)return!0;for(var e in n)if(n[e]!==t[e])return!1;return!0}},A.times=function(n,t,e){for(var r=Array(Math.max(0,n)),i=0;n>i;i++)r[i]=t.call(e,i);return r},A.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},A.now=Date.now||function(){return(new Date).getTime()};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=A.invert(I.escape);var q={escape:new RegExp("["+A.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+A.keys(I.unescape).join("|")+")","g")};A.each(["escape","unescape"],function(n){A[n]=function(t){return null==t?"":(""+t).replace(q[n],function(t){return I[n][t]})}}),A.result=function(n,t){if(null==n)return void 0;var e=n[t];return A.isFunction(e)?e.call(n):e},A.mixin=function(n){E(A.functions(n),function(t){var e=A[t]=n[t];A.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),P.call(this,e.apply(A,n))}})};var B=0;A.uniqueId=function(n){var t=++B+"";return n?n+t:t},A.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var L=/(.)^/,D={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},C=/\\|'|\r|\n|\t|\u2028|\u2029/g;A.template=function(n,t,e){var r;e=A.defaults({},e,A.templateSettings);var i=new RegExp([(e.escape||L).source,(e.interpolate||L).source,(e.evaluate||L).source].join("|")+"|$","g"),u=0,o="__p+='";n.replace(i,function(t,e,r,i,a){return o+=n.slice(u,a).replace(C,function(n){return"\\"+D[n]}),e&&(o+="'+\n((__t=("+e+"))==null?'':_.escape(__t))+\n'"),r&&(o+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(o+="';\n"+i+"\n__p+='"),u=a+t.length,t}),o+="';\n",e.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{r=new Function(e.variable||"obj","_",o)}catch(a){throw a.source=o,a}if(t)return r(t,A);var c=function(n){return r.call(this,n,A)};return c.source="function("+(e.variable||"obj")+"){\n"+o+"}",c},A.chain=function(n){return A(n).chain()};var P=function(n){return this._chain?A(n).chain():n};A.mixin(A),E(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=u[n];A.prototype[n]=function(){var e=this._wrapped;return t.apply(e,arguments),"shift"!=n&&"splice"!=n||0!==e.length||delete e[0],P.call(this,e)}}),E(["concat","join","slice"],function(n){var t=u[n];A.prototype[n]=function(){return P.call(this,t.apply(this._wrapped,arguments))}}),A.extend(A.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return A})}).call(this)},{}]},{},[1]);