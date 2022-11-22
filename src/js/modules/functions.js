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
                }
                // else if (input.classList.contains('phone')) {
                //     if (phoneTest(input)) {
                //         formAddError(input);
                //         error++;
                //     }
                // } 
                else {
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

        // function phoneTest(input) {
        //     return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
        // };


    });
};