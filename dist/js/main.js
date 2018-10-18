window.onload = () => {
    let images = document.querySelectorAll('img');

    images.forEach(img => {
        img.onmousedown = (e) => e.preventDefault();
    });
}