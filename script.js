document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multi-step-form');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const summary = document.getElementById('summary');
    let currentStep = 0;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep()) {
                steps[currentStep].classList.remove('active');
                currentStep++;
                if (currentStep < steps.length) {
                    steps[currentStep].classList.add('active');
                }
                if (currentStep === steps.length - 1) {
                    displaySummary();
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form successfully submitted!');
        form.reset();
        steps[currentStep].classList.remove('active');
        currentStep = 0;
        steps[currentStep].classList.add('active');
    });

    function validateStep() {
        let stepIsValid = true;
        const currentInputs = steps[currentStep].querySelectorAll('input, textarea');
        currentInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                stepIsValid = false;
            }
        });
        return stepIsValid;
    }

    function displaySummary() {
        const name = document.getElementById('name').value || 'N/A';
        const email = document.getElementById('email').value || 'N/A';
        const prefs = Array.from(document.querySelectorAll('input[name="pref"]:checked')).map(el => el.value).join(', ') || 'None';
        const comments = document.getElementById('comments').value || 'None';

        summary.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Preferences:</strong> ${prefs}</p>
            <p><strong>Comments:</strong> ${comments}</p>
        `;
    }

    // Initialize steps
    steps.forEach((step, index) => {
        if (index !== currentStep) {
            step.classList.remove('active');
        } else {
            step.classList.add('active');
        }
    });
});
