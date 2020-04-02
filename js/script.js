window.onload = function() {
  getSummary();
};

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
      	document.querySelector("#flag").src = '' ;

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
            	alert("Sorry something went wrong. Try again!");
            });
		}if (response.status == 404) {
			alert("Country not found or Covid19 not present there!");
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


//          "cases": 934825,
//    "deaths": 47187,
//    "recovered": 193989,
//    "updated": 1585785032068,
//    "active": 693649,
//    "affectedCountries": 205



