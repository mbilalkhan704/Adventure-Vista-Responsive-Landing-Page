// Right Arrow & Left Arrow
let rightArrow = document.querySelector('#carousel-1 .carousel1-right-arrow');
let leftArrow = document.querySelector('#carousel-1 .carousel1-left-arrow');

// List of all the screens in carousel
let screenStore = document.querySelectorAll('#carousel-1 .carousel1-screen');
let numofScreens = screenStore.length;

// List of all the circle stores
let circleStore = document.querySelectorAll('#carousel-1 .carousel1-circle-container .carousel1-circle');

// number to target main screen
let currentScreen = 0;

// Currently in animation or not
let inAnim = false;

// Animation time
let animTime = 500;

// Sort out starting position
sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);

// Initially hide the text container on the first screen
const textContainer = screenStore[currentScreen].querySelector('.carousel1-text-container');
textContainer.style.opacity = '0';
textContainer.style.transform = 'translateY(500px)';

// Add 'active' class
screenStore[currentScreen].classList.add('active');

// After a short delay, make the text container visible with a transition
setTimeout(() => {
    textContainer.style.transition = 'opacity 0.5s ease 0s, transform 0.5s ease 2s';
    textContainer.style.opacity = '1';
    textContainer.style.transform = 'translateY(0)';
}, 500);

// Sort out circle styling
highlightCircle(circleStore[0]);

// User clicks on rightArrow
rightArrow.addEventListener('click', () => {
    startAnim('right');
});

// User clicks on leftArrow
leftArrow.addEventListener('click', () => {
    startAnim('left');
});

function startAnim(direction) {
    if (!inAnim) {
        inAnim = true;
        if (direction === 'right') {
            moveRight();
            if (currentScreen != 3) {
                highlightCircle(circleStore[currentScreen + 1], 'right');
            }
            else {
                highlightCircle(circleStore[0], 'right');
            }
        }
        else if (direction === 'left') {
            moveLeft();
            highlightCircle(circleStore[currentScreen - 1], 'left');
        }
        else {
            inAnim = false;
            return;
        }
    }
}

// Move to the right
function moveRight() {
    // Move towards next screen as usual
    if (currentScreen < numofScreens - 1) {
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[currentScreen + 1]);
        setTimeout(() => {
            inAnim = false;
            currentScreen++;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime);
    }
    else {
        // Or the screen coming in is the first screen again
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[0]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = 0;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime);
    }
}

// Move to the left
function moveLeft() {
    // Move back to screen previously on, as usual
    if (currentScreen > 0) {
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[currentScreen - 1]);
        setTimeout(() => {
            inAnim = false;
            currentScreen--;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime);
    }
    else {
        // Move back to the last screen container
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[numofScreens - 1]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = numofScreens - 1;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime);
    }
}

// Animation methods
function toLeft(screen) {
    screen.style.animation = 'toLeft 0.5s ease-in-out forwards';
    setTimeout(() => {
        screen.style.animation = '';
    }, animTime);
    screen.classList.add('active');
}

function toRight(screen) {
    screen.style.animation = 'toRight 0.5s ease-in-out forwards';
    setTimeout(() => {
        screen.style.animation = '';
    }, animTime);
    screen.classList.add('active');
}

function comeLeft(screen) {
    screen.style.animation = 'comeLeft 0.5s ease-in-out forwards';
    setTimeout(() => {
        screen.style.animation = '';
    }, animTime);
}

function comeRight(screen) {
    screen.style.animation = 'comeRight 0.5s ease-in-out forwards';
    setTimeout(() => {
        screen.style.animation = '';
    }, animTime);
}

//Sort positioning. Don't want images to overlap
function sortPositioning(mainScreen, leftScreen, rightScreen) {
    // If right screen is undefined, we need to repeat first screen.
    if (rightScreen === undefined) {
        rightScreen = screenStore[0];
    }
    // If left screen is undefined, we need to repeat last screen.
    if (leftScreen === undefined) {
        leftScreen = screenStore[numofScreens - 1];
    }
    screenStore.forEach(screen => {
        if (screen === mainScreen) {
            screen.style.display = 'block';
            screen.style.left = '0px';
        }
        else if (screen === leftScreen) {
            screen.style.display = 'block';
            screen.style.left = '-100%';
        }
        else if (screen === rightScreen) {
            screen.style.display = 'block';
            screen.style.left = '100%';
        }
        else {
            screen.style.display = 'none';
        }
        screen.classList.remove('active');
    })
    mainScreen.classList.add('active');

}

//The Circles Logic
// When user clicks 0n one of the circles
circleStore.forEach(circle => {
    circle.addEventListener('click', event => {
        if (!inAnim) {
            // Convert nodeList to Array to use 'indexof' method
            let circleStoreArray = Array.prototype.slice.call(circleStore);
            let circleIndex = circleStoreArray.indexOf(event.target);
            // Configure circle styling
            highlightCircle(event.target);
            // Work out whether we need to move right or left, or nowhere
            if (circleIndex !== currentScreen) {
                if (circleIndex > currentScreen) {
                    changeScreenCircleClick(circleIndex, 'right');
                }
                else if (circleIndex < currentScreen) {
                    changeScreenCircleClick(circleIndex, 'left');
                };
            };
        }
    });
});

function changeScreenCircleClick(circleIndex, direction) {
    inAnim = true;
    if (direction === 'right') {
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[circleIndex]);
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[circleIndex]);
    }
    else if (direction === 'left') {
        sortPositioning(screenStore[currentScreen], screenStore[circleIndex], screenStore[currentScreen + 1]);
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[circleIndex]);
    }
    else {
        inAnim = false;
        return;
    }
    // Remove 'active' class from all screens
    screenStore.forEach(screen => {
        screen.classList.remove('active');
    });

    // Add 'active' class to the current screen
    screenStore[circleIndex].classList.add('active');
    setTimeout(() => {
        inAnim = false;
        currentScreen = circleIndex;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime);
}

function highlightCircle(circleSelect, direction) {
    if (circleSelect === undefined && direction === 'right') {
        circleSelect = circleStore[currentScreen];
    }
    else if (circleSelect === undefined && direction === 'left') {
        circleSelect = circleStore[numofScreens - 1];
    }
    else if (circleSelect === undefined) {
        // Provide a default behavior, like selecting the current circle
        circleSelect = circleStore[currentScreen];
    }
    circleStore.forEach(circle => {
        if (circle === circleSelect) {
            circle.classList.add("carousel1-circle-fill");
        }
        else {
            circle.classList.remove("carousel1-circle-fill");
        }
    })
}

// Auto Scroll Feature
let carousel = document.getElementById('carousel-1');
let scrollTime = Number(carousel.getAttribute('auto-scroll'));

// Auto Scroll will be set up the very first time
let autoWipe = setInterval(() => {
    startAnim('right');
}, scrollTime)
// Only implement the feature if the user has included the attribute 'auto-scroll'
if (scrollTime) {
    // Clear the timer when the user hover on the carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoWipe);
    })
    // Re-invoke the timer when the user hover out of the carousel
    carousel.addEventListener('mouseleave', () => {
        autoWipe = setInterval(() => {
            startAnim('right');
        }, scrollTime)
    })
}