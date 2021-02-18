((d) => {
    
    show1 = d.getElementById("btn1");

    show1.addEventlisterner("click", magnify1)

    function magnify1() {
        magnify("abstract1", 2);
        d.getElementById("hide").disabled = false;
        d.getElementById("btn1").disabled = true;
    }

    console.log(show1);

})(document);

