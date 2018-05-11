steps[0] = function() {
    backButton.style.visibility = "hidden";
    stepTitle.innerHTML = "Choose an image...";
    
    var updateImage = function() {
        var fileSrc = "locations/" + fileUpload.value.replace("C:\\fakepath\\", "");
        img.src = "../../" + fileSrc;
        newLocation.image = img.src;
    };

    var addImageSize = function() {
        newLocation.imageSize = {
            width: img.naturalWidth,
            height: img.naturalHeight
        };
        img.style.visibility = "visible";
        nextButton.style.visibility = "visible";

        var ifWidthIsLonger = ( newLocation.imageSize.width > newLocation.imageSize.height );
        var longerSide = ifWidthIsLonger ? newLocation.imageSize.width : newLocation.imageSize.height;
        var shorterSide = ifWidthIsLonger ? newLocation.imageSize.height : newLocation.imageSize.width;
        
        var numOfTilesOnLongSide = 1;
        var tileSize = longerSide / numOfTilesOnLongSide;

        while ( shorterSide % tileSize ) {
            numOfTilesOnLongSide++;
            tileSize = longerSide / numOfTilesOnLongSide;
        }
        newLocation.tileSize = tileSize;

        var numOfTilesOnShortSide = shorterSide / tileSize;
        numOfRows = ifWidthIsLonger ? numOfTilesOnShortSide : numOfTilesOnLongSide;
        numOfColumns = ifWidthIsLonger ? numOfTilesOnLongSide : numOfTilesOnShortSide;
    };

    var img = document.createElement("img");
    img.addEventListener('load', addImageSize);
    if ( newLocation.image )
        img.src = newLocation.image;
    else
        img.style.visibility = "hidden";
    display.appendChild(img);

    var fileUpload = document.createElement("input");
    fileUpload.setAttribute("type", "file");
    fileUpload.addEventListener("change", updateImage);
    display.appendChild(fileUpload);

};
