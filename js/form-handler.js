// js/form-handler.js
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-handler="corlanth"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const successMsg = form.querySelector('.form-success');
      const errorMsg = form.querySelector('.form-error');

      // Basic HTML5 validation check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // UI: Show loading state
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      submitBtn.disabled = true;
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      // Gather form data into JSON
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (result.success) {
          // UI: Show success & reset form
          form.reset();
          if (successMsg) successMsg.style.display = 'block';
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        // UI: Show error
        if (errorMsg) errorMsg.style.display = 'block';
      } finally {
        // UI: Reset button state after 2 seconds
        setTimeout(() => {
          if (btnText) btnText.style.display = 'inline';
          if (btnLoading) btnLoading.style.display = 'none';
          submitBtn.disabled = false;
          
          // Hide success/error messages after 5 seconds
          setTimeout(() => {
            if (successMsg) successMsg.style.display = 'none';
            if (errorMsg) errorMsg.style.display = 'none';
          }, 5000);
        }, 2000);
      }
    });
  });
});