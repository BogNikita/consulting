function init() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header-logo');
    const indicator = document.querySelector('.indicator');
    const headerBtn = document.querySelector('.header-menu');
    const sideMenu = document.querySelector('.side-menu');
    const burger = document.querySelector('.btn-burger');
    const headerDisc = document.querySelector('.header-description');
    const indicatorWrap = document.querySelector('.indicator-wrap');
    const arrowUp = document.querySelector('.up');
    const detail = document.querySelectorAll('.detail');
    const heroItem = document.querySelectorAll('.hero-content-item');
    const formInput = document.querySelector('.form-input');
    const form = document.querySelector('.form');
    const formTextArea = document.querySelector('.form-textarea');
    const formBtn = document.querySelector('.form-btn')

    const scrollBy = (clickItem, scrollItem) => {
        const topOffset = clickItem.offsetTop;
        const elementPosition = scrollItem.offsetTop;
        const offsetPosition = elementPosition - topOffset -70;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };


    heroItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            detail.forEach(item => {
            item.classList.remove('detail-visible');
            });
            detail[index].classList.add('detail-visible');
            scrollBy(item, detail[index]);
        });
    });

    window.addEventListener('scroll', () => {

        if(pageYOffset > 0) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;

            header.classList.add('header-scroll');
            logo.classList.add('logo-scroll');
            arrowUp.classList.add('visible');
            indicator.style.height = scrolled + '%';
        } else {
            header.classList.remove('header-scroll');
            logo.classList.remove('logo-scroll');
            arrowUp.classList.remove('visible');
            indicator.style.height = 0 + '%';
            detail.forEach(item => {
                item.classList.remove('detail-visible');
                });
        }
    });

    headerBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        burger.classList.toggle('cross');
    });

    const closeMenu = () => {
        sideMenu.classList.remove('active');
        burger.classList.remove('cross');
    };

    sideMenu.addEventListener('click', closeMenu);

    const logoPosition = () => {
        indicatorWrap.style.left = headerDisc.getBoundingClientRect().x - 55 + 'px'
    }

    logoPosition();

    window.addEventListener('resize', logoPosition);

    const validForm = (valid, item) => {
        if (valid) {
            item.classList.add('valid');
            item.classList.remove('invalid');
        } else {
            item.classList.add('invalid');
            item.classList.remove('valid');
        }
    }
    
    form.addEventListener('input', (e) => {
        const validEmail = validateEmail(formInput.value.trim());
        const validText = formTextArea.value.length > 0;
        formBtn.classList.add('disabled');
        validForm(validEmail, formInput);
        validForm(validText, formTextArea);
        if (validEmail && validText) {
            formBtn.disabled = false;
            formBtn.classList.remove('disabled');
        } 
    })
}

window.onload = () => (init());