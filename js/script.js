document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input').forEach(function (e) {
        if (e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
        e.addEventListener('input', function () {
            window.sessionStorage.setItem(e.name, e.value);
        })
    })

});


function validation(form) {
    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')

        errorLabel.classList.add('error-label')
        errorLabel.textContent = text

        parent.classList.add('error')
        parent.append(errorLabel)
    }

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }

    let result = true;




    let input = document.querySelector('.form__input-state')
    let numberValue = input.value;
    let a = /^[а-я]\d{3}[а-я]{2}\d{2,3}/.test(numberValue)
    if (a == false) {
        let error = document.querySelector('.form__state-error')
        error.classList.remove('none')
        input.classList.add('error')
        result = false
    } else {
        let error = document.querySelector('.form__state-error')
        error.classList.add('none')
        input.classList.remove('error')
        result = true
    }

    const allInputs = form.querySelectorAll('input');
    for (const input of allInputs) {

        removeError(input);

        if (input.value == "") {
            result = false
            createError(input, 'Поле не заполнено!')
        }

        document.querySelector('.cancel__btn').addEventListener('click', function () {
            let error = document.querySelector('.form__state-error')
            error.classList.add('none')
            input.classList.remove('error')
            document.querySelectorAll('input').forEach(function (input) {
                input.value = "";


            })
            removeError(input)
        });

    }
    return result

}


document.getElementById('add-form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (validation(this) == true) {
        alert('Форма проверена успешно')
    }

})

let numberAndText = document.querySelector('input[data-number-text]')
const reg = new RegExp('^[0-9]+$');
numberAndText.oninput = function () {
    this.value = this.value.replace(reg, '')
}

document.getElementById('input-text').onkeypress = function (e) {
    if (!(/[а-я ]/i.test(String.fromCharCode(e.keyCode)))) {
        e.preventDefault();
        return false;
    }
}



