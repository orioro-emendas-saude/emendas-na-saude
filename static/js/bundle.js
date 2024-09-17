/*! For license information please see bundle.js.LICENSE.txt */
  overflow: auto;

  > table {
    width: 100%;
  }
`,Xit=rn.table`
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;

  thead tr {
    background-color: #efefef;
    text-align: left;
  }

  th,
  td {
    padding: 8px 12px;
  }

  tobdy tr {
    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    &:last-of-type {
      border-bottom: 2px solid #009879;
    }
  }
`;function Zit(e){let{data:t,schema:n,...r}=e;const o={accessor:(e,t)=>"function"===typeof e?{...t,accessorFn:e}:{...t,accessorKey:e},display:e=>e,group:e=>e},i=(0,s.useMemo)((()=>Object.keys(n).map((e=>{const t=n[e];return o.accessor(e,{header:(0,Kit.get)(n,`${e}.label`)||e,cell:e=>{if("continuous"===t.type){const n=e=>Intl.NumberFormat("pt-BR",t.numberFormat).format(e);return n(e.getValue())}return e.getValue()}})}))),[t]),a=function(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=s.useState((()=>({current:Wit(t)}))),[r,o]=s.useState((()=>n.current.initialState));return n.current.setOptions((t=>({...t,...e,state:{...r,...e.state},onStateChange:t=>{o(t),null==e.onStateChange||e.onStateChange(t)}}))),n.current}({data:t,columns:i,getCoreRowModel:e=>Qot((()=>[e.options.data]),(t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(t,o,i){void 0===o&&(o=0);const a=[];for(let l=0;l<t.length;l++){const c=oit(e,e._getRowId(t[l],l,i),t[l],l,o,void 0,null==i?void 0:i.id);var s;n.flatRows.push(c),n.rowsById[c.id]=c,a.push(c),e.options.getSubRows&&(c.originalSubRows=e.options.getSubRows(t[l],l),null!=(s=c.originalSubRows)&&s.length&&(c.subRows=r(c.originalSubRows,o+1,c)))}return a};return n.rows=r(t),n}),Jot(e.options,"debugTable",0,(()=>e._autoResetPageIndex())))});return(0,Mu.jsx)(Yit,{...r,children:(0,Mu.jsxs)(Xit,{children:[(0,Mu.jsx)("thead",{children:a.getHeaderGroups().map((e=>(0,Mu.jsx)("tr",{children:e.headers.map((e=>(0,Mu.jsx)("th",{children:e.isPlaceholder?null:qit(e.column.columnDef.header,e.getContext())},e.id)))},e.id)))}),(0,Mu.jsx)("tbody",{children:a.getRowModel().rows.map((e=>(0,Mu.jsx)("tr",{children:e.getVisibleCells().map((e=>(0,Mu.jsx)("td",{children:qit(e.column.columnDef.cell,e.getContext())},e.id)))},e.id)))})]})})}function Qit(){const{indicatorId:e,geoId:t}=co(),n=(so(),UZe()),r=(n.uf[t],Q$e(n.regioes_de_saude.filter((e=>e.uf_id===t)),e,n.indicators[e].rank)),o=Q$e(n.municipios.filter((e=>e.uf_id===t)),e,n.indicators[e].rank);return(0,Mu.jsxs)(_We,{direction:"column",children:[(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo com demais estados:"}),(0,Mu.jsx)(qot,{geoType:"uf",indicatorId:e,entries:n.ufs,highlights:{[t]:!0}})]}),(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo entre regi\xf5es de sa\xfade:"}),(0,Mu.jsx)(qot,{geoType:"regiao_de_saude",indicatorId:e,entries:r,highlights:{[t]:!0}})]}),(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo entre munic\xedpios:"}),(0,Mu.jsx)(qot,{indicatorId:e,geoType:"municipio",entries:o,highlights:{[t]:!0}})]}),(0,Mu.jsxs)(_We,{direction:{xs:"column",md:"row"},gap:"5",children:[(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"20 Regi\xf5es de sa\xfade com situa\xe7\xe3o mais cr\xedtica:"}),(0,Mu.jsx)(Zit,{data:r.slice(0,20),schema:{[`${e}_rank`]:{label:"Posi\xe7\xe3o"},name:{label:"Regi\xe3o de Sa\xfade"},[e]:{label:Ks(n,`indicators.${e}.shortName`)}}})]}),(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"20 Munic\xedpios com situa\xe7\xe3o mais cr\xedtica:"}),(0,Mu.jsx)(Zit,{data:o.slice(0,20),schema:{[`${e}_rank`]:{label:"Posi\xe7\xe3o"},name:{label:"Munic\xedpio"},[e]:{label:Ks(n,`indicators.${e}.shortName`)}}})]})]})]})}function Jit(){const{indicatorId:e,geoId:t}=co(),n=UZe();return(0,Mu.jsx)(_We,{direction:"column",children:(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo entre estados:"}),(0,Mu.jsx)(qot,{geoType:"uf",indicatorId:e,entries:n.ufs})]})})}function eat(e){let{id:t}=e;const{indicatorId:n}=co(),r=UZe(),o=Q$e(r.regioes_de_saude.filter((e=>e.uf_id===r.regiao_de_saude[t].uf_id)),n,r.indicators[n].rank);return(0,Mu.jsxs)(_We,{direction:"column",children:[(0,Mu.jsxs)(oh,{as:"h1",size:"8",children:[(0,Mu.jsx)("span",{style:{fontSize:"1rem"},children:"Regi\xe3o de Sa\xfade"}),(0,Mu.jsx)("br",{}),Ks(r,`regiao_de_saude.${t}.name`)]}),(0,Mu.jsxs)(_We,{gap:"2",children:[(0,Mu.jsx)(qqe,{schema:{type:"text"},label:"Popula\xe7\xe3o",value:Ks(r,`regiao_de_saude.${t}.populacao`)}),(0,Mu.jsx)(qqe,{schema:{type:"text"},label:Ks(r,`indicators.${n}.shortName`),value:(0,Mu.jsxs)(_We,{direction:"row",alignItems:"center",children:[(0,Mu.jsx)("div",{children:X$e(r.indicators[n],Ks(r,`regiao_de_saude.${t}.${n}`))}),(0,Mu.jsx)(ZZe,{indicatorId:n,rankLabel:Ks(r,`regiao_de_saude.${t}.${n}_FAIXA`)})]})}),(0,Mu.jsx)(qqe,{schema:{type:"text"},label:"Ranking dentre Regi\xf5es de Sa\xfade do estado",value:[o.find((e=>e.id===t))[`${n}_rank`],"de",o.length].join(" ")})]})]})}function tat(){const{indicatorId:e,geoId:t}=co(),n=UZe(),r=n.regiao_de_saude[t];return(0,Mu.jsxs)(_We,{direction:"column",children:[(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo com outras regi\xf5es de sa\xfade do estado:"}),(0,Mu.jsx)(qot,{geoType:"regiao_de_saude",indicatorId:e,entries:n.regioes_de_saude.filter((e=>e.uf_id===r.uf_id)),highlights:{[r.id]:!0}})]}),(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo entre munic\xedpios da regi\xe3o:"}),(0,Mu.jsx)(qot,{geoType:"municipio",indicatorId:e,entries:n.municipios.filter((e=>e.regional_id===t))})]})]})}const nat=rn($o)`
  color: black;

  &:not(:last-child) {
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;function rat(){const{geoType:e,geoId:t,indicatorId:n}=co(),r=UZe();switch(e){case"pais":return(0,Mu.jsx)(_We,{direction:"row",gap:"2",children:(0,Mu.jsx)(nat,{to:`/mapa/${n}/pais/brasil`,children:"Brasil"})});case"uf":{const e=r.uf[t];return(0,Mu.jsxs)(_We,{direction:"row",gap:"2",flexWrap:"wrap",children:[(0,Mu.jsx)(nat,{to:`/mapa/${n}/pais/brasil`,children:"Brasil"}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/uf/${t}`,children:e.name})]})}case"regiao_de_saude":{const e=r.regiao_de_saude[t],o=r.uf[e.uf_id];return(0,Mu.jsxs)(_We,{direction:"row",gap:"2",flexWrap:"wrap",children:[(0,Mu.jsx)(nat,{to:`/mapa/${n}/pais/brasil`,children:"Brasil"}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/uf/${o.id}`,children:o.name}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/regiao_de_saude/${t}`,children:e.name})]})}case"municipio":{const e=r.municipio[t],o=r.regiao_de_saude[e.regional_id],i=r.uf[o.uf_id];return(0,Mu.jsxs)(_We,{direction:"row",gap:"2",flexWrap:"wrap",children:[(0,Mu.jsx)(nat,{to:`/mapa/${n}/pais/brasil`,children:"Brasil"}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/uf/${i.id}`,children:i.name}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/regiao_de_saude/${o.id}`,children:o.name}),(0,Mu.jsx)("span",{children:">"}),(0,Mu.jsx)(nat,{to:`/mapa/${n}/municipio/${e.id}`,children:e.name})]})}}}const oat=rn(Go)`
  max-width: 70px;
  display: flex;
  flex-direction: column;
  color: black;

  > img {
    width: 100%;
    display: block;
    margin-bottom: 4px;
  }

  > span {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  @media print {
    display: none;
  }
`;function iat(){const e=UZe(),{geoType:t="pais",geoId:n="BR",indicatorId:r="INEAB"}=co();return(0,Mu.jsx)(Xqe,{columns:{xs:5,sm:9},gap:"10",justifyContent:"center",children:Object.values(e.indicators).map((e=>(0,Mu.jsxs)(oat,{to:`/mapa/${e.id}/${t}/${n}`,title:e.name,style:e=>{let{isActive:t,isPending:n,isTransitioning:r}=e;return{outline:t?"2px solid var(--accent-9)":null}},children:[(0,Mu.jsx)("img",{src:K$e(`/img/indicadores/${e.id}.png`)}),(0,Mu.jsx)("span",{children:e.shortName})]},e.id)))})}function aat(e){let{id:t}=e;const{indicatorId:n}=co(),r=UZe(),o=Q$e(r.municipios.filter((e=>e.uf_id===r.municipio[t].uf_id)),n,r.indicators[n].rank);return(0,Mu.jsxs)(_We,{direction:"column",children:[(0,Mu.jsx)(oh,{as:"h1",size:"8",children:Ks(r,`municipio.${t}.name`)}),(0,Mu.jsxs)(_We,{gap:"2",children:[(0,Mu.jsx)(qqe,{schema:{type:"text"},label:"Popula\xe7\xe3o",value:Ks(r,`municipio.${t}.populacao`)}),(0,Mu.jsx)(qqe,{schema:{type:"text"},label:Ks(r,`indicators.${n}.shortName`),value:(0,Mu.jsxs)(_We,{direction:"row",alignItems:"center",children:[(0,Mu.jsx)("div",{children:X$e(r.indicators[n],Ks(r,`municipio.${t}.${n}`))}),(0,Mu.jsx)(ZZe,{indicatorId:n,rankLabel:Ks(r,`municipio.${t}.${n}_FAIXA`)})]})}),(0,Mu.jsx)(qqe,{schema:{type:"text"},label:"Posi\xe7\xe3o entre munic\xedpios do estado",value:[o.find((e=>e.id===t))[`${n}_rank`],"de",o.length].join(" ")})]})]})}function sat(){const{indicatorId:e,geoId:t}=co(),n=UZe(),r=n.municipio[t];return(0,Mu.jsx)(_We,{direction:"column",children:(0,Mu.jsxs)(_We,{direction:"column",gap:"5",children:[(0,Mu.jsx)(oh,{as:"h3",children:"Comparativo entre munic\xedpios do estado:"}),(0,Mu.jsx)(qot,{geoType:"municipio",indicatorId:e,entries:n.municipios.filter((e=>e.uf_id===r.uf_id)),highlights:{[t]:!0}})]})})}var lat=n(28466),cat=n.n(lat);const uat=rn.div`
  @media print {
    display: none;
  }
`,dat=rn(WWe)`
  @media print {
    display: none;
  }
`;function fat(e){let{printComponentRef:t}=e;const{geoType:n="pais",geoId:r="BR",indicatorId:o="INEAB"}=co(),i=so(),a=UZe();return(0,Mu.jsxs)(_We,{direction:"column",gap:"6",children:[(0,Mu.jsx)(iat,{}),(0,Mu.jsxs)(_We,{direction:"row",justifyContent:"space-between",alignItems:"center",gap:"6",children:[(0,Mu.jsxs)(_We,{direction:"column",gap:"2",width:{xs:"100%",sm:"400px"},children:[(0,Mu.jsx)(uat,{children:(0,Mu.jsx)(zqe,{schema:(0,s.useMemo)((()=>({type:"select",options:[...a.ufs.map((e=>({label:`${e.name} (UF)`,value:`uf|${e.id}`}))),...a.regioes_de_saude.map((e=>({label:`${e.name} (Regi\xe3o de Sa\xfade)`,value:`regiao_de_saude|${e.id}`}))),...a.municipios.map((e=>({label:`${e.name} (Munic\xedpio)`,value:`municipio|${e.id}`})))],placeholder:"Pesquise por munic\xedpio, regi\xe3o de sa\xfade ou estado"})),[a]),value:`${n}|${r}`,onSetValue:e=>{if(e){const[t,n]=e.split("|");i(`/mapa/${o}/${t}/${n}`)}else i(`/mapa/${o}/pais/brasil`)}})}),(0,Mu.jsx)(rat,{})]}),(0,Mu.jsx)(cat(),{trigger:()=>(0,Mu.jsxs)(dat,{children:["Imprimir relat\xf3rio ",(0,Mu.jsx)(fV.Icon,{path:AV,size:"16px"})]}),content:()=>t.current})]}),(0,Mu.jsxs)(_We,{direction:{xs:"column",md:"row"},alignItems:"center",children:[(0,Mu.jsx)(_We,{direction:"column",children:(0,Mu.jsx)(KZe,{geo:{type:n||"pais",id:r},onSetGeo:e=>{let{type:t,id:n}=e;i("pais"===t?`/mapa/${o}/pais/BR`:`/mapa/${o}/${t}/${n}`)},indicator:o})}),(0,Mu.jsxs)(_We,{direction:"column",children:["uf"===n&&(0,Mu.jsx)(QZe,{id:r}),"regiao_de_saude"===n&&(0,Mu.jsx)(eat,{id:r}),"municipio"===n&&(0,Mu.jsx)(aat,{id:r}),(0,Mu.jsx)(vWe,{p:"3",style:{borderRadius:"4px",backgroundColor:"var(--accent-3)",fontSize:".9rem"},children:(0,Mu.jsxs)(_We,{direction:"column",gap:"3",children:[(0,Mu.jsx)(oh,{as:"h3",size:"4",children:Ks(a,`indicators.${o}.name`)}),(0,Mu.jsx)(OKe,{children:Ks(a,`indicators.${o}.description`)})]})}),"pais"===n&&(0,Mu.jsx)(Jit,{})]})]}),"uf"===n&&(0,Mu.jsx)(Qit,{}),"regiao_de_saude"===n&&(0,Mu.jsx)(tat,{}),"municipio"===n&&(0,Mu.jsx)(sat,{})]})}function pat(){return(0,Mu.jsx)(_We,{p:"6",direction:"column",gap:"4",children:(0,Mu.jsx)(So,{})})}const hat=rn.main`
  font-family: sans-serif;

  * {
    box-sizing: border-box;
  }
`;function mat(){const e=(0,s.useRef)(null);return(0,Mu.jsx)(Yt,{theme:tWe(),children:(0,Mu.jsx)(hat,{ref:e,children:(0,Mu.jsx)(Xg,{accentColor:"green",children:(0,Mu.jsx)(Wqe,{renderers:EYe,variant:"labeled",children:(0,Mu.jsx)(Bqe,{renderers:wXe,variant:"labeled",children:(0,Mu.jsx)(yZe,{children:(0,Mu.jsx)(HZe,{children:(0,Mu.jsx)(wWe,{maxWidth:1200,children:(0,Mu.jsx)(Bo,{router:(t=[{path:"/",element:(0,Mu.jsx)(pat,{}),children:[{index:!0,element:(0,Mu.jsx)(Yo,{})},{path:"mapa/:indicatorId/:geoType/:geoId",element:(0,Mu.jsx)(fat,{printComponentRef:e})}]}],lr({basename:null==n?void 0:n.basename,future:_o({},null==n?void 0:n.future,{v7_prependBasename:!0}),history:pn({window:null==n?void 0:n.window}),hydrationData:(null==n?void 0:n.hydrationData)||No(),routes:t,mapRouteProperties:To,unstable_dataStrategy:null==n?void 0:n.unstable_dataStrategy,unstable_patchRoutesOnNavigation:null==n?void 0:n.unstable_patchRoutesOnNavigation,window:null==n?void 0:n.window}).initialize())})})})})})})})})});var t,n}const gat=e=>{e&&e instanceof Function&&n.e(78).then(n.bind(n,31078)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)}))};c.createRoot(document.getElementById("emendas-data-view-root")||document.getElementById("root")).render((0,Mu.jsx)(s.StrictMode,{children:(0,Mu.jsx)(mat,{})})),gat()})()})();
//# sourceMappingURL=bundle.js.map