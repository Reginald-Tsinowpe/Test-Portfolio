document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission and refresh

  // Hide error and loading messages
  document.querySelector('.error-message').style.display = 'none';
  document.querySelector('.loading').style.display = 'block';

  // Collect the form data
  const formData = new FormData(this);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    _subject: formData.get('_subject'),
    message: formData.get('message'),
    _template: formData.get('_template'), // Ensure template is included
    _captcha: formData.get('_captcha')   // Ensure captcha is included (set to false if you don't want it)
  };

  // Use fetch to send the form data to the FormSubmit API
  fetch('https://formsubmit.co/ajax/tsinowpe.business@gmail.com', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data) // Send form data as JSON
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    if (data.success) {
      // Show success message
      document.getElementById('email-form').reset();
      document.querySelector('.sent-message').style.display = 'block';
    } else {
      throw new Error('Submission failed');
    }
  })
  .catch(error => {
    // Show error message
    document.querySelector('.error-message').innerText = 'There was an error submitting the form. Please try again.';
    document.querySelector('.error-message').style.display = 'block';
  })
  .finally(() => {
    // Hide the loading message
    document.querySelector('.loading').style.display = 'none';
  });
});