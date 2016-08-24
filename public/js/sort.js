var SORT = (function () {
    var sort = {};
    var sortStorage = '';
    sort.wordAsc = true;
    sort.sortSetting = '';

    function insertSortSettingIntoHistory() {
        localStorage.setItem('sort', sort.sortSetting);
    }

    sort.byWord = function () {
        if(sort.wordAsc){
            sort.byWordAsc();
        } else {
            sort.byWordDesc();
        }
    };

    sort.byWordAsc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.words - +b.dataset.words;
        }).appendTo($wrapper);

        sort.sortSetting = "byWordAsc";
        sort.wordAsc = false;
        insertSortSettingIntoHistory(); 
    }

    sort.byWordDesc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +b.dataset.words - +a.dataset.words;
        }).appendTo($wrapper);

        sort.sortSetting = "byWordDesc";
        sort.wordAsc = true;
        insertSortSettingIntoHistory(); 
    }

    sort.bySubmittedAsc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.submitted - +b.dataset.submitted;
        }).appendTo($wrapper);

        sort.sortSetting = "bySubmittedAsc";
        insertSortSettingIntoHistory();
    };

    //this could be better, key value 
    sort.getAndExecuteSortHistory = function () {
        if(window.localStorage) {
            sortStorage = localStorage.getItem('sort');
            switch (sortStorage) {
                case "byWordAsc":
                    sort.byWordAsc();
                    break;
                case "byWordDesc":
                    sort.byWordDesc();
                    break;
                case "bySubmittedAsc":
                    break;
                case "bySubmittedDesc":
                    break;
                default:
                    console.log("localStorage value not valid");
            }
        }
    }

    return sort;
}());