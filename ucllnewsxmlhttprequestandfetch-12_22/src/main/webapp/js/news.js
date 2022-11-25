window.onload = getAllNews;


let getAllNewsRequest = new XMLHttpRequest();
let addNewsRequest = new XMLHttpRequest();

function getAllNews () {
	getAllNewsRequest.open("GET", "Controller?command=Overview", true);
	getAllNewsRequest.onreadystatechange = showNews;
	getAllNewsRequest.send();

}




function showNews() {
	if (getAllNewsRequest.readyState == 4) {
		if (getAllNewsRequest.status == 200) {
			let news = JSON.parse(getAllNewsRequest.response);
			document.getElementById('items').innerHTML = "";

			news.forEach(item => {


				let result =
					'<div id=' + item.title + '>' +
					'<div   class="border"  ><a id=' + item.title + '>\n' +

					'<div class="Title"><strong>\n' +
					item.title +
					'</strong>  </div>\n' +

					'<div class="Content">\n' +
					item.content +
					'</div>\n' +
					'<div class="Date">\n' +
					item.datum.dayOfMonth + "-" + item.datum.monthValue + "-" + item.datum.year +
					'</div>\n' +

					'<div class="Author">\n'
					+ item.autheur +
					'</div>\n' +
					'</a></div></div>\n';
				$("#items").append(result);

				let comments = item.comments


				comments.forEach(comment => {

					let comments = '<div  class="comments"><a  id=' + item.autheur + '>\n' +

						'<div class="Autheur"><strong>\n' +
						comment.autheur +
						'</strong>  </div>\n' +
						'<div class="tijd">\n' +
						comment.tijd.dayOfMonth + "-" + comment.tijd.monthValue + "-" + comment.tijd.year +
						'</div>\n' +
						'<div class="text">\n'
						+ comment.text +
						'</div>\n' +
						'</a></div>\n';
					$("#" + item.title).append(comments);
				})
				const form = document.createElement("form");

				const error = document.createElement("span");
				error.className = "errors";

				form.appendChild(error);

				const f = document.createElement("ul");

				const firstRow = document.createElement("div");
				const textInput = document.createElement("input");
				textInput.required = true;
				textInput.id = "text"
				textInput.type = "text";
				textInput.placeholder = "Text";
				firstRow.appendChild(textInput);

				const secondRow = document.createElement("div");
				const authorInput = document.createElement("input");
				authorInput.required = true;
				authorInput.id = "tijd"
				authorInput.type = "text";
				authorInput.placeholder = "Author"

				const commentButton = document.createElement("input");
				commentButton.id = "add"
				commentButton.type = "submit";
				commentButton.value = "Add Comment"

				secondRow.append(authorInput, commentButton);

				f.append(firstRow, secondRow);
				form.appendChild(f);

				form.addEventListener("submit", (e) => {
					e.preventDefault();
					addComment(item.title, textInput.value, authorInput.value);
				})

				$("#" + item.title).append(form);


			});
setTimeout(getAllNews, 10000)
		}}
}
let addnewsbutton = document.getElementById('addnewsbutton');
addnewsbutton.onclick = addNews;

function addComment(title, text, author){
	let result="text="+encodeURIComponent(text) +"&autheur=" + encodeURIComponent(author) + "&title=" + encodeURIComponent(title);
	fetch( "Controller?command=AddComment",{
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: result
	})
		.then(getAllNews)

}


function  addNews(){
	let Title = document.getElementById("NewsTitle").value;
	let Text = document.getElementById("NewsText").value;
	let Author = document.getElementById("NewsAuthor").value;
	// encodeURIComponent om UTF-8 te gebruiken en speciale karakters om te zetten naar code
	let result= "title=" + encodeURIComponent(Title)+"&text="+ encodeURIComponent(Text) + "&author=" +encodeURIComponent(Author);
	addNewsRequest.open("POST", "Controller?command=Add", true);

	addNewsRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	addNewsRequest.send(result);


}

function showCommentBy(comments) {
	document.getElementById('search').innerHTML = "";
	console.log(comments)
	comments.forEach(comment => {


		let result =
			'<div class="tijd">\n' +
			comment.tijd.dayOfMonth + "-" + comment.tijd.monthValue + "-" + comment.tijd.year +
			'</div>\n' +
			'<div class="text">\n'
			+ comment.text +
			'</div>\n';
		$("#search"  ).append(result);
	});



}

let searchbutton = document.getElementById('searchbutton');
searchbutton.onclick = getCommentBy;

function getCommentBy(){
	const author =  "author=" + encodeURIComponent(document.getElementById('SearchAuthor').value);

	fetch('Controller?command=CommentsBy', {method: "post", headers:{"Content-Type": "application/x-www-form-urlencoded"}, body: author })
		.then(response => response.json())
		.then(comments => showCommentBy(comments))

}






