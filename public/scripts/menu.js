
var MenuDisplay = function() {

    var thisMenu = this;

    this.options = ["Yes", "No"];
    
    this.element = document.createElement("div");

    Object.defineProperty(thisMenu, "selected", {
        get: function () {
            return thisMenu._selected;
        },
        set: function (value) {
            
            if (thisMenu.selectedElement) {
                thisMenu.selectedElement.className =
                    thisMenu.selectedElement.className.replace(/\s?selected/i, "");
            }

            thisMenu._selected = value;
            var optionIndex = thisMenu.options.indexOf(value);
            thisMenu.selectedElement = thisMenu.optionElements[optionIndex];
            thisMenu.selectedElement.className += " selected";

        }
    });

    this.changeSelection = function(event) {

        var newIndex = thisMenu.options.indexOf(thisMenu.selected);
        var lastIndex = thisMenu.options.length - 1;

        if ( /up/i.test(event.type) )
            newIndex--;
        else
            newIndex++;

        if ( newIndex < 0 )
            newIndex = lastIndex;
        else if ( newIndex > lastIndex )
            newIndex = 0;

        thisMenu.selected = thisMenu.options[newIndex];
    };

    this.chooseSelection = function() {
        thisMenu.finalize(thisMenu.selected);
    };

    this.draw = function(parentEl) {

        thisMenu.optionElements = [];

        for (var i = 0; i < thisMenu.options.length; i++) {

            thisMenu.optionElements[i] = document.createElement("div");

            var thisOption = thisMenu.options[i];
            var thisOptionElement = thisMenu.optionElements[i];

            thisOptionElement.className = "menu_option";
            thisOptionElement.innerHTML = thisOption;
            thisMenu.element.appendChild(thisOptionElement);

        }
        if (!thisMenu.selected) {
            thisMenu.selected = thisMenu.options[0];
        }

        parentEl.appendChild(thisMenu.element);
        document.addEventListener("pushUp", thisMenu.changeSelection);
        document.addEventListener("pushDown", thisMenu.changeSelection);
        document.addEventListener("pushA", thisMenu.chooseSelection);

    };

};
