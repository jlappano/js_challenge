var ARTICLE = (function () {
    var article = {};
    var container = document.getElementById("article-list"); 

    //change to X X's ago format
    function formatDate(date){
        var givenDate = new Date(date);
        var nowDate = new Date();

        var yearDiff = Math.floor(nowDate.getFullYear() - givenDate.getFullYear());
        if (yearDiff > 1) {
            return yearDiff + " years ago";
        }

        var monthDiff = Math.floor(nowDate.getMonth() - givenDate.getMonth());
        if (monthDiff > 1) {
            return monthDiff + " months ago";
        }

        var dayDiff = Math.floor(nowDate.getDate() - givenDate.getDate());
        if (dayDiff > 1) {
            return dayDiff + " days ago";
        }

        var hourDiff = Math.floor(nowDate.getHours() - givenDate.getHours());
        if (hourDiff > 1) {
            return hourDiff + " hours ago";
        }

        var minuteDiff = Math.floor(nowDate.getMinutes() - givenDate.getMinutes());
        if (minuteDiff > 1) {
            return minuteDiff + " minutes ago";
        }

        var secondDiff = Math.floor(nowDate.getSeconds() - givenDate.getSeconds());
        return secondDiff + " seconds ago";
    }

    function createArticle(articleData) {
        var dateString = Date.parse(new Date(articleData.publish_at));
        var articleString = '<li class="clearfix" data-words=' + articleData.words + ' data-submitted=' + 
        dateString + '><div class="img column"><div class="background" style="background-image: url(' + articleData.image + ');"></div></div><div class="title column"><span class="title-span">' + 
        articleData.title + '</span></div><div class="author column">' + articleData.profile.first_name + " " + articleData.profile.last_name + 
        '</div><div class="word-count column">' + articleData.words + '</div><div class="pubished column">' + 
        formatDate(articleData.publish_at) + '</div></li>'
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