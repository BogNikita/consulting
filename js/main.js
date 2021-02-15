function init() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header-logo');
    const indicator = document.querySelector('.indicator');
    const headerBtn = document.querySelector('.header-menu');
    const sideMenu = document.querySelector('.side-menu');
    const burger = document.querySelector('.btn-burger');
    const indicatorWrap = document.querySelector('.indicator-wrap');
    const arrowUp = document.querySelector('.up');
    const detail = document.querySelectorAll('.detail');
    const heroItem = document.querySelectorAll('.hero-content-item');
    const formInput = document.querySelector('.form-input');
    const form = document.querySelector('.form');
    const formTextArea = document.querySelector('.form-textarea');
    const formBtn = document.querySelector('.form-btn');
    const errorEmail = document.querySelector('.email-error');
    const errorText = document.querySelector('.text-error');

    const scrollByDetail = (clickItem, scrollItem) => {
        const topOffset = clickItem.offsetTop;
        const elementPosition = scrollItem.offsetTop;
        const offsetPosition = elementPosition - topOffset -70;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });

    };

    const positionWindow = () => {
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
    }

    const logoPosition = () => {
        indicatorWrap.style.left = logo.getBoundingClientRect().x+41+'px'
    };

    logoPosition();

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
            scrollByDetail(item, detail[index]);
        });
    });

    positionWindow()
    window.addEventListener('scroll', positionWindow);

    headerBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        burger.classList.toggle('cross');
    });

    const closeMenu = () => {
        sideMenu.classList.remove('active');
        burger.classList.remove('cross');
    };

    sideMenu.addEventListener('click', closeMenu);



    window.addEventListener('resize', logoPosition);

    const validForm = (valid, item, errorItem, message) => {
        if (valid) {
            item.classList.add('valid');
            item.classList.remove('invalid');
            errorItem.textContent = '';
        } else {
            item.classList.add('invalid');
            item.classList.remove('valid');
            errorItem.textContent = message;
        }
    }
    
    form.addEventListener('input', (e) => {
        e.preventDefault();
        const validEmail = validateEmail(formInput.value.trim());
        const validText = formTextArea.value.length > 0;
        formBtn.classList.add('disabled');
        validForm(validEmail, formInput, errorEmail, 'Введите корректный Email');
        validForm(validText, formTextArea, errorText, 'Поле не должно быть пустым');
        if (validEmail && validText) {
            formBtn.disabled = false;
            formBtn.classList.remove('disabled');
        } 
    });
}

window.onload = () => (init());