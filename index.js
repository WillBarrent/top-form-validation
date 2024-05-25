const form = document.querySelector(".form");

const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-cfm");

const zip = document.getElementById("zip");
const countries = document.getElementById("country");

const validation = (function () {
  const emailError = document.querySelector(".email-label .error");
  const passwordCfmError = document.querySelector(".password-cfm-label .error");
  const zipError = document.querySelector('.zip-label .error');

  const priorityText = document.querySelector(".priority-text");

  const showError = (
    element,
    elementError,
    firstMessage,
    secondMessage,
    what
  ) => {
    if (element.validity.valueMissing) {
      elementError.textContent = firstMessage;
    } else if (element.validity.typeMismatch) {
      elementError.textContent = secondMessage;
    } else if (element.validity.tooShort) {
      elementError.textContent = `${what} should be at least ${element.minLength} characters; you entered ${element.value.length}`;
    }

    elementError.className = "error active";
  };

  const emailValidation = () => {
    email.addEventListener("input", function () {
      if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
      } else {
        showError(
          email,
          emailError,
          "You need to enter an email address",
          "Entered values needs to be an email address",
          "Email"
        );
      }
    });
  };

  const passwordValidation = () => {
    const highPriority = document.querySelector(".priority .high");
    const lowPriority = document.querySelector(".priority .low");

    const priorityText = document.querySelector(".priority-text");

    const passwordText = [
      "Your password is too week. Your password should have digits and characters between A-z. Also your minimal length of password should be 10 character.",
      "Your password is strongful.",
    ];

    const constraint = /[0-9][A-z]/;

    const constraintChecker = new RegExp(constraint, "");

    password.addEventListener("input", function () {
      if (!constraintChecker.test(password.value)) {
        priorityText.textContent = passwordText[0];

        highPriority.classList.remove("high-priority");
        lowPriority.classList.remove("high-priority");

        password.setCustomValidity("Wrong Password!");
      } else {
        priorityText.textContent = passwordText[1];

        highPriority.classList.add("high-priority");
        lowPriority.classList.add("high-priority");

        password.setCustomValidity("");
      }
    });
  };

  const passwordConfirmationValidation = () => {
    passwordConfirmation.addEventListener("input", function () {
      if (passwordConfirmation.value === password.value) {
        passwordCfmError.textContent = "";
        passwordCfmError.className = "error";
      } else {
        passwordCfmError.className = "error active";
        passwordCfmError.textContent = "Password is not correct. Try again.";
      }
    });
  };

  const zipValidation = () => {
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };

    zip.addEventListener('input', function(e) {
        const country = document.getElementById("country").value;
        const constraint = new RegExp(constraints[country][0], "");

        if (constraint.test(zip.value)) {
            zipError.textContent = '';
            zipError.className = "error";

            zip.setCustomValidity("");
        } else {
            zipError.textContent = constraints[country][1];
            zipError.className = "error active";

            zip.setCustomValidity("Wrong");
        }
    });
  };

  const formValidation = () => {
    form.addEventListener("submit", function (e) {
      if (!email.validity.valid) {
        showError(
          email,
          emailError,
          "You need to enter an email address",
          "Entered values needs to be an email address",
          "Email"
        );
        e.preventDefault();
      }

      if (!zip.validity.valid) {
        zipError.textContent = 'You need to enter Zip.';
        zipError.className = 'error active';
      }
    });
  };

  return {
    emailValidation,
    passwordValidation,
    passwordConfirmationValidation,
    zipValidation,
    formValidation,
  };
})();

validation.emailValidation();
validation.passwordValidation();
validation.passwordConfirmationValidation();
validation.zipValidation();

validation.formValidation();
