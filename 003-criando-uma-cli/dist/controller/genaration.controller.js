"use strict";var n=Object.create;var i=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var f=(o,e)=>{for(var r in e)i(o,r,{get:e[r],enumerable:!0})},l=(o,e,r,c)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of g(e))!x.call(o,s)&&s!==r&&i(o,s,{get:()=>e[s],enumerable:!(c=h(e,s))||c.enumerable});return o};var m=(o,e,r)=>(r=o!=null?n(u(o)):{},l(e||!o||!o.__esModule?i(r,"default",{value:o,enumerable:!0}):r,o)),_=o=>l(i({},"__esModule",{value:!0}),o);var d={};f(d,{GenFile:()=>b});module.exports=_(d);var t=m(require("path")),S=m(require("shelljs")),a=m(require("fs"));var p=class{gen(e){try{switch(e.tech){case"NodeJs + Typescript":this._execPath("boilerplate-typescript-nodejs",e.FolderName);break;case"[smacss] Arquitetura Scss":this._execPath("boilerplate-scss",e.FolderName);break}}catch(r){console.log(r)}}_execPath(e,r){try{S.default.cd(t.default.resolve()),S.default.exec(`git clone git@github.com:troquatte/${e}.git`),a.default.renameSync(`${t.default.join(t.default.resolve(),e)}`,`${t.default.join(t.default.resolve(),r)}`),console.log("Arquivo criado com sucesso!"),S.default.exit()}catch(c){console.log(c)}}},b=new p;0&&(module.exports={GenFile});
