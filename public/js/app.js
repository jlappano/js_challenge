var paginateCount = 10;

var ARTICLE = (function () {
    var article = {};
    var container = document.getElementById("article-list"); 

    //change to X X's ago format
    function formatDate(string){

    }

    function createArticle(articleData) {
        var articleString = '<li>' + '<img src=' + articleData.image + '></img>' + '<div class="title column">' + articleData.title + '</div>' + '<div class="column">' + articleData.profile.first_name + " " + articleData.profile.last_name + '<div class="column">' + articleData.words + '</div>' + '<div class="column">' + articleData.publish_at + '</div>' + '</li>'
        return articleString;
    }

    article.appendArticles = function (data) {
        var length = data.length;
        for(var i=0; i<length-1; i++){
            //create all my elements
            var articleData = data[i];
            var newArticle = createArticle(articleData);
            $('#article-list').append(newArticle);
        }
    };

    return article;
}());


//on page load 
//get local articles
//append data to page
$(function() {
    var data = seedData;
    var allDataLoaded = false;
    var loadMore = function(){
        if(data.length > 0){
            ARTICLE.appendArticles(data.splice(0, paginateCount+1));
        } else {
            if(!allDataLoaded){
                $.ajax({
                    type: 'GET',
                    url: window.location.href + "/data/more-articles.json",
                    success:function(returnData){
                        data = returnData;
                        allDataLoaded = true;
                        ARTICLE.appendArticles(data.splice(0, paginateCount+1));
                    }
                });
            }
        }
    }
    loadMore();


    // add event listener to button
    var el = document.getElementById("paginate-button");
    el.addEventListener("click", loadMore);
});