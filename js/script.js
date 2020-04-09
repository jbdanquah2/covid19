window.onload = function() {
  getSummary();
	getNews();
};



//const submit = document.querySelector('#submit');
const country = document.querySelector('#country');
country.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      getCovid19();
  }
});



function getCovid19() {
	"use strict";
	let country = document.querySelector("#country").value;
	if (!country) {
		alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","Please enter a country!")
	}else {
		document.querySelector('#summary').style.display = 'none';
		for (let elem of document.querySelectorAll('.hide')) {
    			elem.style.display = 'block';
			}
      	
		GetAsync(country, callback);
	}
	
}


function callback(data,country) {
	 console.log("helloxxx");
    
	const dt = Date(data['udpated']);
	
	const flag = data['countryInfo']['flag'];
	document.querySelector("#flag").src = flag ;
	document.querySelector("#nation").innerHTML = data['country']; 
    document.querySelector("#cases").innerHTML = data['cases'].toLocaleString();;               
	document.querySelector("#critical").innerHTML = data['critical'].toLocaleString();
	document.querySelector("#active").innerHTML = data['active'].toLocaleString();;
	document.querySelector("#deaths").innerHTML = data['deaths'].toLocaleString();;
	document.querySelector("#recovered").innerHTML = data['recovered'].toLocaleString();;
	document.querySelector("#todayCases").innerHTML = data['todayCases'].toLocaleString();;
	document.querySelector("#todayDeaths").innerHTML = data['todayDeaths'].toLocaleString();;
	document.querySelector("#casesPerOneMillion").innerHTML = data['casesPerOneMillion'];
	document.querySelector("#deathsPerOneMillion").innerHTML = data['deathsPerOneMillion'];
	document.querySelector("#updated").innerHTML = dt;
//    document.getElementById("table").style.display = "block";
}

function GetAsync(country, callback) {
    const url  = `https://corona.lmao.ninja/countries/${country}`;
	fetch(url).then(
	response => {
		if(response.status == 200){
			console.log('response', response);
			response.json().then(data => {
				console.log('data', data);
              
				callback(data,country);
			}).catch(ex => {
               alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", country + " not found or doesn't have any cases!");
				
                console.log(ex);
            });
		}if (response.status == 404) {
			 alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", country + " not found or doesn't have any cases!");
		}
	}).catch(err => {
		alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", "Check your network connection!");
		console.log(err);
       
	});
}

function getSummary() {
	const url  = `https://corona.lmao.ninja/all`;
	fetch(url).then(
	response => {
		if (response.status == 200) {
			console.log('responser', response);
			response.json().then(data => {
				console.log('data', data);
				summary(data);
			}).catch(ex => {
				console.log(ex);
			});
		}
	}).catch(err => {
		alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", "Check your network connection!");
		console.log(err);
	});
}

function summary(data) {
	document.querySelector('#sCases').innerHTML = data['cases'].toLocaleString();;
	document.querySelector('#sDeaths').innerHTML = data['deaths'].toLocaleString();;
	document.querySelector('#sRecovered').innerHTML = data['recovered'].toLocaleString();;
	document.querySelector('#sUpdated').innerHTML = Date(data['updated']); 
	document.querySelector('#sActive').innerHTML = data['active'].toLocaleString();
	document.querySelector('#affectedCountries').innerHTML = data['affectedCountries'].toLocaleString();;
}

function getNews() {
	let date = new Date();
	console.log(date);
	const url = `https://newsapi.org/v2/everything?qInTitle=covid19&from=${date}&sortBy=popularity&language=en&apiKey=2ab23803d9704a519bcc1b4758beb80a&Size=12&page=1`;
	;
	fetch(url).then(
	response => {
		if (response.status == 200) {
			console.log('newsresponse',response);
			response.json().then(data => {
				console.log('newsdata', data);
				news(data);
			}).catch(ex => {
				console.log(ex);
			})
		}
	}).catch(err => {
		alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", 'Check your network connection!!!');
		console.log(err);
	});
}

function news(data) {
	let news = document.querySelector('#news');
	let result = '';
	let i = 0;
	while (i < 8) {
		let urlToImage = data['articles'][i]['urlToImage'];
		let content = data['articles'][i]['content'];
		if (content != null)  {
			content = content.substring(0,200);
		}else {
			content = '';
		}
		

		result += `<div uk-scrollspy="cls: uk-animation-slide-right;" class="text-muted m-2"> 
                <div class="card p-4">
			      <h5 class="mt-0 card-title "><span class="text-danger">Title:</span> <span>${data['articles'][i]['title']}</span></h5>    
          <!--	<small class="mt-0">By: ${data['articles'][i]['author']} <span></span></small> -->
       
					<img height="auto" class='card-img-top newsImg responsive' src="${urlToImage}" alt="">
					<p class="card-text text-justify ">
						${content} <br/> <a class="btn btn-primary card-link" href="${data['articles'][i]['url']}" target="_blank">readmore</a>
					</p>
					  </div>
				   </div>
		`;	
		i++;
	}
	news.innerHTML = result;
}
