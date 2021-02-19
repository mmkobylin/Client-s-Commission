((d) => {

    function magnify(imgID, zoom) {
        var img, glass, w, h, bw;
        img = document.getElementById(imgID);
        /*create magnifier glass:*/
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        /*insert magnifier glass:*/
        img.parentElement.insertBefore(glass, img);
        /*set background properties for the magnifier glass:*/
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        /*execute a function when someone moves the magnifier glass over the image:*/
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        function moveMagnifier(e) {
          var pos, x, y;
          /*prevent any other actions that may occur when moving over the image*/
          e.preventDefault();
          /*get the cursor's x and y positions:*/
          pos = getCursorPos(e);
          x = pos.x;
          y = pos.y;
          /*prevent the magnifier glass from being positioned outside the image:*/
          if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
          if (x < w / zoom) {x = w / zoom;}
          if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
          if (y < h / zoom) {y = h / zoom;}
          /*set the position of the magnifier glass:*/
          glass.style.left = (x/8) + "vh";
          glass.style.top = (y - h) + "px";
          /*display what the magnifier glass "sees":*/
          glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }
        function getCursorPos(e) {
          var a, x = 0, y = 0;
          e = e || window.event;
          /*get the x and y positions of the image:*/
          a = img.getBoundingClientRect();
          /*calculate the cursor's x and y coordinates, relative to the image:*/
          x = e.pageX - a.left;
          y = e.pageY - a.top;
          /*consider any page scrolling:*/
          x = x - window.pageXOffset;
          y = y - window.pageYOffset;
          return {x : x, y : y};
        }
    }
    // this is returning as a nodelist OBJECT
    hideItems = d.querySelectorAll("#hide");
    // this one changes it into an array
    hideArray = Array.from(hideItems);
    // disabling hide buttons at the beginning
    hideItems.forEach(item => {
        item.disabled = true; 
    })

    buttonItems = d.querySelectorAll("#btn");
    buttonArray = Array.from(buttonItems);

    hideItems.forEach(item => {
        item.addEventListener('click', () => { 
            disable();
            item.disabled = true 
            }
        )
    });

    function disable(){
        d.querySelectorAll(".img-magnifier-glass").forEach(item => {
            item.classList.toggle("img-magnifier-glass");
        }) 
        buttonItems.forEach(item => {
            item.disabled = false; 
            }
        )
    }

    // function takes a number
    function combine(number) {
        // declares two strings
        var str1 = "abstract";
        var str2 = `${number}`;
        // disables or enables the correct items in the array
        buttonArray[number].disabled = true;
        hideArray[number].disabled = false;
        // returns two combined strings
        return (str1.concat(str2));
    }
    
    function valuation() {
        for (let i = 0; i < buttonArray.length; i++) {
                buttonArray[i].addEventListener("click", function() {
                    var value = combine(i);
                    // magnifies ${value} as it is corresponding to imgID
                    magnify(`${value}`, 2);
                } 
            )
        }
    }
   
    valuation();

})(document);

