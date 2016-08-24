var SORT = (function () {
    var sort = {};
    var sortStorage = '';
    sort.wordAsc = true;
    sort.dateAsc = true;
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
        insertSortSettingIntoHistory(); 
    };

    sort.byDate = function () {
        if(sort.dateAsc){
            sort.bySubmittedAsc();
        } else {
            sort.bySubmittedDesc();
        }
        insertSortSettingIntoHistory();
    };

    sort.byWordAsc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.words - +b.dataset.words;
        }).appendTo($wrapper);

        sort.sortSetting = "byWordAsc";
        sort.wordAsc = false;
    }

    sort.byWordDesc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +b.dataset.words - +a.dataset.words;
        }).appendTo($wrapper);

        sort.sortSetting = "byWordDesc";
        sort.wordAsc = true;
        // insertSortSettingIntoHistory(); 
    }

    sort.bySubmittedAsc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +a.dataset.submitted - +b.dataset.submitted;
        }).appendTo($wrapper);

        sort.sortSetting = "bySubmittedAsc";
        sort.dateAsc = false;
        
    };

    sort.bySubmittedDesc = function () {
        $wrapper.find('li').sort(function(a, b) {
            return +b.dataset.submitted - +a.dataset.submitted;
        }).appendTo($wrapper);

        sort.sortSetting = "bySubmittedDesc";
        sort.dateAsc = true;
        // insertSortSettingIntoHistory();
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
                    sort.bySubmittedAsc();
                    break;
                case "bySubmittedDesc":
                    sort.bySubmittedDesc();
                    break;
                default:
                    console.log("localStorage value not valid");
            }
        }
    }

    return sort;
}());