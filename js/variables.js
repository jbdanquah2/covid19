
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDate();
	let hour = date.getHours();
	if (hour >= 23 || hour <= 5 ) {
		day = day - 1;
	}
	let todyDate = year + '-'+ month + '-' + day;
const url = `https://gnews.io/api/v3/search?q=coronavirus&in=all&token=f0c3f65254d65edb5939f814afc4350b`

// const url = `https://newsapi.org/v2/everything?qInTitle=covid19&sortBy=relevancy&language=en&apiKey=bc499735f8d446d68ff5d45f988a9fde&to=${todyDate}&from=${todyDate}&q=coronavirus`;

export {url};
