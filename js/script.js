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
		alert("Please enter a country!")
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
    document.querySelector("#cases").innerHTML = data['cases'];               
	document.querySelector("#critical").innerHTML = data['critical'];
	document.querySelector("#active").innerHTML = data['active'];
	document.querySelector("#deaths").innerHTML = data['deaths'];
	document.querySelector("#recovered").innerHTML = data['recovered'];
	document.querySelector("#todayCases").innerHTML = data['todayCases'];
	document.querySelector("#todayDeaths").innerHTML = data['todayDeaths'];
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
                alert(country + " not found or doesn't have any cases!");
                console.log(ex);
            });
		}if (response.status == 404) {
			 alert(country + " not found or doesn't have any cases!");
		}
	}).catch(err => {
		alert("Check your network connection!");
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
		alert("Check your network connection!");
		console.log(err);
	});
}

function summary(data) {
	document.querySelector('#sCases').innerHTML = data['cases'];
	document.querySelector('#sDeaths').innerHTML = data['deaths'];
	document.querySelector('#sRecovered').innerHTML = data['recovered'];
	document.querySelector('#sUpdated').innerHTML = Date(data['updated']); 
	document.querySelector('#sActive').innerHTML = data['active'];
	document.querySelector('#affectedCountries').innerHTML = data['affectedCountries'];
}

function getNews() {
	const url = `https://newsapi.org/v2/everything?q=COVID&from=2020-03-16&sortBy=publishedAt&apiKey=e54bfc507950436d88f35e7ce6814a6b&pageSize=100&page=1`;
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
		alert('Check your network connection!!!');
		console.log(err);
	});
}

function news(data) {
	let news = document.querySelector('.news');
	let result = '';
	let i = 0;
	while (i < 5) {
		let content = data['articles'][i]['content'];
		content = content.substring(0,150);
		result += ` <small class="mt-0">Title: <span>${data['articles'][i]['title']}</span></small><br>     
          <small class="mt-0">By: ${data['articles'][i]['author']} <span></span></small><br>
       
        
        <img class='newsImg' width="150" height="100"  src="${data['articles'][i]['urlToImage']}" alt="">
        <p>
         ${content} <a href="${data['articles'][i]['url']}">readmore</a>
        </p>
		<hr>`;
		
		i++;
	}
	news.innerHTML = result;
}
