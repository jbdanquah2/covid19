window.onload=function(){getSummary(),getNews()};const country=document.querySelector("#country");function getCovid19(){"use strict";let t=document.querySelector("#country").value;if(t){document.querySelector("#summary").style.display="none";for(let t of document.querySelectorAll(".hide"))t.style.display="block";GetAsync(t,callback)}else alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Please enter a country!")}function callback(t,e){console.log("helloxxx");const n=Date(t.udpated),a=t.countryInfo.flag;document.querySelector("#flag").src=a,document.querySelector("#nation").innerHTML=t.country,document.querySelector("#cases").innerHTML=t.cases.toLocaleString(),document.querySelector("#critical").innerHTML=t.critical.toLocaleString(),document.querySelector("#active").innerHTML=t.active.toLocaleString(),document.querySelector("#deaths").innerHTML=t.deaths.toLocaleString(),document.querySelector("#recovered").innerHTML=t.recovered.toLocaleString(),document.querySelector("#todayCases").innerHTML=t.todayCases.toLocaleString(),document.querySelector("#todayDeaths").innerHTML=t.todayDeaths.toLocaleString(),document.querySelector("#updated").innerHTML=n}function GetAsync(t,e){fetch(`https://corona.lmao.ninja/countries/${t}`).then(n=>{200==n.status&&(console.log("response",n),n.json().then(n=>{console.log("data",n),e(n,t)}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",t+" not found or doesn't have any cases!"),console.log(e)})),404==n.status&&alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",t+" not found or doesn't have any cases!")}).catch(t=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(t)})}function getSummary(){fetch("https://corona.lmao.ninja/all").then(t=>{200==t.status&&(console.log("responser",t),t.json().then(t=>{console.log("data",t),summary(t)}).catch(t=>{console.log(t)}))}).catch(t=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(t)})}function summary(t){document.querySelector("#sCases").innerHTML=t.cases.toLocaleString(),document.querySelector("#sDeaths").innerHTML=t.deaths.toLocaleString(),document.querySelector("#sRecovered").innerHTML=t.recovered.toLocaleString(),document.querySelector("#sUpdated").innerHTML=Date(t.updated),document.querySelector("#sActive").innerHTML=t.active.toLocaleString(),document.querySelector("#affectedCountries").innerHTML=t.affectedCountries.toLocaleString()}function getNews(){let t=new Date,e=t.getFullYear(),n=t.getMonth()+1,a=t.getDate(),o=t.getHours();(o>=23||o<=5)&&(a-=1);let r=e+"-"+n+"-"+a;console.log(o);const s=`https://newsapi.org/v2/everything?qInTitle=covid19&sortBy=relevancy&language=en&apiKey=2ab23803d9704a519bcc1b4758beb80a&to=${r}&from=${r}&q=coronavirus`;console.log(t),fetch(s).then(t=>{200==t.status&&(console.log("newsresponse",t),t.json().then(t=>{console.log("newsdata",t),news(t)}).catch(t=>{console.log(t)}))}).catch(t=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!!!"),console.log(t)})}function news(t){let e=t.totalResults;e>18&&(e=18);let n=document.querySelector("#news"),a="",o=0;for(;o<e;){let e=t.articles[o].urlToImage,n=t.articles[o].content;n=null!=n?trimString(n,200):"",a+=`<div uk-scrollspy="cls: uk-animation-slide-right;" class="text-muted m-2"> \n                <div class="card p-4">\n\t\t\t      <h5 class="mt-0 card-title "><span class="text-danger">Title:</span> <span>${t.articles[o].title}</span></h5>    \n          \x3c!--\t<small class="mt-0">By: ${t.articles[o].author} <span></span></small> --\x3e\n       \n\t\t\t\t\t<img height="auto" class='card-img-top newsImg responsive' src="${e}" alt="">\n\t\t\t\t\t<div class="text-warning"><small><span class="text-danger">Source:</span> ${t.articles[o].source.name}</small></div>\n\t\t\t\t\t<p class="card-text text-justify ">\n\t\t\t\t\t\t${n}... <br/> <a class="btn btn-primary card-link" href="${t.articles[o].url}" target="_blank">readmore</a>\n\t\t\t\t\t</p>\n\t\t\t\t\t  </div>\n\t\t\t\t   </div>\n\t\t`,o++}n.innerHTML=a}function trimString(t,e){var n=t.indexOf(" ",e);return-1==n?t:t.substring(0,n)}country.addEventListener("keypress",function(t){"Enter"===t.key&&getCovid19()});