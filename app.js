const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];
document.getElementById("search")
    .addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            document.getElementById("search-btn").click();
        }


    });

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key





// show images 
const showImages = (images) => {
    imagesArea.style.display = 'block';
    gallery.innerHTML = '';
    // show gallery title
    galleryHeader.style.display = 'flex';
    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
        gallery.appendChild(div);
        toggleSpinner(false);

    })

}

const getImages = (query) => {
    const search = document.getElementById('search').value;
    toggleSpinner(true);




    const KEY = '20265029-1a8ac9627f65dc27b61e8e4c2';
    fetch(`https://pixabay.com/api/?key=20265029-1a8ac9627f65dc27b61e8e4c2&q=${search}&image_type=photo&pretty=true`)
        .then(response => response.json())
        .then(data => showImages(data.hits))
        .catch(error => displayError('Something Went Wrong!!! Please Try Again'));






}

let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    element.classList.toggle("added");
    element.classList.toggle("remove");

    let item = sliders.indexOf(img);
    if (item === -1) {
        sliders.push(img);
    } else {
        sliders.delete(img);
    }
};



var timer
const createSlider = () => {
    // check slider image length
    if (sliders.length < 2) {
        alert('Select at least 2 image.')
        return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    const duration = document.getElementById('duration').value || 1000;

    if (duration < 0) {
        // crate slider previous next area
        alert("As value is less then zero, slider will not work,please try again thank you.");



    } else {
        sliders.forEach(slide => {
            let item = document.createElement('div')
            item.className = "slider-item";
            item.innerHTML = `<img class="w-100"
            src="${slide}"
            alt="">`;
            sliderContainer.appendChild(item)
        })
        changeSlide(0)
        timer = setInterval(function() {
            slideIndex++;
            changeSlide(slideIndex);
        }, duration);
    }

    // change slider index 
    const changeItem = index => {
        changeSlide(slideIndex += index);

    }

}


// change slide item
const changeSlide = (index) => {

    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach(item => {
        item.style.display = "none"
    })

    items[index].style.display = "block"
}

searchBtn.addEventListener('click', function() {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
})

sliderBtn.addEventListener('click', function() {
    createSlider()
})
const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    if (show) {
        spinner.classList.remove('d-none');
        spinner.classList.remove('d-flex');

    } else {
        spinner.classList.add('d-none');
        spinner.classList.remove('d-flex');
    }

}