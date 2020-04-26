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
    return {
        displayTotal: function(total) {
            if(total.length > 0) {
                console.log(total);
            }
            else {
                console.log("nothing yet");
            }
            document.querySelector(".display__total").textContent = total.join("");
        }
    };
})();

var controller = (function(dataHolder, uiController) {
    var setupEventlisteners = function() {
        var allData;
        
        allData = dataHolder.getData();
        
        document.querySelector(".numpad").addEventListener("click", function(event){
            var clickedNum, clickedNumSplit, clickedNumID;
            clickedNum = event.target.id;
            clickedNumSplit = clickedNum.split("-");
            clickedNumID = clickedNumSplit[1];

            //Push ID to data
            allData.currentAmount.push(clickedNumID);
            console.log(allData.currentAmount);

            uiController.displayTotal(allData.currentAmount);
        });
        
    }

    return {
        init: function() {
            setupEventlisteners();
        }
    }
})(dataHolder, uiController);

controller.init();