const sidebar = document.querySelector(".nt-vlist-o")
const computedStyle = window.getComputedStyle(sidebar);
const innerSidebarDiv = document.querySelector('.nt-vlist-i');

function toggleSidebar() {
  if (computedStyle.display === "none") {
    sidebar.style.display = "flex";
    innerSidebarDiv.scrollTop = 0;
  }
  else if (computedStyle.display === "flex") {
    sidebar.style.display = "none";
  }
}




function navigateTo(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    const offset = 90;
    const targetRect = targetSection.getBoundingClientRect();
    const targetOffset = targetRect.top + window.scrollY - offset;

    window.scroll({
      top: targetOffset,
      behavior: 'smooth'
    });
  } 
}



// Get the navbar element
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Only hide the navbar if the scroll is greater than a certain threshold
  if (currentScrollY > 150 && lastScrollY < currentScrollY) {
    navbar.classList.add('navbar--hidden');
  } else {
    navbar.classList.remove('navbar--hidden');
  }

  lastScrollY = currentScrollY;
});



// Navtab Buttons Animations
function observeInView(elements, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      callback(entry.isIntersecting, entry.target);
    });
  }, { threshold: [0, 0.1, 0.9, 1] });

  elements.forEach(element => observer.observe(element));
}

const elementsList = ['#home', '#exclusives', '#services', '#bookings', '#about-us', '#contact-us'];
const elementsButtons = ['#home-btn', '#exclusives-btn', '#services-btn', '#bookings-btn', '#about-us-btn', '#contact-us-btn'];

let currentActiveButton = null;
let lastScrollTop = 0;
let firstInViewElement = null;
let mostRecentInViewElement = null;
const elements = elementsList.map(selector => document.querySelector(selector));
const buttons = elementsButtons.map(selector => document.querySelector(selector));

// Function to apply the custom styles to the buttons
function applyActiveStyles(button) {
  button.style.textDecoration = "underline 1.5px";
  button.style.textUnderlineOffset = "5px";
  button.style.textDecorationColor = "#FF595A";
  button.style.transform = "translateY(1%) scale(1.05)";
}

// Function to remove the custom styles from the buttons
function removeActiveStyles(button) {
  button.style.textDecoration = "none";
  button.style.transform = "none";
}

// Function to update the highlight based on the element in view
function updateButtonHighlight() {
  if (firstInViewElement) {
    const index = elements.indexOf(firstInViewElement);
    if (currentActiveButton && currentActiveButton !== buttons[index]) {
      removeActiveStyles(currentActiveButton);
    }
    applyActiveStyles(buttons[index]);
    currentActiveButton = buttons[index];
  }
}

// Add hover event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    if (currentActiveButton && currentActiveButton !== button) {
      removeActiveStyles(currentActiveButton);
    }
    applyActiveStyles(button);
  });

  button.addEventListener('mouseleave', () => {
    if (currentActiveButton && currentActiveButton !== button) {
      removeActiveStyles(button);
      applyActiveStyles(currentActiveButton);
    }
  });
});

// Initial highlight of the first button
document.addEventListener('DOMContentLoaded', () => {
  currentActiveButton = buttons[0];
  applyActiveStyles(currentActiveButton);
  firstInViewElement = elements[0];
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  observeInView(elements, (inView, element) => {
    const index = elements.indexOf(element);
    const button = buttons[index];

    if (inView) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (!firstInViewElement) {
          firstInViewElement = element;
          updateButtonHighlight();
        }
      } else {
        // Scrolling up
        mostRecentInViewElement = element;
        if (currentActiveButton !== button) {
          if (currentActiveButton) {
            removeActiveStyles(currentActiveButton);
          }
          applyActiveStyles(button);
          currentActiveButton = button;
        }
      }
    } else {
      if (firstInViewElement === element) {
        // Element that was first in view is going out of view
        removeActiveStyles(button);
        currentActiveButton = null;
        firstInViewElement = null;
        
        // Set highlight to the most recent element in view, if any
        if (mostRecentInViewElement) {
          const recentIndex = elements.indexOf(mostRecentInViewElement);
          applyActiveStyles(buttons[recentIndex]);
          currentActiveButton = buttons[recentIndex];
        }
      }
    }
  });

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
