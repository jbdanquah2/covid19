window.onload=function(){getSummary(),getNews()};const country=document.querySelector("#country");function getCovid19(){"use strict";let e=document.querySelector("#country").value;if(e){document.querySelector("#summary").style.display="none";for(let e of document.querySelectorAll(".hide"))e.style.display="block";GetAsync(e,callback)}else alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Please enter a country!")}function callback(e,t){console.log("helloxxx");const n=Date(e.udpated),o=e.countryInfo.flag;document.querySelector("#flag").src=o,document.querySelector("#nation").innerHTML=e.country,document.querySelector("#cases").innerHTML=e.cases.toLocaleString(),document.querySelector("#critical").innerHTML=e.critical.toLocaleString(),document.querySelector("#active").innerHTML=e.active.toLocaleString(),document.querySelector("#deaths").innerHTML=e.deaths.toLocaleString(),document.querySelector("#recovered").innerHTML=e.recovered.toLocaleString(),document.querySelector("#todayCases").innerHTML=e.todayCases.toLocaleString(),document.querySelector("#todayDeaths").innerHTML=e.todayDeaths.toLocaleString(),document.querySelector("#casesPerOneMillion").innerHTML=e.casesPerOneMillion.toLocaleString(),document.querySelector("#deathsPerOneMillion").innerHTML=e.deathsPerOneMillion.toLocaleString(),document.querySelector("#updated").innerHTML=n}function GetAsync(e,t){fetch(`https://corona.lmao.ninja/countries/${e}`).then(n=>{200==n.status&&(console.log("response",n),n.json().then(n=>{console.log("data",n),t(n,e)}).catch(t=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",e+" not found or doesn't have any cases!"),console.log(t)})),404==n.status&&alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",e+" not found or doesn't have any cases!")}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(e)})}function getSummary(){fetch("https://corona.lmao.ninja/all").then(e=>{200==e.status&&(console.log("responser",e),e.json().then(e=>{console.log("data",e),summary(e)}).catch(e=>{console.log(e)}))}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(e)})}function summary(e){document.querySelector("#sCases").innerHTML=e.cases.toLocaleString(),document.querySelector("#sDeaths").innerHTML=e.deaths.toLocaleString(),document.querySelector("#sRecovered").innerHTML=e.recovered.toLocaleString(),document.querySelector("#sUpdated").innerHTML=Date(e.updated),document.querySelector("#sActive").innerHTML=e.active.toLocaleString(),document.querySelector("#affectedCountries").innerHTML=e.affectedCountries.toLocaleString()}function getNews(){let e=new Date,t=e.getFullYear(),n=e.getMonth()+1,o=e.getDate(),a=e.getHours();(a>=23||a<=5)&&(o-=1);let r=t+"-"+n+"-"+o;console.log(a);const s=`https://newsapi.org/v2/everything?qInTitle=covid19&sortBy=relevancy&language=en&apiKey=2ab23803d9704a519bcc1b4758beb80a&to=${r}&from=${r}&q=coronavirus`;console.log(e),fetch(s).then(e=>{200==e.status&&(console.log("newsresponse",e),e.json().then(e=>{console.log("newsdata",e),news(e)}).catch(e=>{console.log(e)}))}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!!!"),console.log(e)})}function news(e){let t=e.totalResults;t>18&&(t=18);let n=document.querySelector("#news"),o="",a=0;for(;a<t;){let t=e.articles[a].urlToImage,n=e.articles[a].content;n=null!=n?trimString(n,200):"",o+=`<div uk-scrollspy="cls: uk-animation-slide-right;" class="text-muted m-2"> \n                <div class="card p-4">\n\t\t\t      <h5 class="mt-0 card-title "><span class="text-danger">Title:</span> <span>${e.articles[a].title}</span></h5>    \n          \x3c!--\t<small class="mt-0">By: ${e.articles[a].author} <span></span></small> --\x3e\n       \n\t\t\t\t\t<img height="auto" class='card-img-top newsImg responsive' src="${t}" alt="">\n\t\t\t\t\t<div class="text-warning"><small><span class="text-danger">Source:</span> ${e.articles[a].source.name}</small></div>\n\t\t\t\t\t<p class="card-text text-justify ">\n\t\t\t\t\t\t${n}... <br/> <a class="btn btn-primary card-link" href="${e.articles[a].url}" target="_blank">readmore</a>\n\t\t\t\t\t</p>\n\t\t\t\t\t  </div>\n\t\t\t\t   </div>\n\t\t`,a++}n.innerHTML=o}function trimString(e,t){var n=e.indexOf(" ",t);return-1==n?e:e.substring(0,n)}country.addEventListener("keypress",function(e){"Enter"===e.key&&getCovid19()});