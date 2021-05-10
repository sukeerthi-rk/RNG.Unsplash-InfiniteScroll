let imgContainer = document.querySelector(".image-container");
let loader = document.querySelector(".loader");
let ready = false;
let imagesLoaded = 0;
let imageArr = [];
let totalImages = 0;
let page = 1;
const apiKey = "W7OocGCSK-Mrsz4NF8639FI0xuVNeM4JCXaBHXjIO-M";
// const unsplashApiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;

function pageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function addImgDom() {
    totalImages += imageArr.length;
    imageArr.forEach((photo) => {
        let item = document.createElement("a");
        item.href = photo.links.html;
        item.target = "_blank";
        let image = document.createElement("img");
        image.src = photo.urls.regular;
        image.alt = photo.alt_description;
        image.title = photo.alt_description;
        image.addEventListener('load', pageLoaded);
        item.appendChild(image);
        imgContainer.appendChild(item);
    })
}
async function getImg() {
    try {
        const unsplashApiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
        let response = await fetch(unsplashApiUrl);
        imageArr = await response.json();
        totalImages + 10;
        addImgDom();
        page++;

    }
    catch (e) {
        console.log(e);
    }
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImg();


    }
})
getImg();
