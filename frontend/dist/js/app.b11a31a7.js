(function(e){function t(t){for(var a,r,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},o={app:0},i=[];function s(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"8d8a05c8","chunk-e014b6d4":"b62277b2","chunk-ea52b846":"f5c5b48f"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1,"chunk-e014b6d4":1,"chunk-ea52b846":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"eb948715","chunk-e014b6d4":"837ed621","chunk-ea52b846":"a2d91239"}[e]+".css",o=c.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===a||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],p.parentNode.removeChild(p),n(i)},p.href=o;var g=document.getElementsByTagName("head")[0];g.appendChild(p)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0fae":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAolBMVEUAAAAuLy97f3+EiIiBhYV+goJdYGCHi4yOkpNxdHWdoqN0d3hoa2tYWlpNUFB2enozNDRrbm44Ojo+QECJjY9UV1dISkqbn6BvcnNgY2NtcHFjZmZRVFR5fH02NzessbJaXV2WmpuLj5BlaGg8Pj6hpaaTl5g7PDyYnJ0tLS0eHh5BQkKmq6yRlZZDRUWwtbYoKCgiIiKprq+zuLmus7SkqKnyr2dYAAAAAXRSTlMAQObYZgAABHpJREFUWMPt1ceymzAUgGFQRaJjeu9gU1zv+79aRHKzycZ1k0z+Gcbe6BtZc2Sk//1l1R9ysBsU6vkTUohpz4vWel/SY0yVYO4Pq/4OY4qH2IAqIz+Wh9R7g+IbFQLoVkHBzyeSti9T4yhJpZ1Btw++ruXBIcbLVsCxJDUMuYqgqvN5jaZXrT4YQymKM1qP3bVYz7JB2nZ4iaJjBxvJVqGgbldy2Dtl2g7GKxRSghGQiKG6+iqO9uFkGWQapsZ+gaI9h6akAbear0ftcJbXSB+G0taens4MwqoHoaTCfr7etl21JPFbQ4vj56RI1yBWAgjsxlzma6Ed9tZQJt5qaMw0n6JsQjBC4whAYyuX60zOcj6RRDd02wTgqX1lSckgULgCMkIvV+6fLMePEj1NVIAz7ZlrBEMSIYSDDgOmXo79ZOU7PUlKEmYImuRRqhNPTJtShcDlAQBmccusXGyq0WyWYQgSXVCPWwxGBCFQfVUAFje2barRWAYwyhLPS79HVX3IyhDRIED8Ute3QrNyP9LCDGNT0zfJl7ZCVN+jUBdIEgbEhGD5utHb0bactLFNjFmklyQiJNKSJsxgvSz3rUWKESMYYX4pimNsOaXGAIKZaQIMIXUV0VL1FNt3LU6FFUcQKd3teAzlvLQBcpWlV35V1y5FgCXeTr5DMTQKC2sNrcev4xHKuRcid+nFkHiGvxvaaV0d+Vd3xx1XrhSDJKY9v1xHOdcZVBY1nSz5z6T71tJvllkH3XHeWQajCtR3smw57dA6lrT1iCTSQF3FMWhAH1yOmrwyV2G+Jeft7met8xt5yKJBGAMNBd2tOjkaVeLpW/rWrEc10mSwUxlQlWA+lpaOXNMffMPwf7auvpGmqaeLQUvsu1aSIQ6YCSteKPs2o0jfVpZ6uV1HO2Squd0kiMzw/r4iEwWUmeL9Ne9kgmDcaJodmtt6SEXuFoXgkd9IVDz2zFx4gU5DBjNbxYi6taK4FGGwpdpRqT92YAz3nKn9XBh7HSIVUEXBamLkT42WCArLxspssvHWn3IGMVRo8808R1WBsBJMZ4TmotmvGLo1c+St/db2KaCHglxgEYBfSlV85VYEaxpZYvELMbXivURMzMe5qE877Lqklb+znsRUzLlLGBazVTSWTmvbt6zcGYZBzP0wOLunsJpz1cZLV8y7XK1ROg3T6vuGp0fJNmWZ+rjFzIqPIaZd0Z986Da+75WNFqsAAJPFthY+tTEQcAXQr0KVExcbHgk3RRPD6aWG8eyRQc4pnS9prlKmxwCwZGP8yckd6dnUhVf00uUTgnFobn/M62DJW9LzFg54fankFCJVTbx1kPeilyiBKby6YCuBWRiluTDeCQfjTKwYbZT0ZmYVdL7FzMgQ5+1Y+7ewJRhbJ2y8wWmnyZHeyu0Wx9HKdDLELEjvRTtsOYnneenqSG8Gu3C/17cRnd62VK6dTqkn7swH4tr5tKYfs86OOPjBed9aysP3t/xtC0TC+lCp9jnrpB8+h+3Pn7MOIumDnaX//e+f7AfsYnErCsYs9AAAAABJRU5ErkJggg=="},"133a":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("2b0e"),r=new a["a"]},3962:function(e,t,n){e.exports=n.p+"img/raven.804e34a9.png"},4265:function(e,t,n){},"48dc":function(e){e.exports=JSON.parse('{"languageName":"Polski","homeHeader":["Convocation to","free meeting scheduling tool","for groups."],"homeInfo":["With as few steps as setting up basic information for your event you’ll be able to share a link with your friends to choose available days and see which one suits you all the most.","Your friends may take part in the survey without registering, but you can create an account to easily keep track of multiple polls and choose whether to receive email or webhook notifications when your poll is updated."],"homeSuccess":"Survey created!","homeLinkInfo":"This is a link to your event. Send it to your group members in order to allow them to select days that fit them best. You can find this link later in the your events section of your account.","copy":"Kopiuj","linkCopied":"URL copied to clipboard","linkCopyingFailed":"Please copy the link manually!","defaultAvailability":"Dowolne godziny","name":"Twoje imię"}')},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=n("4eb5"),o=n.n(r),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",class:{"app--darken-background":e.signInModalVisible}},[n("Navigation",{on:{clickSignIn:e.toggleSignIn,checkIfLoggedIn:e.updateUserLoggedInState}}),n("router-view"),n("img",{staticClass:"hero",attrs:{src:e.heroImage}}),n("transition",{attrs:{name:"fade"}},[e.signInModalVisible?n("SignIn",{on:{close:e.closeSignIn,toggleLoading:e.toggleLoading,closeSignIn:e.closeSignIn,checkIfLoggedIn:e.updateUserLoggedInState}}):e._e()],1),n("transition",{attrs:{name:"fade"}},[e.isLoaderVisible?n("div",{staticClass:"loader-background"},[n("div",{staticClass:"loader"})]):e._e()])],1)},s=[],c=(n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nav"},[e._m(0),a("transition",{attrs:{name:"sidebar-transition"}},[e.sidebarDisplayed?a("div",{staticClass:"sidebar"},[a("img",{staticClass:"sidebar__icon",attrs:{src:n("0fae"),alt:"Button toggling navigation menu"},on:{click:e.toggleSidebar}}),a("ul",{staticClass:"sidebar__list"},[a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[a("router-link",{attrs:{to:"/"}},[e._v("Create event")])],1),e.userLoggedIn?a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[a("router-link",{attrs:{to:"/my-events"}},[e._v("Your events")])],1):e._e(),a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[a("router-link",{attrs:{to:"/donate"}},[e._v("Donate")])],1),a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[a("router-link",{attrs:{to:"/event/5e32069e1c9d440000cb867a"}},[e._v("ex event")])],1),a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[e.userLoggedIn?e._e():a("button",{staticClass:"sidebar__button",on:{click:function(t){return e.$emit("clickSignIn")}}},[e._v("Sign in")])]),a("li",{staticClass:"sidebar__item",on:{click:e.toggleSidebar}},[e.userLoggedIn?a("button",{staticClass:"sidebar__button",on:{click:e.logOut}},[e._v("Log out")]):e._e()])]),a("ul",{staticClass:"sidebar__list sidebar__languages"},e._l(e.languageSelection,(function(t){return a("li",{key:t+"-mobile",on:{click:function(n){return e.chooseLanguageMobile(t)}}},[e._v(" "+e._s(e.$t("languageName",t))+" ")])})),0)]):e._e()]),a("div",{staticClass:"nav__desktop"},[a("div",{staticClass:"nav__links"},[a("router-link",{staticClass:"nav__links-item",attrs:{to:"/"}},[e._v(e._s(e.homeLink))]),e.userLoggedIn?a("router-link",{staticClass:"nav__links-item",attrs:{to:"/my-events"}},[e._v("Your events")]):e._e(),a("div",{staticClass:"nav__languages",on:{mouseleave:function(t){e.languageHovered=!1}}},[a("button",{staticClass:"nav__links-item",on:{mouseover:function(t){e.languageHovered=!0},click:function(t){e.languageHovered=!e.languageHovered}}},[e._v(" "+e._s(e.$t("languageName"))+" ")]),a("transition",{attrs:{name:"slide-down"}},[e.languageHovered?a("div",{staticClass:"nav__languages-dropdown"},e._l(e.languageSelection,(function(t){return a("button",{key:"lang-"+t,staticClass:"nav__links-item",on:{click:function(n){return e.changeLocale(t)}}},[e._v(" "+e._s(e.$t("languageName",t))+" ")])})),0):e._e()])],1),a("router-link",{staticClass:"nav__links-item",attrs:{to:"/event/5e32069e1c9d440000cb867a"}},[e._v("exevent")]),e.userLoggedIn?e._e():a("button",{staticClass:"nav__links-item",on:{click:function(t){return e.$emit("clickSignIn")}}},[e._v("Sign in")]),e.userLoggedIn?a("button",{staticClass:"nav__links-item",on:{click:e.logOut}},[e._v("Log out")]):e._e()],1)]),a("div",{staticClass:"nav__mobile",on:{click:e.toggleSidebar}},[a("img",{staticClass:"nav__mobile-icon",attrs:{src:n("0fae"),alt:""}})])],1)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a",{staticClass:"nav__logo",attrs:{href:"/"}},[a("div",{staticClass:"nav__logo-icon"},[a("img",{attrs:{src:n("9d64"),alt:"Convocation logo"}})]),a("div",{staticClass:"nav__logo-name"},[e._v(" Convocation ")])])}],d=(n("96cf"),n("1da1")),p=n("f64f"),g="en",v="de",f="pl",m=[g,v,f],h=n("2f62");function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(c["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w={data:function(){return{languageHovered:!1,languages:m,sidebarDisplayed:!1}},computed:y({},Object(h["e"])(["userLoggedIn"]),{languageSelection:function(){var e=this;return this.languages.filter((function(t){return t!==e.$i18n.locale}))},homeLink:function(){return this.userLoggedIn?"Create event":"Home"}}),methods:y({},Object(h["d"])(["toggleLoader","clearUserData"]),{changeLocale:function(e){this.$i18n.locale=e,this.languageHovered=!1},toggleSidebar:function(){this.sidebarDisplayed=!this.sidebarDisplayed},chooseLanguageMobile:function(e){this.changeLocale(e),this.toggleSidebar()},logOut:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.toggleLoader(),e.prev=1,e.next=4,p["a"].call("logout");case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](1),console.error(e.t0);case 9:return e.prev=9,this.clearUserData(),this.toggleLoader(),this.$emit("checkIfLoggedIn"),"/"!==this.$route.path&&this.$router.push({path:"/"}),e.finish(9);case 15:case"end":return e.stop()}}),e,this,[[1,6,9,15]])})));function t(){return e.apply(this,arguments)}return t}()})},_=w,O=(n("d565"),n("2877")),k=Object(O["a"])(_,u,l,!1,null,"19fc0110",null),S=k.exports,j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sign-in"},[e._m(0),a("div",{staticClass:"sign-in__right"},[a("img",{staticClass:"sign-in__exit",attrs:{src:n("8c7b"),alt:"Close sign up modal window"},on:{click:function(t){return e.$emit("close")}}}),a("div",{staticClass:"sign-in__modes"},[a("button",{staticClass:"sign-in__mode",class:{"sign-in__mode--selected":e.modeSignIn},on:{click:function(t){return e.selectMode("signIn")}}},[e._v(" Sign in ")]),a("span",{staticClass:"sign-in__mode-separator"},[e._v(" or ")]),a("button",{staticClass:"sign-in__mode",class:{"sign-in__mode--selected":e.modeSignUp},on:{click:function(t){return e.selectMode("signUp")}}},[e._v(" Sign up ")])]),a("div",{staticClass:"sign-in__form"},[a("div",{staticClass:"sign-in__input",class:{"sign-in__input--alert":e.$v.username.$error}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{id:"username",type:"text",required:"",spellcheck:"false",autocomplete:"off"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),a("label",{staticClass:"event-input-label",attrs:{for:"username"}},[e._v(" Username "),e.$v.username.$error?a("span",[e._v(" - min. 3 characters ")]):e._e()])]),e.modeSignUp?a("div",{staticClass:"sign-in__input",class:{"sign-in__input--alert":e.$v.email.$error}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{id:"email",type:"text",required:"",spellcheck:"false",autocomplete:"off"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),a("label",{staticClass:"event-input-label",attrs:{for:"email"}},[e._v(" E-mail "),e.$v.email.$error?a("span",[e._v(" - invalid email ")]):e._e()])]):e._e(),a("div",{staticClass:"sign-in__input",class:{"sign-in__input--alert":e.$v.password.$error}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{id:"password",type:"password",required:"",spellcheck:"false",autocomplete:"off"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("label",{staticClass:"event-input-label",attrs:{for:"password"}},[e._v(" Password "),e.$v.password.$error?a("span",[e._v(" - min. 5 characters ")]):e._e()])]),e.modeSignUp?a("div",{staticClass:"sign-in__input",class:{"sign-in__input--alert":e.$v.passwordRepeated.$error}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordRepeated,expression:"passwordRepeated"}],attrs:{id:"passwordRepeated",type:"password",required:"",spellcheck:"false",autocomplete:"off"},domProps:{value:e.passwordRepeated},on:{input:function(t){t.target.composing||(e.passwordRepeated=t.target.value)}}}),a("label",{staticClass:"event-input-label",attrs:{for:"passwordRepeated"}},[e._v(" Confirm password "),e.$v.passwordRepeated.$error?a("span",[e._v(" - passwords do not match ")]):e._e()])]):e._e()]),a("button",{staticClass:"main-btn",on:{click:e.handleLoginAction}},[e.modeSignIn?a("span",[e._v(" Sign in ")]):a("span",[e._v(" Sign up ")])])])])},I=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sign-in__left"},[a("img",{attrs:{src:n("f0fc"),alt:"An armored warrior standing with a shield and spear, looking at the login form to the right"}})])}],D=(n("b0c0"),n("1dce")),C=n("b5ae"),L=n("133a");function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){Object(c["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var A={mixins:[D["validationMixin"]],validations:{username:{required:C["required"],minLength:Object(C["minLength"])(3)},password:{required:C["required"],minLength:Object(C["minLength"])(5)},passwordRepeated:{required:C["required"],sameAsPassword:Object(C["sameAs"])("password")},email:{required:C["required"],email:C["email"]}},data:function(){return{username:null,password:null,passwordRepeated:null,email:null,mode:"signIn"}},computed:{modeSignIn:function(){return"signIn"===this.mode},modeSignUp:function(){return"signUp"===this.mode}},methods:E({},Object(h["d"])(["toggleLoader"]),{selectMode:function(e){this.mode=e,this.$v.$reset()},handleLoginAction:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.validationFailed()){e.next=18;break}return t=this.modeSignIn?"login":"signup",n=this.modeSignIn?{userIdentifier:this.username,password:this.password}:{username:this.username,email:this.email,password:this.password,passwordRepeated:this.passwordRepeated},this.toggleLoader(),e.prev=4,e.next=7,p["a"].call(t,n);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](4),console.log(e.t0);case 12:return e.prev=12,this.$emit("checkIfLoggedIn"),this.toggleLoader(),this.$emit("closeSignIn"),e.finish(12);case 17:"login"===t&&"eventView"===this.$route.name&&L["a"].$emit("login");case 18:return e.abrupt("return");case 19:case"end":return e.stop()}}),e,this,[[4,9,12,17]])})));function t(){return e.apply(this,arguments)}return t}(),validationFailed:function(){return this.$v.$touch(),this.modeSignIn?this.$v.username.$error||this.$v.password.$error:this.$v.$invalid},listenForEnter:function(e){"Enter"===e.code&&this.handleLoginAction()}}),mounted:function(){document.addEventListener("keypress",this.listenForEnter)},beforeDestroy:function(){document.removeEventListener("keypress",this.listenForEnter)}},x=A,U=(n("9ac3"),Object(O["a"])(x,j,I,!1,null,"0c51f3d2",null)),T=U.exports;function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){Object(c["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N={components:{Navigation:S,SignIn:T},data:function(){return{signInModalVisible:!1}},computed:V({},Object(h["e"])(["isLoaderVisible"]),{heroImage:function(){return n("3962")}}),methods:V({},Object(h["d"])(["updateUserLoggedInState"]),{toggleSignIn:function(){this.signInModalVisible=!this.signInModalVisible},closeSignIn:function(){this.signInModalVisible=!1},toggleLoading:function(){this.loading=!this.loading}}),mounted:function(){this.updateUserLoggedInState()}},Y=N,$=(n("5c0b"),Object(O["a"])(Y,i,s,!1,null,null,null)),B=$.exports,M=(n("d3b7"),n("8c4f"));a["a"].use(M["a"]);var q=[{path:"/",name:"home",component:function(){return n.e("about").then(n.bind(null,"bb51"))}},{path:"/my-events",name:"myEvents",component:function(){return n.e("chunk-ea52b846").then(n.bind(null,"f94e"))}},{path:"/event/:id",name:"eventView",component:function(){return n.e("chunk-e014b6d4").then(n.bind(null,"3f2d"))}}],J=new M["a"]({mode:"history",base:"/",routes:q}),F=J,H=(n("e01a"),n("99af"),n("7db0"),n("4fad"),n("ac1f"),n("1276"),n("47d4")),W=n.n(H),z=(n("caad"),n("d81d"),n("2532"),n("498a"),function(){return document.cookie.split(";").map((function(e){return e.trim()})).includes("ccua=true")});function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){Object(c["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}a["a"].use(h["a"]);var Q=new h["a"].Store({state:{eventData:{},userInfo:{eventsAttending:[],eventsOwned:[],userData:{}},localEventData:{},usernameInEvent:null,isLoaderVisible:!1,isErrorPopupVisible:!1,userLoggedIn:!1},mutations:{toggleLoader:function(e){e.isLoaderVisible=!e.isLoaderVisible},saveMeetingDate:function(e,t){var n,r,o,i=K({},e.eventData),s=t.split("-"),c=null===i||void 0===i?void 0:null===(n=i.userDates)||void 0===n?void 0:null===(r=n[s[2]])||void 0===r?void 0:null===(o=r[s[1]])||void 0===o?void 0:o[s[0]];c&&c.selected?i.userDates[s[2]][s[1]][s[0]].selected=!1:c?i.userDates[s[2]][s[1]][s[0]].selected=!0:W()(i,"userDates.".concat(s[2],".").concat(s[1],".").concat(s[0]),{selected:!0}),a["a"].set(e,"eventData",i)},saveEventData:function(e,t){a["a"].set(e,"eventData",t);var n=t.attendees.find((function(e){return e.userId===t.userId})),r=n?n.name:null;r?a["a"].set(e,"usernameInEvent",r):a["a"].set(e,"usernameInEvent",t.userName)},saveUserData:function(e,t){a["a"].set(e,"userInfo",t)},selectDayAsAvailable:function(e,t){var n,r,o,i,s=K({},e.eventData),c=null===s||void 0===s?void 0:null===(n=s.userDates)||void 0===n?void 0:null===(r=n[t.year])||void 0===r?void 0:null===(o=r[t.month])||void 0===o?void 0:null===(i=o[t.day])||void 0===i?void 0:i.attendees;if(c){a["a"].delete(e.eventData.userDates[t.year][t.month][t.day],"attendees"),e.eventData.userDates[t.year][t.month][t.day].selected||a["a"].delete(e.eventData.userDates[t.year][t.month],[t.day]);var u=Object.entries(e.eventData.userDates[t.year][t.month]).length;0===u&&a["a"].delete(e.eventData.userDates[t.year],t.month);var l=Object.entries(e.eventData.userDates[t.year]).length;0===l&&a["a"].delete(e.eventData.userDates,t.year)}else{var d,p,g,v;W()(s,"userDates.".concat(t.year,".").concat(t.month,".").concat(t.day),{attendees:[{userId:"myUserId",time:""}],selected:null===s||void 0===s?void 0:null===(d=s.userDates)||void 0===d?void 0:null===(p=d[t.year])||void 0===p?void 0:null===(g=p[t.month])||void 0===g?void 0:null===(v=g[t.day])||void 0===v?void 0:v.selected})}a["a"].set(e,"eventData",s)},updateUsernameInEvent:function(e,t){e.usernameInEvent=t},updateUsername:function(e,t){e.userInfo.userData.username=t},updateEmail:function(e,t){e.userInfo.userData.email=t},updateEventTitle:function(e,t){e.userInfo.eventsOwned[t.eventIndex].eventName=t.title},updateEventDescription:function(e,t){e.userInfo.eventsOwned[t.eventIndex].description=t.description},updateEventEmailNotifications:function(e,t){e.userInfo.eventsOwned[t.eventIndex].emailNotifications=t.emailNotifications},updateEventWebhook:function(e,t){e.userInfo.eventsOwned[t.eventIndex].webhookUrl=t.webhook},updateTimeAvailability:function(e,t){var n=t.date.split("-");n[1]=n[1]-1,e.eventData.userDates[n[2]][n[1]][n[0]].attendees[0].time=t.updatedTime},updateUserLoggedInState:function(e){e.userLoggedIn=z()},clearUserData:function(e){e.userInfo={}},clearEventData:function(e){e.eventData={}}},getters:{isEventOwner:function(e){return e.eventData.ownerId===e.eventData.userId}},actions:{getUserData:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,n("toggleLoader"),e.prev=2,e.next=5,p["a"].call("getUserData");case 5:return a=e.sent,e.next=8,a.json();case 8:r=e.sent,n("saveUserData",r),e.next=14;break;case 12:e.prev=12,e.t0=e["catch"](2);case 14:return e.prev=14,n("toggleLoader"),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[2,12,14,17]])})));function t(t){return e.apply(this,arguments)}return t}()},modules:{}}),Z=n("a925"),X=n("b812"),ee=n("a3df"),te=n("48dc");a["a"].use(Z["a"]);var ne={en:ee,de:X,pl:te},ae=new Z["a"]({locale:"en",messages:ne}),re=ae;a["a"].config.productionTip=!1,a["a"].use(o.a),new a["a"]({router:F,store:Q,i18n:re,render:function(e){return e(B)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"8c7b":function(e,t,n){e.exports=n.p+"img/exit.36d5357c.png"},"9ac3":function(e,t,n){"use strict";var a=n("a7b0"),r=n.n(a);r.a},"9c0c":function(e,t,n){},"9d64":function(e,t,n){e.exports=n.p+"img/logo.4f381304.png"},a3df:function(e){e.exports=JSON.parse('{"languageName":"English","homeHeader":["Convocation is a","free meeting scheduling tool","for groups."],"homeInfo":["With as few steps as setting up basic information for your event you’ll be able to share a link with your friends to choose available days and see which one suits you all the most.","Your friends may take part in the survey without registering, but you can create an account to easily keep track of multiple polls and choose whether to receive email or webhook notifications when your poll is updated."],"homeSuccess":"Survey created!","homeLinkInfo":"This is a link to your event. Send it to your group members in order to allow them to select days that fit them best. That\'s where you can specify your own potential attendance, and where you can choose final event date(s).","copy":"Copy","linkCopied":"URL copied to clipboard!","linkCopyingFailed":"Please copy the link manually!","defaultAvailability":"Anytime","name":"Your name"}')},a7b0:function(e,t,n){},b812:function(e){e.exports=JSON.parse('{"languageName":"Deutsch","homeHeader":["Convocation ist ein","free meeting scheduling tool","for groups."],"homeInfo":["With as few steps as setting up basic information for your event you’ll be able to share a link with your friends to choose available days and see which one suits you all the most.","Your friends may take part in the survey without registering, but you can create an account to easily keep track of multiple polls and choose whether to receive email or webhook notifications when your poll is updated."],"homeSuccess":"Survey created!","homeLinkInfo":"This is a link to your event. Send it to your group members in order to allow them to select days that fit them best. You can find this link later in the your events section of your account.","copy":"Copy","linkCopied":"URL copied to clipboard","linkCopyingFailed":"Please copy the link manually!","defaultAvailability":"Anytime","name":"Name"}')},d565:function(e,t,n){"use strict";var a=n("4265"),r=n.n(a);r.a},f0fc:function(e,t,n){e.exports=n.p+"img/warrior.bec32490.png"},f64f:function(e,t,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("159b");var a=n("ade3"),r=n("d4ec"),o=n("bee2");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={"Content-Type":"application/json"},u={createEvent:function(){return{method:"POST",endpoint:"/event/create"}},deleteUser:function(){return{method:"DELETE",endpoint:"/user/delete"}},deleteEvent:function(e){return{method:"DELETE",endpoint:"/event/".concat(e)}},getEventData:function(e){return{method:"GET",endpoint:"/event/data/".concat(e)}},updateEventAvailability:function(){return{method:"POST",endpoint:"/event/update-availability"}},updateEventData:function(){return{method:"POST",endpoint:"/event/update-data"}},updateUserData:function(){return{method:"POST",endpoint:"/user/update"}},signup:function(){return{method:"POST",endpoint:"/auth/signup"}},login:function(){return{method:"POST",endpoint:"/auth/login"}},logout:function(){return{method:"GET",endpoint:"/auth/logout"}},getUserData:function(){return{method:"GET",endpoint:"/user/events"}}},l=function(){function e(){Object(r["a"])(this,e),this.headers=s({},c)}return Object(o["a"])(e,[{key:"call",value:function(e,t,n){var a=u[e](n),r=a.method,o=a.endpoint;return"POST"===r?fetch(o,{method:r,headers:c,credentials:"include",body:JSON.stringify(t)}):fetch(o,{method:r,headers:c,credentials:"include"})}}]),e}(),d=new l;t["a"]=d}});