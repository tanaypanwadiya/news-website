const API_KEY = "c59c03fbd7124ad69ff4a4b70dc08387";

const url = "https://newsapi.org/v2/everything?q";

window.addEventListener('load',() => fetchNews("India"));

//for reload when click on logo
   function reload(){
    window.location.reload();
   }
   
//for fatch the news from api 
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}=${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        if (data.articles) {
            bindData(data.articles);
        } else {
            console.error("No articles found.");
        }
    } catch (error) {
        console.error("Error fetching the news:", error);
    }
}

 //dto bind the data inside the 
 function bindData(articles){
    const cardcontainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");


    cardcontainer.innerHTML ='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardcontainer.appendChild(cardClone); 
       
        });
 }

 function fillDataInCard(cardClone, article){

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-us",{
    timeZone: "Asia/Jakarta"
});
     newsSource.innerHTML = `${article.source.name} · ${date}`;
     
     //for open news 
     cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
     });
 }
     
     let curSelectedNav = null;
     function onNavItemClick(id) {
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active');
       curSelectedNav = navItem;
       curSelectedNav.classList.add('active');
     }

     const searchButton = document.getElementById('search-button');
     const searchText = document.getElementById('search-text');
      
     searchButton.addEventListener("click", () =>{
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;

        });

 

     