!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,e,n){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e){function n(t){return Array.isArray(t)?t:Array.from(t)}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,e,n){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=17)}([function(t,e){"use strict";e.b=function(t){return t[Symbol.iterator]()},e.a=function(t){for(var e,n=[];!(e=t.next()).done;)n.push(e.value);return n}},function(t,e){"use strict";e.a=function(t){return!!t&&!0===t.______serializedFunctionCall}},function(t,e){"use strict";e.c=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];return{functionIds:[t].concat(r),type:n.FunctionRequest}},e.f=function(t){return{result:t,type:n.WorkerResult}},e.e=function(t){var e={},r=!0,i=!1,a=void 0;try{for(var o,u=Object.getOwnPropertyNames(t)[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var s=o.value;e[s]=JSON.stringify(t[s])}}catch(t){i=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(i)throw a}}return{error:e,type:n.FunctionExecutionError}},e.b=function(t){return t.type===n.ScheduleTask},e.a=function(t){return t.type===n.InitializeWorker},e.d=function(t){return t.type===n.FunctionResponse},e.g=function(t){return t.type===n.Stop};var n;!function(t){t[t.InitializeWorker=0]="InitializeWorker",t[t.ScheduleTask=1]="ScheduleTask",t[t.FunctionRequest=2]="FunctionRequest",t[t.FunctionResponse=3]="FunctionResponse",t[t.WorkerResult=4]="WorkerResult",t[t.FunctionExecutionError=5]="FunctionExecutionError",t[t.Stop=6]="Stop"}(n||(n={}))},function(t,e,n){"use strict";var r=n(2),i=n(6);e.a=function(){function t(e){o(this,t),this.functionCache=e,this.id=Number.NaN,this.state=new i.a(this)}return u(t,[{key:"changeState",value:function(t){this.state=t,this.state.enter()}},{key:"onMessage",value:function(t){if(n.i(r.g)(t.data))close();else if(!this.state.onMessage(t))throw new Error("Message with type "+t.data.type+" cannot be handled by slave "+this)}},{key:"postMessage",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){postMessage(t)})},{key:"toString",value:function(){return"BrowserSlave { id: "+this.id+", state: '"+this.state.name+"' }"}}]),t}()},function(t,e,n){"use strict";var r=n(16);e.a=function(){function t(){o(this,t),this.cache=new r.a}return u(t,[{key:"getFunction",value:function(t){return this.cache.get(t.identifier)}},{key:"registerFunction",value:function(t){var e=Function.apply(null,[].concat(a(t.argumentNames),[t.body]));return this.cache.set(t.id.identifier,e),e}},{key:"registerStaticFunction",value:function(t,e){if(this.has(t))throw new Error("The given function id '"+t.identifier+"' is already used by another function registration, the id needs to be unique.");this.cache.set(t.identifier,e)}},{key:"has",value:function(t){return this.cache.has(t.identifier)}}]),t}()},function(t,e,n){"use strict";var r=n(12),i=n(15),a=n(9),o=n(10),u=n(11),s=n(13),c=n(14),l=n(0);e.a=function(t){t.registerStaticFunction(r.a.IDENTITY,i.a),t.registerStaticFunction(r.a.FILTER,a.a),t.registerStaticFunction(r.a.MAP,o.a),t.registerStaticFunction(r.a.PARALLEL_JOB_EXECUTOR,u.a),t.registerStaticFunction(r.a.RANGE,s.a),t.registerStaticFunction(r.a.REDUCE,c.a),t.registerStaticFunction(r.a.TO_ITERATOR,l.b)}},function(t,e,s){"use strict";var c=s(7),l=s(2),f=function(){function t(e,n){o(this,t),this.name=e,this.slave=n}return u(t,[{key:"enter",value:function(){}},{key:"onMessage",value:function(){return!1}}]),t}();e.a=function(t){function e(t){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"Default",t))}return i(e,t),u(e,[{key:"onMessage",value:function(t){return!!s.i(l.a)(t.data)&&(this.slave.id=t.data.workerId,this.slave.changeState(new h(this.slave)),!0)}}]),e}(f);var h=function(t){function e(t){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"Idle",t))}return i(e,t),u(e,[{key:"onMessage",value:function(t){var e=this;if(!s.i(l.b)(t.data))return!1;var r=t.data.task,i=r.usedFunctionIds.filter(function(t){return!e.slave.functionCache.has(t)});if(0===i.length)this.slave.changeState(new d(this.slave,r));else{var o=n(i),u=o[0],c=o.slice(1);this.slave.postMessage(s.i(l.c).apply(void 0,[u].concat(a(c)))),this.slave.changeState(new v(this.slave,r))}return!0}}]),e}(f),v=function(t){function e(t,n){var i;return o(this,e),i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"WaitingForFunctionDefinition",t)),i.task=n,i}return i(e,t),u(e,[{key:"onMessage",value:function(t){var e=t.data;if(s.i(l.d)(e)){if(0<e.missingFunctions.length){var n=e.missingFunctions.map(function(t){return t.identifier}).join(", ");this.slave.postMessage(s.i(l.e)(new Error("The function ids ["+n+"] could not be resolved by slave "+this.slave.id+"."))),this.slave.changeState(new h(this.slave))}else{var r=!0,i=!1,a=void 0;try{for(var o,u=e.functions[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var c=o.value;this.slave.functionCache.registerFunction(c)}}catch(t){i=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(i)throw a}}this.slave.changeState(new d(this.slave,this.task))}return!0}return!1}}]),e}(f),d=function(t){function e(t,n){var i;return o(this,e),i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"Executing",t)),i.task=n,i}return i(e,t),u(e,[{key:"enter",value:function(){var t=new c.a(this.slave.functionCache);try{var e=t.deserializeFunctionCall(this.task.main),n=e({functionCallDeserializer:t});this.slave.postMessage(s.i(l.f)(n))}catch(t){this.slave.postMessage(s.i(l.e)(t))}this.slave.changeState(new h(this.slave))}}]),e}(f)},function(t,e,n){"use strict";var r=n(1);e.a=function(){function t(e){o(this,t),this.functionLookupTable=e}return u(t,[{key:"deserializeFunctionCall",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=this.functionLookupTable.getFunction(t.functionId);if(!a)throw new Error("The function with the id "+t.functionId.identifier+" could not be retrieved while deserializing the function call. Is the function correctly registered?");var o=t.parameters||[];return i&&(o=o.map(function(t){return n.i(r.a)(t)?e.deserializeFunctionCall(t):t})),function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return a.apply(void 0,o.concat(e))}}}]),t}()},function(t,e){"use strict";e.a=function(t,e){return{_______isFunctionId:!0,identifier:t+"-"+e}}},function(t,e){"use strict";e.a=function(t,e,n){return{next:function(){for(var r=void 0;!(r=t.next()).done;)if(e(r.value,n))return r;return r}}}},function(t,e){"use strict";e.a=function(t,e,n){return{next:function(){var r=t.next();return r.done?{done:!0}:{done:r.done,value:e(r.value,n)}}}}},function(t,e,n){"use strict";function r(t,e){var r={},i=!0,o=!1,u=void 0;try{for(var s,c=t.environments[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var l=s.value,f=void 0;f=n.i(a.a)(l)?e.deserializeFunctionCall(l)():l,Object.assign(r,f)}}catch(t){o=!0,u=t}finally{try{!i&&c.return&&c.return()}finally{if(o)throw u}}return Object.assign({},{taskIndex:t.taskIndex,valuesPerTask:t.valuesPerTask},r)}var i=n(0),a=n(1);e.a=function(t,e){var a=e.functionCallDeserializer,o=r(t,a),u=a.deserializeFunctionCall(t.generator,!0),s=u(o),c=!0,l=!1,f=void 0;try{for(var h,v=t.operations[Symbol.iterator]();!(c=(h=v.next()).done);c=!0){var d=h.value,y=a.deserializeFunctionCall(d.iterator),p=a.deserializeFunctionCall(d.iteratee);s=y(s,p,o)}}catch(t){l=!0,f=t}finally{try{!c&&v.return&&v.return()}finally{if(l)throw f}}return n.i(i.a)(s)}},function(t,e,n){"use strict";var r=n(8),i={FILTER:n.i(r.a)("parallel",0),IDENTITY:n.i(r.a)("parallel",1),MAP:n.i(r.a)("parallel",2),PARALLEL_JOB_EXECUTOR:n.i(r.a)("parallel",3),RANGE:n.i(r.a)("parallel",4),REDUCE:n.i(r.a)("parallel",5),TIMES:n.i(r.a)("parallel",6),TO_ITERATOR:n.i(r.a)("parallel",7)};e.a=i},function(t,e){"use strict";e.a=function(t,e,n){var r=Math.max(Math.floor((e-t)/(n||1)),0),i=t;return{next:function(){var t=i;return i+=n,0==r--?{done:!0}:{done:!1,value:t}}}}},function(t,e,n){"use strict";var r=n(0);e.a=function(t,e,i,a){for(var o=t,u=void 0;!(u=e.next()).done;)o=i(o,u.value,a);return n.i(r.b)([o])}},function(t,e){"use strict";e.a=function(t){return t}},function(t,e){"use strict";e.a=function(){function t(){o(this,t),this.data={}}return u(t,[{key:"get",value:function(t){var e=this.toInternalKey(t);return this.has(t)?this.data[e]:void 0}},{key:"has",value:function(t){return this.hasOwnProperty.call(this.data,this.toInternalKey(t))}},{key:"set",value:function(t,e){this.data[this.toInternalKey(t)]=e}},{key:"clear",value:function(){this.data={}}},{key:"toInternalKey",value:function(t){return"@"+t}}]),t}()},function(t,e,n){"use strict";var r=n(3),i=n(4),a=n(5),o=new i.a;n.i(a.a)(o);var u=new r.a(o);onmessage=function(){u.onMessage.apply(u,arguments)}}])}]);
//# sourceMappingURL=worker-slave.parallel.js.map