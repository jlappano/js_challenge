var ARTICLE = (function () {
    var article = {};
    var container = document.getElementById("article-list"); 

    //change to X X's ago format
    function formatDate(string){

    }

    function createArticle(articleData) {
        var articleString = '<li data-words=' + articleData.words + ' data-submitted=' + 
        articleData.publish_at + '><img src=' + articleData.image + '></img><div class="title column">' + 
        articleData.title + '</div><div class="author column">' + articleData.profile.first_name + " " + articleData.profile.last_name + 
        '</div><div class="word-count column">' + articleData.words + '</div><div class="pubished column">' + 
        articleData.publish_at + '</div></li>'
        return articleString;
    }

    article.appendArticles = function (data) {
        var length = data.length;
        for(var i=0; i<length; i++){
            //create all my elements
            var articleData = data[i];
            var newArticle = createArticle(articleData);
            $wrapper.append(newArticle);
        }
    };

    return article;
}());