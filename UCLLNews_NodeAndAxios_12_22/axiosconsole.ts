import axios from 'axios'
 
getNews()

function getNews() {
    axios.get('http://localhost:8080/LectorsAjax_war/Controller?command=Overview')
      .then(response => console.log(response.data))
        .then(()=>setTimeout(getNews, 1000))
}