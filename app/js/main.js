window.onload = () => {

    let images = document.querySelectorAll('img');

    images.forEach(img => {
        img.onmousedown = (e) => e.preventDefault();
    });

    document.getElementById('to-top').onclick = () => {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;
    }
}

window.onscroll = () => {
    scrollFunction();
    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("to-top").style.display = "block";
        } else {
            document.getElementById("to-top").style.display = "none";
        }
    }
}