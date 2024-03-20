const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

const modal2 = document.querySelector('.modal2');
const openModal2 = document.querySelector('.open-button2');
const closeModal2 = document.querySelector('.close-button2');

const modal3 = document.querySelector('.modal3');
const openModal3 = document.querySelector('.open-button3');
const closeModal3 = document.querySelector('.close-button3');

const modal4 = document.querySelector('.modal4');
const openModal4 = document.querySelector('.open-button4');
const closeModal4 = document.querySelector('.close-button4');

const modal5 = document.querySelector('.modal5');
const openModal5 = document.querySelector('.open-button5');
const closeModal5 = document.querySelector('.close-button5');

const modal6 = document.querySelector('.modal6');
const openModal6 = document.querySelector('.open-button6');
const closeModal6 = document.querySelector('.close-button6');

// NAVBAR STICKY //

let theEnd = 0,
    navbar = document.getElementById('navbar');

window.addEventListener('scroll', function(){
    var scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    if(scrollTop > theEnd){
        navbar.style.top = '-70px';
    }
    else{
        navbar.style.top = '0';
    }
    theEnd = scrollTop;
})

// END NAVBAR STICKY //


// NAVBAR RESPONSIVE //

document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let currentDropdown
    if(isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})

// END NAVBAR RESPONSIVE //

// MODAL WINDOW //

//1
openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

//2
openModal2.addEventListener('click', () => {
    modal2.showModal();
})

closeModal2.addEventListener('click', () => {
    modal2.close();
})

//3
openModal3.addEventListener('click', () => {
    modal3.showModal();
})

closeModal3.addEventListener('click', () => {
    modal3.close();
})

//4
openModal4.addEventListener('click', () => {
    modal4.showModal();
})

closeModal4.addEventListener('click', () => {
    modal4.close();
})

//5
openModal5.addEventListener('click', () => {
    modal5.showModal();
})

closeModal5.addEventListener('click', () => {
    modal5.close();
})

//6
openModal6.addEventListener('click', () => {
    modal6.showModal();
})

closeModal6.addEventListener('click', () => {
    modal6.close();
})

//END MODAL WINDOW //

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}



carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));