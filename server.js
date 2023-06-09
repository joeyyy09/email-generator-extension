document.addEventListener("DOMContentLoaded", function () {
  const emailForm = document.getElementById("emailForm");
  const resultDiv = document.getElementById("result");

  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const linkInput = document.getElementById("linkInput");
    const nameInput = document.getElementById("nameInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const companyInput = document.getElementById("companyInput");

    const link = linkInput.value.trim();
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const company = companyInput.value.trim();

    if (link === "") {
      resultDiv.textContent = "Please enter the import link.";
      return;
    }

    if (name === "") {
      resultDiv.textContent = "Please enter the name.";
      return;
    }

    if (description === "") {
      resultDiv.textContent = "Please enter the description.";
      return;
    }

    if (company === "") {
      resultDiv.textContent = "Please enter the company.";
      return;
    }

    const prompt = `
      Hi,

      I came across your profile on LinkedIn and was impressed by your experience at ${company}. I would love to connect with you and learn more about your work in ${description}. Let's schedule a call to discuss further.

      Looking forward to connecting with you.

      Best regards,
      ${name}
    `;

    generateEmailTemplate(prompt);
  });

  function generateEmailTemplate(prompt) {
    const data = { prompt };

    fetch("http://localhost:3000/generate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.generatedText) {
          const emailTemplate = `
            <h3>Email Template:</h3>
            <p>${result.generatedText}</p>
          `;
          resultDiv.innerHTML = emailTemplate;
        } else {
          console.error("Unexpected response:", result);
          resultDiv.textContent =
            "An error occurred while generating the email template.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        resultDiv.textContent =
          "An error occurred while generating the email template.";
      });
  }
});
