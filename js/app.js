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
            var totalAmount, totalAmount2, totalString;

            totalAmount = parseInt(total.join(""))/100;
            totalAmount2 = totalAmount.toFixed(2);
            document.querySelector(".display__total").textContent = totalAmount2;
            document.querySelector(".total__bill").textContent = totalAmount2;

        },
        
        displayRange: function(range) {
            document.querySelector(".slider__display").textContent = range;
            document.querySelector(".friends__num").textContent = range;
        },

        displayTip: function(tip) {
            var tipDisplay;
            tipDisplay = document.querySelector(".tip__display");
            console.log(tip);
            if(tip) {
                tipDisplay.textContent = tip;
            } else {
                tipDisplay.textContent = "0";
            }
        },

        switchOptions: function(range) {
            document.querySelector(".options").classList.toggle("hidden");
            this.showSplit(range);
        },

        showSplit: function(range) {
            console.log(range);
            for(var i = 0; i < range; i++){
                document.querySelector(".split__display").innerHTML += '<div class="split__display--item"></div>';
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

        //Split bill event listener
        document.querySelector(".split").addEventListener("click", splitBill);
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

    //splits bill
    var splitBill = function() {
        var range;

        //Get data.currentRange
        range = dataHolder.getCurrentRange();

        uiController.switchOptions(range);
    }

    return {
        init: function() {
            setupEventlisteners();
        }
    }
})(dataHolder, uiController);

controller.init();