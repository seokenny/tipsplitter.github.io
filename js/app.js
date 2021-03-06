var dataHolder = (function() {
    var data = {
        currentAmount: [],
        numAmount: 0.00,
        currentRange: 0,
        currentTip: 0,
        eachPerson: [],
        allTips: ["15%", "18%", "20%", "25%"]
    };

    return {
        getData: function() {
            return data;
        },

        getCurrentAmount: function() {
            return data.currentAmount;
        },

        getCurrentRange: function() {
            return data.currentRange;
        },

        getNumAmount: function() {
            return data.numAmount;
        },

        getCurrentTip: function() {
            return data.currentTip;
        },

        getEachPerson: function() {
            return data.eachPerson;
        },

        getAllTips: function() {
            return data.allTips;
        },
        
        changeRange: function(range) {
            data.currentRange = range;
        },

        changeTip: function(tip) {
            data.currentTip = tip;
        },

        setNumAmount: function(num) {
            data.numAmount = num;
        },

        setEachPerson: function(per) {
            for(var i = 0; i < data.currentRange; i++){
                data.eachPerson.push(per);
            }
        },

        resetData: function() {
            data.currentAmount = [];
            data.numAmount = 0.00;
            data.currentRange = 0;
            data.currentTip = 0;
            data.eachPerson = [];
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
            document.querySelector(".display__total").textContent = "$" + totalAmount2;
            document.querySelector(".total__bill").textContent = "$" + totalAmount2;

        },
        
        displayRange: function(range) {
            // document.querySelector(".slider__display").textContent = range;
            document.querySelector(".friends__num").textContent = range;
            document.querySelector(".slider__display").textContent = range;
        },

        displayTip: function(tip, allTips) {
            var tipDisplay, allButtons, allButtonsArr;
            allButtons = [];

            allButtons = document.querySelectorAll(".tip__button");
            allButtonsArr = Array.from(allButtons);

            allTests = document.querySelectorAll(".test");
            allTestsArr = Array.from(allTests);

            allChecks = document.querySelectorAll(".checkimg");
            allChecksArr = Array.from(allChecks);

            for(var i = 0; i < allButtonsArr.length; i++){
                allButtonsArr[i].classList.remove("setTip");
                allTests[i].classList.remove("testAnimate");
                allChecks[i].classList.remove("checkAnimate");
            }
            event.target.classList.add("setTip");
            event.target.firstElementChild.classList.add("testAnimate");
            event.target.children[0].lastChild.classList.add("checkAnimate");
            
            
            tipDisplay = document.querySelector(".tip__display");
            if(tip) {
                tipDisplay.textContent = tip;
            } else {
                tipDisplay.textContent = "0";
            }
        },

        removeTip: function() {
            document.querySelector(".tip__display").textContent = "0";
        },

        removeTotal: function() {
            document.querySelector(".total__bill").textContent = "$0.00";
            document.querySelector(".display__total").textContent = "$0.00";
        },

        switchOptions: function(splitFunc, eachPerPerson) {
            
            document.querySelector(".split__button").classList.add("goback");
            document.querySelector(".split__button").classList.add("no-pointer");
            this.showSplit(splitFunc, eachPerPerson);
        },

        showSplit: function(splitFunc, eachPerPerson) {
            document.querySelector(".split__text").innerHTML = "";
            document.querySelector(".st2").innerHTML = "";
            document.querySelector(".split__bill").innerHTML += '<div class="animated bounceIn delay-1s"><img src="images/hand.svg" style="height: 50px; margin-bottom:30px" class="animated bounceInDown delay-1s thumbs__image"><br/>Each person pays<br/><span class="totalprice">$' + eachPerPerson[0] + '</span><br/>including tip<br/><button class="gotit animated bounceIn delay-1s">Got it!</button></div>';
            if(document.querySelector(".split__button").classList.contains("goback")){
                document.querySelector(".split").removeEventListener("click", splitFunc);
                document.querySelector(".gotit").addEventListener("click",function(){
                    window.location.reload(false);
                });
            }
        }
    };
})();

var controller = (function(dataHolder, uiController) {
    var setupEventlisteners = function() {
        var currAmount, numberAmount;
        
        currAmount = dataHolder.getCurrentAmount();
        
        //Numpad event listener
        document.querySelector(".numpad").addEventListener("click", function(event){
            var clickedNum, clickedNumSplit, clickedNumID, setNum, fixedNum;
            clickedNum = event.target.id;
            clickedNumSplit = clickedNum.split("-");
            clickedNumID = clickedNumSplit[1];

            //Backspace
            if(clickedNumID == 10){
                window.location.reload(false);
            }
            else if(currAmount.length < 8){
                if(clickedNumID < 10 ){
                    currAmount.push(clickedNumID);
                } 
                else {
                    currAmount.pop();
                    if(currAmount.length <= 0) {
                        currAmount[0] = 0;
                    }
                    
                }
            } else if(clickedNumID > 9) {
                currAmount.pop();
            }
            
            //Push ID to data.currentAmount

            setNum = parseInt(currAmount.join(""))/100;
            fixedNum = setNum.toFixed(2);
            dataHolder.setNumAmount(parseFloat(fixedNum));
            

            uiController.displayTotal(currAmount);

        });
        
        //Range event listener
        document.querySelector(".slider").addEventListener("input", setRange);

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
        var currentTip, allTips;

        //data.currentTip = 0
        allTips = dataHolder.getAllTips();
        tip = parseInt(event.target.textContent.replace("%", ""));
        dataHolder.changeTip(tip);
        uiController.displayTip(tip, allTips);

        //tip = chosen tip %
        //allTips = array of set tips
    }

    //splits bill
    var splitBill = function() {
        var range, numAmount, tipPerc, tipAmount, finalEach, totalPer, totalBill, splitFunc;

        //Get data.currentRange
        range = dataHolder.getCurrentRange();
        numAmount = dataHolder.getNumAmount();
        tipPerc = dataHolder.getCurrentTip();
        splitFunc = splitBill;

        if(range > 0 && numAmount > 0 && tipPerc > 0) {
            //Calculate split
            //Calculated tip and added tip to total amount
            tipAmount = numAmount * (tipPerc/100);

            totalBill = numAmount + tipAmount;

            //Problem
            totalPer = totalBill/range;
            finalEach = (totalPer).toFixed(2);

            dataHolder.setEachPerson(finalEach);

            eachPerArray = dataHolder.getEachPerson();

            uiController.switchOptions(splitFunc, eachPerArray);
        }

    }

    return {
        init: function() {
            setupEventlisteners();
        }
    }
})(dataHolder, uiController);

controller.init();