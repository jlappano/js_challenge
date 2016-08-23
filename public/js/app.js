var paginateCount = 10;

var ARTICLE = (function () {
    var article = {};
    var container = document.getElementById("article-list"); 

    //change to X X's ago format
    function formatDate(string){

    }

    function createArticle(articleData) {
        var newArticle = document.createElement("li");
        var articleImage = document.createElement("img");
        var title = document.createElement("div");
        var author = document.createElement("div");
        var words = document.createElement("div");
        var submitted = document.createElement("div");

        articleImage.src = articleData.image;
        title.innerHTML = articleData.title;
        author.innerHTML = articleData.profile.first_name + " " + articleData.profile.last_name;
        words.innerHTML = articleData.words;
        submitted.innerHTML = articleData.publish_at;

        newArticle.appendChild(articleImage);
        newArticle.appendChild(title);
        newArticle.appendChild(author);
        newArticle.appendChild(words);
        newArticle.appendChild(submitted);

        return newArticle;
    }

    article.appendArticles = function (data) {
        var length = data.length;
        for(var i=0; i<length-1; i++){
            //create all my elements
            var articleData = data[i];
            var newArticle = createArticle(articleData);

            container.appendChild(newArticle);
        }
    };

    return article;
}());


//on page load 
//get local articles
//append data to page
$(function() {
    var data = seedData;
    var loadMore = function(){
        if(data.length > 0){
            ARTICLE.appendArticles(data.splice(0, paginateCount+1));
        } else {
            console.log('get more!');
        }

    }
    loadMore();


    // add event listener to button
    var el = document.getElementById("paginate-button");
    el.addEventListener("click", loadMore);
});