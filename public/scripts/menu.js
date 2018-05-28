
var MenuDisplay = function() {

    var thisMenu = this;

    this.options = ["Yes", "No"];
    
    this.element = document.createElement("div");

    this.draw = function(parentEl) {

        thisMenu.optionElements = [];

        var selectionFlag = false;
        for (var i = 0; i < thisMenu.options.length; i++) {

            var thisOption = thisMenu.options[i];
            thisMenu.optionElements[i] = document.createElement("span");
            var thisOptionElement = thisMenu.optionElements[i];

            thisOptionElement.className = "menu_option";
            if ( typeof thisOption == "object" ) {
                thisOptionElement.innerHTML = thisOption.value;
                if (thisOption.selected) {
                    thisOptionElement.className += " selected";
                    selectionFlag = true;
                }
            }
            else {
                thisOptionElement.innerHTML = thisOption;
            }

            thisMenu.element.appendChild(thisOptionElement);

            var lineBreak = document.createElement("br");
            thisMenu.element.appendChild(lineBreak);

        }
        if (!selectionFlag) {
            thisMenu.optionElements[0].className += " selected";
        }

        parentEl.appendChild(thisMenu.element);

    };

};
