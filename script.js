document.addEventListener("DOMContentLoaded", function () {

  // ===== TYPING EFFECT =====
  const roles = [
    "Full Stack ",
    "Backend",
    "Frontend "
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function typeEffect() {
    const typing = document.getElementById("typing");
    if (!typing) return;

    const fullText = roles[index];

    if (isDeleting) {
      currentText = fullText.substring(0, charIndex--);
    } else {
      currentText = fullText.substring(0, charIndex++);
    }

    typing.textContent = currentText;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === fullText.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // ===== ALL DETAILS BUTTONS (ONE LOGIC FOR ALL) =====
  const buttons = document.querySelectorAll(".details-btn, .details-btn_media");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {

      // find correct parent automatically
      const parent = this.closest(".project-content, .project-content_media");

      // find correct details block
      const details = parent.querySelector(".project-details, .project-details_media");

      if (!details) return;

      details.classList.toggle("show");

      this.textContent = details.classList.contains("show")
        ? "Hide"
        : "Details";
    });
  });

});

// Form Part
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");
const button = form.querySelector("button");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  successMsg.style.display = "none";
  errorMsg.style.display = "none";

  button.textContent = "Sending...";
  button.disabled = true;

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      errorMsg.style.display = "block";
    }

  } catch (error) {
    errorMsg.style.display = "block";
  }

  button.textContent = "Send";
  button.disabled = false;
});

// project toggle
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const details = btn.parentElement.previousElementSibling.previousElementSibling;
    details.style.display =
      details.style.display === "block" ? "none" : "block";
  });
});

document.querySelectorAll(".details-btn_media").forEach(btn => {
  btn.addEventListener("click", () => {
    const details = btn.parentElement.previousElementSibling.previousElementSibling;
    details.style.display =
      details.style.display === "block" ? "none" : "block";
  });
});