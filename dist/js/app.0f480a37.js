(function(t){function e(e){for(var r,a,i=e[0],c=e[1],u=e[2],d=0,l=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);p&&p(e);while(l.length)l.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},o={app:0},s=[];function i(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-20f5798a":"26d0be53","chunk-2d21a3d2":"094a5025","chunk-4ba12e1c":"8e7a0d92","chunk-ef9b224e":"81392b54","chunk-ef9def92":"d73e5f6c"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-20f5798a":1,"chunk-4ba12e1c":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-20f5798a":"7df38c1d","chunk-2d21a3d2":"31d6cfe0","chunk-4ba12e1c":"b75bf511","chunk-ef9b224e":"31d6cfe0","chunk-ef9def92":"31d6cfe0"}[t]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===o))return e()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){u=l[i],d=u.getAttribute("data-href");if(d===r||d===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[t],p.parentNode.removeChild(p),n(s)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=s);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=i(t);var l=new Error;u=function(e){d.onerror=d.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[t]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var p=d;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"2fc4":function(t,e,n){},"4ded":function(t,e,n){"use strict";n("9d6c")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("alerts"),n(t.layout,{tag:"component"},[n("router-view")],1)],1)},o=[],s=(n("d3b7"),n("3ca3"),n("ddb0"),function(){return n.e("chunk-4ba12e1c").then(n.bind(null,"8fe3"))}),i={name:"App",data:function(){return{}},components:{alerts:s},computed:{layout:function(){return this.$route.meta.layout||"default-layout"}}},c=i,u=n("2877"),d=Object(u["a"])(c,a,o,!1,null,null,null),l=d.exports,p=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"back-btn",on:{click:function(e){return t.$router.back()}}},[n("v-icon",{staticClass:"ml-0"},[t._v("chevron_left")]),t._v("назад ")],1),t.product.id?n("h1",{staticClass:"display-1"},[t._v(t._s(t.product.name))]):n("h1",{staticClass:"display-1"},[n("h1",{staticClass:"display-1"},[t._v("Новая продукция")])]),n("v-divider",{staticClass:"mt-2 mb-8"}),n("v-row",{staticClass:"form-grid"},[n("v-col",{attrs:{cols:"7"}},[n("v-row",[n("v-col",{attrs:{cols:"9"}},[n("v-text-field",{attrs:{label:"Наименование",outlined:""},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}})],1),n("v-col",{attrs:{cols:"3"}},[n("v-text-field",{attrs:{label:"Код",outlined:""},model:{value:t.product.classification_number,callback:function(e){t.$set(t.product,"classification_number",e)},expression:"product.classification_number"}})],1)],1),n("v-row",[n("v-col",{attrs:{cols:"9"}},[n("v-text-field",{attrs:{label:"Файл",outlined:""},model:{value:t.product.files,callback:function(e){t.$set(t.product,"files",e)},expression:"product.files"}})],1),n("v-col",{attrs:{cols:"3"}},[n("v-text-field",{attrs:{label:"Родитель",outlined:""},model:{value:t.product.parent_id,callback:function(e){t.$set(t.product,"parent_id",t._n(e))},expression:"product.parent_id"}})],1)],1),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-textarea",{attrs:{label:"Описание",outlined:""},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}})],1)],1)],1),n("v-col",{attrs:{cols:"5"}},[n("vue-dropzone",{ref:"myVueDropzone",staticClass:"dropzone",attrs:{id:"dropzone",options:t.dropzoneOptions}})],1)],1),t.product.id?n("div",[n("v-btn",{staticClass:"mr-3",attrs:{"x-large":"",depressed:"",color:"light-grey"},on:{click:t.updateProduct}},[t._v("Обновить")]),n("v-btn",{attrs:{"x-large":"",depressed:"",color:"light-red"},on:{click:t.deleteProduct}},[t._v("Удалить продукцию")])],1):n("div",[n("v-btn",{staticClass:"mr-3",attrs:{"x-large":"",depressed:"",color:"light-grey"},on:{click:t.createProduct}},[t._v("Создать")])],1)],1)},m=[],h=n("92c3"),g=n.n(h),v=(n("1e3f"),{name:"Product",props:["id"],components:{vueDropzone:g.a},data:function(){return{dropzoneOptions:{url:"#",thumbnailWidth:150,thumbnailHeight:150,maxFilesize:1,dictDefaultMessage:"<i class='v-icon notranslate mdi mdi-cloud-upload theme--light'></i> ЗАГРУЗИТЬ ФАЙЛЫ",headers:{Header:"header value"}}}},methods:{updateProduct:function(){this.$store.dispatch("updateProduct")},createProduct:function(){this.$store.dispatch("createProduct")},deleteProduct:function(){this.$store.dispatch("deleteProduct")}},computed:{loading:function(){return this.$store.getters.loading},product:function(){return this.$store.getters.product}},created:function(){isNaN(this.id)||this.$store.dispatch("getProduct",this.id)}}),b=v,_=(n("bd21"),n("6544")),y=n.n(_),L=n("8336"),k=n("62ad"),w=n("ce7e"),P=n("132d"),E=n("0fd9"),x=n("8654"),$=n("a844"),C=Object(u["a"])(b,f,m,!1,null,null,null),M=C.exports;y()(C,{VBtn:L["a"],VCol:k["a"],VDivider:w["a"],VIcon:P["a"],VRow:E["a"],VTextField:x["a"],VTextarea:$["a"]}),r["a"].use(p["a"]);var V=[{path:"/",name:"Home",component:function(){return n.e("chunk-2d21a3d2").then(n.bind(null,"bb51"))}},{path:"/products/:folder_id",name:"Products",props:!0,component:function(){return n.e("chunk-20f5798a").then(n.bind(null,"e6dc"))}},{path:"/products",redirect:"/products/0"},{path:"/product/:id",name:"Product",props:!0,component:M},{path:"/product/new",name:"NewProduct",props:!0,component:M},{path:"/getpass",name:"GetPass",component:function(){return n.e("chunk-ef9b224e").then(n.bind(null,"886d"))},meta:{layout:"auth-layout"}},{path:"/signin",name:"SignIn",component:function(){return n.e("chunk-ef9def92").then(n.bind(null,"54e2"))},meta:{layout:"auth-layout"}}],j=new p["a"]({mode:"history",base:"/",routes:V}),S=j,O=n("2f62"),F={state:{products:{data:[],folders:[],paginator:{total_pages:1,current_pages:1,total_items:1}},product:{}},mutations:{setProducts:function(t,e){t.products=e},setProduct:function(t,e){t.product=e}},actions:{getProducts:function(t,e){var n=t.state,r=t.commit;r("setLoading",!0),this._vm.$http.get("products?folder="+e+"&page="+n.products.paginator.current_pages).then((function(t){r("setProducts",t.data),r("setProduct",{}),r("setFolder",{}),r("setLoading",!1)})).catch((function(t){r("setLoading",!1),401===t.response.status&&(S.push("/signin"),r("setError",t.response.data.message)),r("setError",t.response.data.message)}))},getProduct:function(t,e){var n=t.commit;n("setLoading",!0),this._vm.$http.get("product?id="+e).then((function(t){n("setProduct",t.data),n("setLoading",!1)})).catch((function(t){n("setLoading",!1),401===t.response.status&&(S.push("/signin"),n("setError",t.response.data.message)),n("setError",t.response.data.message)}))},updateProduct:function(t){var e=t.commit,n=t.state;e("setLoading",!0),this._vm.$http.put("product?id="+n.product.id,n.product).then((function(){e("setMessage","Продукция успешно обновлена"),e("setLoading",!1)})).catch((function(t){e("setLoading",!1),401===t.response.status&&(S.push("/signin"),e("setError",t.response.data.message)),e("setError",t.response.data.message)}))},createProduct:function(t){var e=t.commit,n=t.state;e("setLoading",!0),this._vm.$http.post("product?",n.product).then((function(){e("setMessage","Продукция успешно создана"),S.push("/products"),e("setLoading",!1)})).catch((function(t){e("setLoading",!1),401===t.response.status&&(S.push("/signin"),e("setError",t.response.data.message)),e("setError",t.response.data.human_data)}))},deleteProduct:function(t){var e=t.commit,n=t.state;e("setLoading",!0),this._vm.$http.delete("product?id="+n.product.id).then((function(){S.go(-1),e("setMessage","Продукция успешно удалена"),e("setLoading",!1)})).catch((function(t){e("setLoading",!1),401===t.response.status&&(S.push("/signin"),e("setError",t.response.data.message)),e("setError",t.response.data.message)}))}},getters:{products:function(t){return t.products},product:function(t){return t.product}}},A={state:{folder:{},folderModels:[]},mutations:{setFolder:function(t,e){t.folder=e},setFolderModels:function(t,e){t.folderModels=e}},actions:{getFolderModels:function(t){var e=t.commit;e("setLoading",!0),this._vm.$http.get("folders_models").then((function(t){e("setFolderModels",t.data),e("setLoading",!1)})).catch((function(t){e("setLoading",!1),401===t.response.status&&(S.push("/signin"),e("setError",t.response.data.message)),e("setError",t.response.data.message)}))},getFolder:function(t,e){var n=t.commit;n("setFolder",e)},updateFolder:function(t){var e=t.dispatch,n=t.commit,r=t.state;n("setLoading",!0),this._vm.$http.put("folder",r.folder).then((function(){n("setMessage","Папка успешно обновлена"),e("getProducts",r.folder.parent_id),n("setLoading",!1)})).catch((function(t){n("setLoading",!1),401===t.response.status&&(S.push("/signin"),n("setError",t.response.data.message)),n("setError",t.response.data.message)}))},createFolder:function(t,e){var n=t.commit,r=t.dispatch,a=t.state;a.folder.parent_id=parseInt(e),n("setLoading",!0),this._vm.$http.post("folder?",a.folder).then((function(){n("setMessage","Папка успешно создана"),r("getProducts",e),n("setLoading",!1)})).catch((function(t){n("setLoading",!1),401===t.response.status&&(S.push("/signin"),n("setError",t.response.data.message)),n("setError",t.response.data.message)}))},deleteFolder:function(t){var e=t.commit,n=t.state;e("setLoading",!0),this._vm.$http.delete("folder?id="+n.folder.id).then((function(){S.go(-1),e("setMessage","Папка успешно удалена"),e("setLoading",!1)})).catch((function(t){e("setLoading",!1),401===t.response.status&&(S.push("/signin"),e("setError",t.response.data.message)),e("setError",t.response.data.message)}))}},getters:{folder:function(t){return t.folder},folderModels:function(t){return t.folderModels}}},T={state:{layout:"default-layout",loading:!1,error:null,message:null},mutations:{setLayout:function(t,e){t.layout=e},setLoading:function(t,e){t.loading=e},setError:function(t,e){t.error=e},setMessage:function(t,e){t.message=e},clearErrors:function(t){t.error=null},clearMessages:function(t){t.message=null}},actions:{setLoading:function(t,e){var n=t.commit;n("setLoading",e)},setError:function(t,e){var n=t.commit;n("setError",e)},setMessage:function(t,e){var n=t.commit;n("setMessage",e)},clearErrors:function(t){var e=t.commit;e("clearErrors")},clearMessages:function(t){var e=t.commit;e("clearMessages")}},getters:{layout:function(t){return t.layout},loading:function(t){return t.loading},error:function(t){return t.error},message:function(t){return t.message}}},I=n("1da1"),z=n("d4ec"),D=(n("96cf"),n("ac1f"),n("1276"),n("5319"),function t(e){Object(z["a"])(this,t),e=parseInt(e),this.id=e}),N={state:{user:null},mutations:{setUser:function(t,e){t.user=e},setUserData:function(t,e){console.log(e),localStorage.jwt=e.jwt;var n=e.jwt.split(".")[1],r=n.replace("-","+").replace("_","/"),a=JSON.parse(window.atob(r));localStorage.exp=a.exp,localStorage.user_name=a.Payload.user_name,localStorage.user_id=a.Payload.user_id,localStorage.role=a.Payload.role,localStorage.company=a.Payload.company,t.user=new D(a.Payload.user_id)}},actions:{getPass:function(t,e){var n=t.commit;n("setLoading",!0);var r={company_slug:"dev",email:e};this._vm.$http.post("auth/new_session",r).then((function(t){n("setLoading",!1),n("setMessage",t.data.human_data),S.push("/signin")})).catch((function(t){n("setLoading",!1),401===t.response.status&&n("setError",t.data.human_data)}))},signIn:function(t,e){var n=t.commit;n("setLoading",!0),this._vm.$http.post("auth/get_token",e).then((function(t){n("setLoading",!1),n("setMessage","Вы успешно вошли в систему"),n("setUserData",t.data),S.push("/"),setTimeout((function(){location.reload()}),100)})).catch((function(t){n("setLoading",!1),n("setError",t.data.human_data)}))},autoLoginUser:function(t,e){var n=this;return Object(I["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.commit,n._vm.$http.defaults.headers.common.Authorization="Bearer "+localStorage.token,r.next=4,a("setUser",e);case 4:case"end":return r.stop()}}),r)})))()},logOut:function(t){var e=t.commit;S.push("/login"),localStorage.clear(),e("setUser",null)}},getters:{user:function(t){return t.user}}};r["a"].use(O["a"]);var B=new O["a"].Store({modules:{products:F,folders:A,shared:T,auth:N}}),U=n("f309");r["a"].use(U["a"]);var R=new U["a"]({}),H=n("bc3a"),Q=n.n(H),J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{app:""}},[n("v-list",{staticClass:"theme-elevation"},[n("v-list-item",{staticClass:"px-2"},[n("v-list-item-avatar",[n("v-img",{attrs:{src:"https://randomuser.me/api/portraits/women/85.jpg"}})],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-h6"},[t._v(" Sierra Ferguson ")]),n("v-list-item-subtitle",[t._v("s.ferguson@gmail.com")])],1)],1)],1),n("v-list",{attrs:{dense:"",nav:""}},t._l(t.links,(function(e){return n("v-list-item",{key:e.title},[n("v-list-item-content",[n("v-list-item-title",[n("router-link",{attrs:{to:e.link}},[t._v(" "+t._s(e.title)+" ")])],1)],1)],1)})),1)],1),n("v-app-bar",{attrs:{app:"",color:"white theme-elevation"}},[n("v-container",{attrs:{id:"input-usage",fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"11"}},[n("v-text-field",{staticClass:"searchBar",attrs:{placeholder:"Поиск...","prepend-icon":"mdi-magnify"},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}})],1)],1)],1)],1),n("v-main",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1)],1)},q=[],G={name:"DefaultLayout",data:function(){return{searchQuery:"",links:[{title:"Главная",link:"/"},{title:"Партнёры",link:"/partners"},{title:"Общий справочник",link:"/products"}],right:null}}},K=G,W=(n("4ded"),n("7496")),X=n("40dc"),Y=n("a523"),Z=n("adda"),tt=n("8860"),et=n("da13"),nt=n("8270"),rt=n("5d23"),at=n("f6c4"),ot=n("f774"),st=Object(u["a"])(K,J,q,!1,null,null,null),it=st.exports;y()(st,{VApp:W["a"],VAppBar:X["a"],VCol:k["a"],VContainer:Y["a"],VImg:Z["a"],VList:tt["a"],VListItem:et["a"],VListItemAvatar:nt["a"],VListItemContent:rt["a"],VListItemSubtitle:rt["b"],VListItemTitle:rt["c"],VMain:at["a"],VNavigationDrawer:ot["a"],VRow:E["a"],VTextField:x["a"]});var ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[n("v-container",[n("div",{staticClass:"authBox"},[n("div",{staticClass:"logo"},[n("img",{attrs:{src:"/images/logo.svg",alt:"Agro"}})]),t._t("default"),n("footer",{staticClass:"authFooter"},[n("a",{attrs:{href:"#"}},[t._v("Стать партнером Agro >")])])],2)])],1)],1)},ut=[],dt={},lt=dt,pt=(n("f164"),Object(u["a"])(lt,ct,ut,!1,null,null,null)),ft=pt.exports;y()(pt,{VApp:W["a"],VContainer:Y["a"],VMain:at["a"]});n("d1e78"),n("2fc4");r["a"].component("default-layout",it),r["a"].component("auth-layout",ft),r["a"].prototype.$http=Q.a.create({baseURL:"http://64.225.100.175:8000/api/v1/",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.jwt}}),r["a"].config.productionTip=!1,new r["a"]({router:S,store:B,vuetify:R,render:function(t){return t(l)}}).$mount("#app")},"9d6c":function(t,e,n){},bd21:function(t,e,n){"use strict";n("cd3a")},c489:function(t,e,n){},cd3a:function(t,e,n){},f164:function(t,e,n){"use strict";n("c489")}});
//# sourceMappingURL=app.0f480a37.js.map