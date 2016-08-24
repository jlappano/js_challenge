var paginateCount = 10;
var button = document.getElementById("paginate-button");
var wordSort = document.getElementById("words");
var submittedSort = document.getElementById("submitted");
var $wrapper = $('#article-list');

//on page load 
//get local articles
//append data to page
$(function() {
    var data = seedData;
    var allDataLoaded = false;
    var loadMore = function(){
        if(data.length > 0){
            ARTICLE.appendArticles(data.splice(0, paginateCount));
        } else {
            if(!allDataLoaded){
                $.ajax({
                    type: 'GET',
                    url: window.location.href + "/data/more-articles.json",
                    success:function(returnData){
                        data = returnData;
                        allDataLoaded = true;
                        ARTICLE.appendArticles(data.splice(0, paginateCount));
                    }
                });
            }
        }
    }
    loadMore();
    SORT.getAndExecuteSortHistory();

    // add event listeners to buttons
    button.addEventListener("click", loadMore);
    wordSort.addEventListener("click", SORT.byWord);
    submittedSort.addEventListener("click", SORT.byDate);
});