function isNumberKeyCnic(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode != 45 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}
function isNumberKeyContact(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode != 32 && charCode != 43 && charCode != 45 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}
function isNumberKeyAge(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

const bookingFormSection = document.querySelector('section.bookingForm');
const bookingFormCont = document.querySelector('.booking-form-cont');
const bookingFormText = document.querySelector('.booking-form-text');
const bfBtns = document.querySelector('.bf-btns');
const hideButton = document.querySelector('.hide-form-btn');
const bookNowButton = document.querySelector('.book-now-btn');

function toggleSlide(contentToShow, contentToHide, pad) {
    contentToShow.forEach(contentShow => {
        if (contentShow.classList.contains('collapsed')) {
            // Remove the collapsed class to show the contentToShow
            contentShow.classList.remove('collapsed');
            
            // Temporarily set the height to the scrollHeight
            contentShow.style.height = contentShow.scrollHeight + 'px';
            contentShow.style.padding = pad; // Adjust padding as necessary
    
            // After a delay, set the height to auto to adjust to dynamic content
            setTimeout(() => {
                contentShow.style.height = 'auto';
            }, 200); // Match the transition duration
        }
    });

    contentToHide.forEach(contentHide => {
        if (!contentHide.classList.contains('collapsed')) {
            // Collapse contentToHide
        contentHide.classList.add('collapsed');
        setTimeout(() => {
            contentHide.style.height = '0';
            contentHide.style.padding = '0';
        }, 10); // Slight delay to trigger the transition
    }
    });        
}

bookNowButton.addEventListener('click', function() {
    toggleSlide([bookingFormCont, hideButton, bfBtns], [bookingFormText], '0.5vw');
});

hideButton.addEventListener('click', function() {
    toggleSlide([bookingFormText], [bookingFormCont, hideButton, bfBtns], '1rem');
});