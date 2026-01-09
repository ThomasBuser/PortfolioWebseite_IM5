  async function handleFormSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    document.getElementById('successMessage').style.display = 'block';
                    document.getElementById('contactForm').style.display = 'none';
                    document.getElementById('newMessageButton').style.display = 'inline-block';
                } else {
                    alert('There was a problem submitting the form.');
                }
            } catch (error) {
                alert('There was a problem submitting the form.');
            }
        }

        function showFormAgain() {
            document.getElementById('contactForm').style.display = 'block';
            document.getElementById('newMessageButton').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
        }