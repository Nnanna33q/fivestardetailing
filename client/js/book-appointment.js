const form = document.querySelector('#appointmentForm');
const msgSubmit = document.querySelector('#msgSubmit');
const spinner = document.querySelector('.loader');
const bookAppointmentBtn = document.querySelector('.btn-submit');
let timeoutId;

form.addEventListener('submit', async (e) => {
    // Clears existing msgs
    msgSubmit.innerText = '';
    msgSubmit.classList.remove('text-danger');
    msgSubmit.classList.remove('text-success');

    // Clear scheduled timeout (if any)
    timeoutId && clearTimeout(timeoutId);

    e.preventDefault();
    spinner.classList.remove('loader-hidden');
    bookAppointmentBtn.disabled = true;
    try {
        // fetch!!!!!
        const response = await fetch(`${window.env.BACKEND_DOMAIN}/book`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: document.querySelector('#name').value,
                phoneNumber: document.querySelector('#phone').value,
                vehicle: document.querySelector('#model'),
                email: document.querySelector('#email').value,
                date: document.querySelector('#date').value,
                additionalNotes: document.querySelector('#message').value
            })
        })
        const data = await response.json();
        if (!data.success) {
            const customError = new Error(data.errorMessage);
            data.errorField ? customError.errorField = data.errorField : customError.errorField = '';
            throw customError;
        }
        msgSubmit.innerText = 'Message sent successfully!';
        msgSubmit.classList.remove('text-danger');
        msgSubmit.classList.add('text-success');

        // Clear all input fields error messages on success
        const errorMsgContainers = document.querySelectorAll('.help-block');
        errorMsgContainers.forEach(e => e.firstElementChild && e.firstElementChild.remove());
        document.querySelector('.reset-form').click();

        // schedules a set timeout to clear success message after 5 seconds
        timeoutId = setTimeout(() => {
            msgSubmit.innerText = '';
            msgSubmit.classList.remove('text-danger');
            msgSubmit.classList.remove('text-success');
        }, 5000);

    } catch (error) {
        // Handle Error
        console.error(error);
        msgSubmit.classList.remove('text-success');
        msgSubmit.classList.add('text-danger');
        if (error instanceof Error) {
            const errorField = error.errorField ? document.querySelector(`#${error.errorField}`) : null;
            if (errorField) {
                const ul = document.createElement('ul');
                ul.classList.add('list-unstyled');
                const li = document.createElement('li');
                li.innerText = error.message;
                ul.appendChild(li);
                errorField.nextElementSibling.children.length > 0 && errorField.nextElementSibling.children[0].remove();
                errorField.nextElementSibling.appendChild(ul);
            } else {
                msgSubmit.innerText = error.message;
                msgSubmit.classList.remove('text-success');
                msgSubmit.classList.add('text-danger');
            }
        } else {
            msgSubmit.innerText = 'Failed to send message :(';
            msgSubmit.classList.remove('text-success');
            msgSubmit.classList.add('text-danger');
        }

        // schedules a set timeout to clear success message after 5 seconds
        timeoutId = setTimeout(() => {
            msgSubmit.innerText = '';
            msgSubmit.classList.remove('text-danger');
            msgSubmit.classList.remove('text-success');
        }, 5000);
    }
    spinner.classList.add('loader-hidden');
    bookAppointmentBtn.disabled = false;
})