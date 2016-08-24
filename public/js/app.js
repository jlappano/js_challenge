var paginateCount = 10;
var button = document.getElementById("paginate-button");
var wordSort = document.getElementById("words");
var submittedSort = document.getElementById("submitted");

var SORT = (function () {
    var sort = {};

    sort.byWordAsc = function () {
        var $wrapper = $('#article-list');
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.words - +b.dataset.words;
        })
        .appendTo($wrapper);
    };

    sort.bySubmittedAsc = function () {
        var $wrapper = $('#article-list');
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.submitted - +b.dataset.submitted;
        })
        .appendTo($wrapper);
    };

    return sort;
}());

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


    // add event listeners to buttons
    button.addEventListener("click", loadMore);
    wordSort.addEventListener("click", SORT.byWordAsc);
    submittedSort.addEventListener("click", SORT.bySubmittedAsc);
});