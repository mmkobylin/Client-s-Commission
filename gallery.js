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
    
    show1 = d.getElementById("btn1");

    show1.addEventListener("click", magnify1)

    show2 = d.getElementById("btn2");

    show2.addEventListener("click", magnify2)

    hide1Glass = d.getElementById("hide1");

    hide1Glass.addEventListener("click", disable);

    hide2Glass = d.getElementById("hide2");

    hide2Glass.addEventListener("click", disable);


    hideArray = Array.from(d.querySelectorAll("#hide"));
    console.log(hideArray);

    var glassDisabler = document.getElementById('hide1');

    glassDisabler.disabled = true; 

    function magnify1() {
        magnify("abstract1", 2);
        glassDisabler.disabled = false;
        show1.disabled = true;
    }

    function magnify2() {
        magnify("abstract2", 2);
        glassDisabler.disabled = false;
        show2.disabled = true;
    }

    function disable(){
        document.querySelector(".img-magnifier-glass").classList.toggle("img-magnifier-glass");
        glassDisabler.disabled = true;
        if (show1.disabled === true) {
            show1.disabled = false;
        } else if (show2.disabled === true) {
            show2.disabled = false;
        } else {
            console.log('koza');
        }
    }

    
})(document);

