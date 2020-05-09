
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDate();
	let hour = date.getHours();
	if (hour >= 23 || hour <= 5 ) {
		day = day - 1;
	}
	let todyDate = year + '-'+ month + '-' + day;
 const url = `https://newsapi.org/v2/everything?qInTitle=covid19&sortBy=relevancy&language=en&apiKey=2ab23803d9704a519bcc1b4758beb80a&to=${todyDate}&from=${todyDate}&q=coronavirus`;

export {url};
