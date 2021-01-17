// import { url } from './variables.js'; // import news api
const url = `https://gnews.io/api/v3/search?q=coronavirus&in=all&token=f0c3f65254d65edb5939f814afc4350b`

function notice2() {
	alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ","This feature is still under development!");
}

// display news and sumary when page loads
window.onload = function() {
  getSummary();
	getNews();
};

function required() {
	alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer every questions!");
}

document.querySelector('#submitSearch').addEventListener('click', getCovid19);

// ensuring a user inputs country name before submit
function getCovid19() {
	//"use strict";
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


//allowing cases search when enter is pressed
const country = document.querySelector('#country');
country.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      getCovid19();
  }
});


// displaying cases per country
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
	document.querySelector("#casesPerOneMillion").innerHTML = data['casesPerOneMillion'].toLocaleString();
	document.querySelector("#deathsPerOneMillion").innerHTML = data['deathsPerOneMillion'].toLocaleString();
	document.querySelector("#updated").innerHTML = dt;
//    document.getElementById("table").style.display = "block";
}


// getting cases per country
function GetAsync(country, callback) {
    const urls  = `https://corona.lmao.ninja/v2/countries/${country}`;
	fetch(urls).then(
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

// getting summary
function getSummary() {
	const urls  = `https://corona.lmao.ninja/v2/all`;
	fetch(urls).then(response => {
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

// display summary
function summary(data) {
	document.querySelector('#sCases').innerHTML = data['cases'];
	document.querySelector('#sDeaths').innerHTML = data['deaths'];
	document.querySelector('#sRecovered').innerHTML = data['recovered']
	document.querySelector('#sUpdated').innerHTML = Date(data['updated']).toLocaleString();
	document.querySelector('#sActive').innerHTML = data['active'];
	document.querySelector('#affectedCountries').innerHTML = data['affectedCountries'];
}

// getting covid19 news
function getNews() {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin'
    
     }).then(response => {
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
		alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>NEWS</span> ", 'Unable to get news!!!');
		console.log(err);
	});
}


// displyin convid19 news
function news(data) {
	let totalResults = data['articleCount'];
//	if (totalResults > 10) { // gnews only allows the articles for the free api key.. so this is not needed any longer
//		totalResults = 18;
//	}
	let news = document.querySelector('#news');
	let result = '';
	let i = 0;
	while (i < totalResults) {
		//console.log('this', data['articles'][i]['image']);
		let urlToImage = data['articles'][i]['image'];
		let content = data['articles'][i]['description'];
		if (content != null)  {
			content = trimString(content, 200);
		}else {
			content = '';
		}
		
		result += `<div uk-scrollspy="cls: uk-animation-slide-right;" class="text-muted m-2"> 
                <div class="card p-4">
			      <h5 class="mt-0 card-title "><span class="text-danger">Title:</span> <span>${data['articles'][i]['title']}</span></h5>    
          <!--	<small class="mt-0">By: ${data['articles'][i]['source']['name']} <span></span></small> -->
       
					<img height="auto" class='card-img-top newsImg responsive' src="${urlToImage}" alt="">
					<div class="text-warning"><small><span class="text-danger">Source:</span> ${data['articles'][i]['source']['name']}</small></div>
					<p class="card-text text-justify ">
						${content}... <br/> <a class="btn btn-primary card-link" href="${data['articles'][i]['url']}" target="_blank">readmore</a>
					</p>
					  </div>
				   </div>
		`;	
		i++;
	}
	news.innerHTML = result;
}

// trims the news description
function trimString(str, n){
    let cut= str.indexOf(' ', n);
    if(cut== -1) return str;
    return str.substring(0, cut)
}



// self checker, moving from to another
function move(elem) {
	if (ready(elem)) {
		next(elem);
	}
	
}


// Self-checker form algorithm
function next(elem) {
	let id = elem.id;
	let nClasslist = document.querySelector('#'+id).classList;
	let len = nClasslist.length;
	let lastClass =  nClasslist.item(len-1);
	
	if (id == 'assess') {
			let val = document.querySelector('#diagnos').value;
		if (val >= 4) {
			let nNext = document.querySelector('#assessAssess1').style.display ="block";
			let hidden = document.querySelector('.'+id+lastClass).style.display = "none";
			window.scrollTo(0,0);
			return;
       }if (val >= 1 && val <=3) {
		   let nNext = document.querySelector('#assessAssess2').style.display ="block";
			let hidden = document.querySelector('.'+id+lastClass).style.display = "none";
		   window.scrollTo(0,0);
		   return;
	   }else {
		   let nNext = document.querySelector('#assessAssess').style.display ="block";
			let hidden = document.querySelector('.'+id+lastClass).style.display = "none";
		   window.scrollTo(0,0);
		   return;
	   }
	}
	
	if (id == 'risk1' || id == 'risk2') {
		let nNext = document.querySelector('#assessAssess').style.display ="block";	
		let hidden = document.querySelector('#assessAssess1').style.display = "none";
		let hidden2 = document.querySelector('#assessAssess2').style.display = "none";
		window.scrollTo(0,0);
		return;
	}
	
	let nNext = document.querySelector('#'+id+lastClass).style.display ="block";
	let hidden = document.querySelector('.'+id+lastClass).style.display = "none";
	
	//console.log(lastClass);
	window.scrollTo(0,0);
}


// self checker, ensuring that the user fills each input
function ready(btn) {
	let nextId = btn.id;
	
	if (nextId == 'about') {		 
		
		let email = document.querySelector('#email').value;
		let phone = document.querySelector('#phone').value;
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const rephone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		
		let check =  re.test(email);
		let checkPhone = rephone.test(phone);
		
		if (check == true) {
			if (email.length == 0 || phone.length == 0) {
				alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please ensure you enter all questions!");
				return false;
			}
			if (checkPhone == false) {
				alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Enter valid phone number!");
				return false;
			}
		}else {
			alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please enter correct email address!");
			return false;
		}

		//if (nextId == 'about') 
	}
	
	if (nextId == 'health'){
		
		let age = document.querySelector('#age').value;
		let gender = document.querySelector('input[name="gender"]:checked').value;
		let region = document.querySelector('#region').value;
		let travel = document.querySelector('input[name="travel"]:checked').value;
		if (travel == 'yes') {
			checkCovid(1);
		}
		
		if (age.length == 0 || gender.length == 0 || region.length == 0 || travel.length == 0) {
			alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer all questions!");
			return false;
		}	
	}
	
	if (nextId == 'social') {
		
		if (document.querySelector('input[name="smoke"]:checked').value == 'yes') {
			checkCovid(1);
		}
		
		if (document.querySelector('input[name="disease"]:checked').value == 'yes') {
			checkCovid(1);
		}
	}
	
	if (nextId == 'symptoms') {
	
		if (document.querySelector('input[name="social"]:checked').value == 'yes') {
			checkCovid(2);
		} 
		
	}
	console.log(document.querySelector('#diagnos').value);
	
	if (nextId == 'assess') {
		let howLong = document.querySelector('#howLong').value;
		if (howLong.length == 0) {
			alertify.alert("<span class='pl-1 pr-1 text-light bg-danger'>COVID19</span> | <span class='pl-1 pr-1 text-light bg-warning'>Self-Checker!</span> ","Please answer all questions!");
			return false;
		}
	}
	
return true;
}


// self check value of the diagnosis
function checkCovid(n) {
	let val = document.querySelector('#diagnos').value;
		document.querySelector('#diagnos').value = Number(val) + n;
return true;
}



// writing the email and phone to file

// function WriteToFile() {
// 	     // Get the data from each element on the form.
    	
//         const email = document.getElementById('email');
//         const phone = document.getElementById('phone');
       
        
//         // This variable stores all the data.
//         let data = 
//             '\r Email: ' + email.value + ' \r\n ' +  
//             'Phone: ' + phone.value;
        
//         // Convert the text to BLOB.
//         const textToBLOB = new Blob([data], { type: 'text/plain' });
//         const sFileName = 'formData.txt';	   // The file to save the data.

//         let newLink = document.createElement("a");
//         newLink.download = sFileName;

//         if (window.webkitURL != null) {
//             newLink.href = window.webkitURL.createObjectURL(textToBLOB);
//         }
//         else {
//             newLink.href = window.URL.createObjectURL(textToBLOB);
//             newLink.style.display = "none";
//             document.body.appendChild(newLink);
//         }

//         newLink.click(); 
		
   
//  }