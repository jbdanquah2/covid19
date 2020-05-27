import{url}from"./variables.js";function required(){alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer every questions!")}function notice(){alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","This feature is still under development!")}function getCovid19(){let e=document.querySelector("#country").value;if(e){document.querySelector("#summary").style.display="none";for(let e of document.querySelectorAll(".hide"))e.style.display="block";GetAsync(e,callback)}else alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Please enter a country!")}window.onload=function(){getSummary(),getNews()},document.querySelector("#submitSearch").addEventListener("click",getCovid19);const country=document.querySelector("#country");function callback(e,t){console.log("helloxxx");const n=Date(e.udpated),l=e.countryInfo.flag;document.querySelector("#flag").src=l,document.querySelector("#nation").innerHTML=e.country,document.querySelector("#cases").innerHTML=e.cases.toLocaleString(),document.querySelector("#critical").innerHTML=e.critical.toLocaleString(),document.querySelector("#active").innerHTML=e.active.toLocaleString(),document.querySelector("#deaths").innerHTML=e.deaths.toLocaleString(),document.querySelector("#recovered").innerHTML=e.recovered.toLocaleString(),document.querySelector("#todayCases").innerHTML=e.todayCases.toLocaleString(),document.querySelector("#todayDeaths").innerHTML=e.todayDeaths.toLocaleString(),document.querySelector("#casesPerOneMillion").innerHTML=e.casesPerOneMillion.toLocaleString(),document.querySelector("#deathsPerOneMillion").innerHTML=e.deathsPerOneMillion.toLocaleString(),document.querySelector("#updated").innerHTML=n}function GetAsync(e,t){fetch(`https://corona.lmao.ninja/v2/countries/${e}`).then(n=>{200==n.status&&(console.log("response",n),n.json().then(n=>{console.log("data",n),t(n,e)}).catch(t=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",e+" not found or doesn't have any cases!"),console.log(t)})),404==n.status&&alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ",e+" not found or doesn't have any cases!")}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(e)})}function getSummary(){fetch("https://corona.lmao.ninja/v2/all").then(e=>{200==e.status&&(console.log("responser",e),e.json().then(e=>{console.log("data",e),summary(e)}).catch(e=>{console.log(e)}))}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!"),console.log(e)})}function summary(e){document.querySelector("#sCases").innerHTML=e.cases.toLocaleString(),document.querySelector("#sDeaths").innerHTML=e.deaths.toLocaleString(),document.querySelector("#sRecovered").innerHTML=e.recovered.toLocaleString(),document.querySelector("#sUpdated").innerHTML=Date(e.updated),document.querySelector("#sActive").innerHTML=e.active.toLocaleString(),document.querySelector("#affectedCountries").innerHTML=e.affectedCountries.toLocaleString()}function getNews(){fetch(url).then(e=>{200==e.status&&(console.log("newsresponse",e),e.json().then(e=>{console.log("newsdata",e),news(e)}).catch(e=>{console.log(e)}))}).catch(e=>{alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Check your network connection!!!"),console.log(e)})}function news(e){let t=e.totalResults;t>18&&(t=18);let n=document.querySelector("#news"),l="",s=0;for(;s<t;){let t=e.articles[s].urlToImage,n=e.articles[s].content;n=null!=n?trimString(n,200):"",l+=`<div uk-scrollspy="cls: uk-animation-slide-right;" class="text-muted m-2"> \n                <div class="card p-4">\n\t\t\t      <h5 class="mt-0 card-title "><span class="text-danger">Title:</span> <span>${e.articles[s].title}</span></h5>    \n          \x3c!--\t<small class="mt-0">By: ${e.articles[s].author} <span></span></small> --\x3e\n       \n\t\t\t\t\t<img height="auto" class='card-img-top newsImg responsive' src="${t}" alt="">\n\t\t\t\t\t<div class="text-warning"><small><span class="text-danger">Source:</span> ${e.articles[s].source.name}</small></div>\n\t\t\t\t\t<p class="card-text text-justify ">\n\t\t\t\t\t\t${n}... <br/> <a class="btn btn-primary card-link" href="${e.articles[s].url}" target="_blank">readmore</a>\n\t\t\t\t\t</p>\n\t\t\t\t\t  </div>\n\t\t\t\t   </div>\n\t\t`,s++}n.innerHTML=l}function trimString(e,t){let n=e.indexOf(" ",t);return-1==n?e:e.substring(0,n)}function next(e){let t=e.id,n=document.querySelector("#"+t).classList,l=n.length,s=n.item(l-1);if("assess"==t){let e=document.querySelector("#diagnos").value;if(e>=4){document.querySelector("#assessAssess1").style.display="block",document.querySelector("."+t+s).style.display="none";return void window.scrollTo(0,0)}if(e>=1&&e<=3){document.querySelector("#assessAssess2").style.display="block",document.querySelector("."+t+s).style.display="none";return void window.scrollTo(0,0)}document.querySelector("#assessAssess").style.display="block",document.querySelector("."+t+s).style.display="none";return void window.scrollTo(0,0)}if("risk1"==t||"risk2"==t){document.querySelector("#assessAssess").style.display="block",document.querySelector("#assessAssess1").style.display="none",document.querySelector("#assessAssess2").style.display="none";return void window.scrollTo(0,0)}document.querySelector("#"+t+s).style.display="block",document.querySelector("."+t+s).style.display="none";window.scrollTo(0,0)}function ready(e){let t=e.id;if("about"==t){let e=document.querySelector("#email").value,t=document.querySelector("#phone").value;const n=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;let l=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),s=n.test(t);if(1!=l)return alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please enter correct email address!"),!1;if(0==e.length||0==t.length)return alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please ensure you enter all questions!"),!1;if(0==s)return alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Enter valid phone number!"),!1}if("health"==t){let e=document.querySelector("#age").value,t=document.querySelector('input[name="gender"]:checked').value,n=document.querySelector("#region").value,l=document.querySelector('input[name="travel"]:checked').value;if("yes"==l&&checkCovid(1),0==e.length||0==t.length||0==n.length||0==l.length)return alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer all questions!"),!1}if("social"==t&&("yes"==document.querySelector('input[name="smoke"]:checked').value&&checkCovid(1),"yes"==document.querySelector('input[name="disease"]:checked').value&&checkCovid(1)),"symptoms"==t&&"yes"==document.querySelector('input[name="social"]:checked').value&&checkCovid(2),console.log(document.querySelector("#diagnos").value),"assess"==t){if(0==document.querySelector("#howLong").value.length)return alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer all questions!"),!1}return!0}function move(e){ready(e)&&next(e)}function checkCovid(e){let t=document.querySelector("#diagnos").value;return document.querySelector("#diagnos").value=Number(t)+e,!0}function WriteToFile(){const e=document.getElementById("email"),t=document.getElementById("phone");let n="\r Email: "+e.value+" \r\n Phone: "+t.value;const l=new Blob([n],{type:"text/plain"});let s=document.createElement("a");s.download="formData.txt",null!=window.webkitURL?s.href=window.webkitURL.createObjectURL(l):(s.href=window.URL.createObjectURL(l),s.style.display="none",document.body.appendChild(s)),s.click()}country.addEventListener("keypress",function(e){"Enter"===e.key&&getCovid19()});