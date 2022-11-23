export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    };

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
};

export function sendMail() {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.footer__form');
        const title = document.querySelector('.footer__title');
        form.addEventListener('submit', formSend);

        async function formSend(event) {
            event.preventDefault();

            let error = formValidate(form);

            let formData = new FormData(form);

            if (error === 0) {
                form.classList.add('sending');
                let response = await fetch('../sendmail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                    form.classList.remove('sending');
                    title.textContent = 'Супер!';
                    form.innerHTML = '<p class="footer__success-text">Нам ушло уведомление! Как только мы его получим, сразу выйдем на связь для уточнения деталей.</p>';
                } else {
                    alert('Ошибка');
                    form.classList.remove('sending');
                };
            } else {
                alert('Заполните обязательные поля');
            };
        };

        function formValidate(form) {
            let error = 0;
            let formRequired = document.querySelectorAll('.form-required');

            for (let i = 0; i < formRequired.length; i++) {
                const input = formRequired[i];
                formRemoveError(input);

                if (input.classList.contains('email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                };

            };

            return error;
        };

        function formAddError(input) {
            input.classList.add('error');
        };

        function formRemoveError(input) {
            input.classList.remove('error');
        };

        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        };

    });
};

export function phoneMask() {
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(document.querySelectorAll('.phone'), function (input) {
            let keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___ ____",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)

        });

    });
};

export function scroll() {
    const link1 = document.querySelector('.scroll-height');
    const link2 = document.querySelector('.scroll-about');
    const link3 = document.querySelector('.scroll-about__box-3');
    const link4 = document.querySelector('.scroll-about__box-6');
    const link5 = document.querySelector('.scroll-mass-media');

    const section1 = document.querySelector('.height');
    const section2 = document.querySelector('.about');
    const section3 = document.querySelector('.about .about__box-3');
    const section4 = document.querySelector('.about .about__box-6');
    const section5 = document.querySelector('.mass-media');

    link1.addEventListener('click', function (event) {
        event.preventDefault();
        section1.scrollIntoView({ behavior: "smooth" });
    });

    link2.addEventListener('click', function (event) {
        event.preventDefault();
        section2.scrollIntoView({ behavior: "smooth" });
    });

    link3.addEventListener('click', function (event) {
        event.preventDefault();
        section3.scrollIntoView({ behavior: "smooth" });
    });

    link4.addEventListener('click', function (event) {
        event.preventDefault();
        section4.scrollIntoView({ behavior: "smooth" });
    });

    link5.addEventListener('click', function (event) {
        event.preventDefault();
        section5.scrollIntoView({ behavior: "smooth" });
    });
};
