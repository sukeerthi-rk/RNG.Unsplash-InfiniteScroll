let imgContainer = document.querySelector(".image-container");

let ready = false;
let imagesLoaded = 0;
let imageArr = [];
let totalImages = imageArr.length;
let page = 0;
const apiKey = "W7OocGCSK-Mrsz4NF8639FI0xuVNeM4JCXaBHXjIO-M";
function pageLoaded() {

    imagesLoaded + 10;
    if (imagesLoaded === totalImages) {
        ready = true;
    }
}

function addImgDom() {

    for (let i = 0; i < imageArr.length; i++) {

        let image = document.createElement("img");
        image.src = imageArr[i].urls.regular;
        imgContainer.appendChild(image);
        page++;
        if (i == imageArr.length - 1) {
            image.addEventListener('load', pageLoaded());
        }

    }


}
async function getImg() {
    page++;
    const unsplashApiUrl = `https://api.unsplash.com/photos/?client_id=W7OocGCSK-Mrsz4NF8639FI0xuVNeM4JCXaBHXjIO-M&page=${page}`;
    try {
        let response = await fetch(unsplashApiUrl);
        imageArr = await response.json();
        addImgDom();
        pageLoaded();
    }
    catch (e) {
        console.log(e);
    }
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getImg();
    }
})
getImg();
