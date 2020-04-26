var dataHolder = (function() {
    var data = {
        currentAmount: []
    };

    return {
        addNumber: function() {

        },

        getData: function() {
            return data;
        }
    }
})();

var uiController = (function() {

})();

var controller = (function(dataHolder, uiController) {
    var setupEventlisteners = function() {
        var allData, clickedNum;
        
        allData = dataHolder.getData();
        
        document.querySelector(".numpad").addEventListener("click", function(event){
            clickedNum = event.target.id;

            // dataHolder.addNumber();
            console.log(clickedNum);
            console.log(allData);
        });
    }

    return {
        init: function() {
            setupEventlisteners();
        }
    }
})(dataHolder, uiController);

controller.init();