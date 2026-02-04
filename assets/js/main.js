/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');

    navToggle.classList.remove('animate-toggle');
    navMenu.classList.remove('show-menu')
};

navLink.forEach((n) => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () => {
    const header = document.getElementById('header')

    this.scrollY >= 20 
    ? header.classList.add('bg-header') 
    : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop -58,
        sectionId = current.getAttribute('id'),
        sectionsClass = document.querySelector(
            '.nav-menu a[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        }else {
            sectionsClass.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixer = mixitup('.work-container', { /* container is a parent element*/
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 300
    }
});

/* Active work */
const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
    linkWork.forEach((a) => {
        a.classList.remove('active-work');
    });

    this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll(".resume-item");

accordionItems.forEach((item) => {
    const header = item.querySelector('.resume-header'),
    content = item.querySelector('.resume-content'),
    icon = item.querySelector('.resume-icon i');

    header.addEventListener('click', () => {
        const isOpen = item.classList.toggle('accordion-open');

        content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
        icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

        accordionItems.forEach((otherItem) => {
            if(otherItem !== item && otherItem.classList.contains('accordion-open')){
                otherItem.querySelector('.resume-content').style.height = '0';
                otherItem.querySelector('.resume-icon i').classList='ri-add-line';
                otherItem.classList.remove('accordion-open');
            }
        });
    });
});

/*=============== TESTIMONIALS SWIPER ===============*/
var servicesSwiper = new Swiper(".hobbies-swiper", {
    spaceBetween: 32,
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 4,
        },
        1208: {
          slidesPerView: 3,

        },
    },
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactSubject = document.getElementById('contact-subject');
const contactMessage = document.getElementById('contact-message');
const message = document.getElementById('message');

const inputs = [contactName, contactEmail, contactSubject, contactMessage];

const clearValidation = () => {
  inputs.forEach(input => input.classList.remove('input-error'));
  message.textContent = '';
};

inputs.forEach(input => {
  input.addEventListener('input', clearValidation);
});

const showPopup = (text, type = 'success') => {
  const popup = document.getElementById('popup');
  const message = document.getElementById('message');
  message.textContent = text;
  message.classList.remove('color-first', 'color-red');
  message.classList.add(type === 'error' ? 'color-red' : 'color-first');

  popup.classList.add('active');

  setTimeout(() => {
    popup.classList.remove('active');
  }, 3000);
};

const sendEmail = (e) => {
  e.preventDefault();

  let hasError = false;

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('input-error');
      hasError = true;
    }
  });

  if (hasError) {
    message.classList.remove('color-first');
    message.classList.add('color-red');
    // message.textContent = 'Fill in all fields';
    showPopup('Fill in all required fields', 'error');
    return;
  }

  emailjs.sendForm(
    'service_eqrsly2',
    'template_68hlvki',
    '#contact-form',
    '7LWrmhbsh1IsV1bkY'
  ).then(
    () => {
      message.classList.remove('color-red');
      message.classList.add('color-first');
    //   message.textContent = 'Form filled correctly';
      showPopup('Form filled correctly');

      setTimeout(() => {
        message.textContent = '';
      }, 7000);

      contactForm.reset();
    },
    () => {
      alert('Oops! Something went wrong...');
    }
  );
};

contactForm.addEventListener('submit', sendEmail);


/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById('style-switcher'),
switcherToggle = document.getElementById('switcher-toggle'),
switcherClose = document.getElementById('switcher-close');

/* Switcher show */
switcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.add('show-switcher');
});

/* Switcher hidden */
switcherClose.addEventListener('click', () => {
    styleSwitcher.classList.remove('show-switcher');
});

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll('.style-switcher-color');

colors.forEach((color) => {
    color.onclick = () => {
        const activeColor = color.style.getPropertyValue('--hue'); 

        colors.forEach((c) => c.classList.remove('active-color'));
        color.classList.add('active-color');

        document.documentElement.style.setProperty('--hue', activeColor);
    };
});

/*=============== LIGHT/DARK MODE ===============*/
let currentTheme = 'light';
document.body.className = currentTheme; 

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
    input.addEventListener('change', () => {
        currentTheme = input.value;
        document.body.className = currentTheme; 
    });
});

/* API */
async function updateGitHubData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Download error');

        const user = await response.json();

        
        document.getElementById('repos-count').innerText = user.public_repos;
        document.getElementById('followers-count').innerText = user.followers;
        document.getElementById('following-count').innerText = user.following;
        
        
        const date = new Date(user.created_at).toLocaleDateString('uk-UA');
        document.getElementById('account-created').innerText = date;

        
        const link = document.getElementById('profile-link');
        link.href = user.html_url;
        link.innerText = user.login; 
        
    } catch (error) {
        console.error("Не вдалося завантажити дані:", error);
        document.getElementById('repos-count').innerText = "Error";
    }
}


updateGitHubData('stmargariitaaa');

