var dataHolder = (function() {
    var data = {
        currentAmount: [],
        numAmount: 0,
        currentRange: 0,
        numPeople: -1,
        currentTip: 0
    };

    return {
        addRange: function() {
            console.log(data.currentRange);
        },

        getData: function() {
            return data;
        },

        getCurrentAmount: function() {
            return data.currentAmount;
        },

        getCurrentRange: function() {
            return data.currentRange;
        },

        getCurrentTip: function() {
            return data.currentTip;
        },
        
        changeRange: function(range) {
            data.currentRange = range;
        },

        changeTip: function(tip) {
            data.currentTip = tip;
        }
    }
})();

var uiController = (function() {
    return {
        displayTotal: function(total) {
            //total = data.currentAmount array
            var totalAmount, totalString;

            totalAmount = parseInt(total.join(""))/100;
            document.querySelector(".display__total").textContent = totalAmount;
            total.numAmount = totalAmount;

        },
        
        displayRange: function(range) {
            document.querySelector(".slider__display").textContent = range;
        },

        displayTip: function(tip) {
            var tipDisplay;
            tipDisplay = document.querySelector(".tip__display").textContent;
            if(tip) {
                tipDisplay = tip;
            } else {
                tipDisplay = "---";
            }
            
        }
    };
})();

var controller = (function(dataHolder, uiController) {
    var setupEventlisteners = function() {
        var currAmount;
        
        currAmount = dataHolder.getCurrentAmount();
        
        //Numpad event listener
        document.querySelector(".numpad").addEventListener("click", function(event){
            var clickedNum, clickedNumSplit, clickedNumID;
            clickedNum = event.target.id;
            clickedNumSplit = clickedNum.split("-");
            clickedNumID = clickedNumSplit[1];

            //Push ID to data.currentAmount
            currAmount.push(clickedNumID);

            uiController.displayTotal(currAmount);
        });
        
        //Range event listener
        document.querySelector(".slider").addEventListener("change", setRange);

        //Tip amount event listener
        document.querySelector(".tip").addEventListener("click", setTip);
    };

    //sets the currentRange to users input
    var setRange = function() {
        var range;

        range = Math.round(parseInt(event.target.value)/200);

        dataHolder.changeRange(range);
        uiController.displayRange(range);
        //DO TO: Make it snap to the range
        
    }

    //sets the chosenTip
    var setTip = function() {
        var currentTip;

        //data.currentTip = 0
        tip = parseInt(event.target.textContent.replace("%", ""))
        dataHolder.changeTip(tip);
        uiController.displayTip(tip);
    }

    return {
        init: function() {
            setupEventlisteners();
        }
    }
})(dataHolder, uiController);

controller.init();