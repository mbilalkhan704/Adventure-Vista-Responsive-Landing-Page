const element1 = document.querySelector('.aboutUs-content .aboutUs-image-hover-effect2-1');
const element2 = document.querySelector('.aboutUs-content .aboutUs-image-hover-effect2-2');
const element3 = document.querySelector('.aboutUs-text-btn');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            element1.classList.add('animated-aboutUsImg');
            element2.classList.add('animated-aboutUsImg');
            element3.classList.add('animated-aboutUsTxtBtn');
        } else {
            element1.classList.remove('animated-aboutUsImg');
            element2.classList.remove('animated-aboutUsImg');
            element3.classList.remove('animated-aboutUsTxtBtn');
        }
    });
});

observer.observe(element1,element2, element3);