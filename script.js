// Select currency options and input elements
let leftCurrencyOptions = document.querySelectorAll(".currency-option-left");
let rightCurrencyOptions = document.querySelectorAll(".currency-option-right");
let fromInput = document.querySelector("#from-input");
let toInput = document.querySelector("#to-input");
let baseCurrency = "AZN";
const apiKey = "02b9297af21e3deb288542cd";

// Event listeners for left side currency options
leftCurrencyOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedCurrency = event.target.textContent;

    document
      .querySelectorAll(".leftSide .currency-option-left")
      .forEach((opt) => {
        opt.classList.remove("default");
      });

    event.target.classList.add("default");
  });
});

// Event listeners for right side currency options
rightCurrencyOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedCurrency = event.target.textContent;

    document
      .querySelectorAll(".rightSide .currency-option-right")
      .forEach((opt) => {
        opt.classList.remove("default");
      });

    event.target.classList.add("default");
  });
});

// Event listener for left side currency conversion
leftCurrencyOptions.forEach((item) =>
  item.addEventListener("click", function () {
    let activeCurrencyRight = document.querySelector(
      ".currency-right>.default"
    );

    // Fetch exchange rates using the selected currency
    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: Something went wrong");
        }
        return response.json();
      })
      .then((data) => data["conversion_rates"])
      .then((data) => {
        console.log(data[activeCurrencyRight.innerHTML]);
        // Update the 'toInput' value based on the conversion rates
        toInput.value = (
          data[activeCurrencyRight.innerHTML] * fromInput.value
        ).toFixed(4);
      })
      .catch((error) => {
        console.log("Error: Something went wrong");
      });

    // Update currency information in the UI
    document.querySelector("#from-currency").innerHTML = this.innerHTML;
    document.querySelector("#from-input").innerHTML =
      activeCurrencyRight.innerHTML;
    document.querySelector("#to-currency").innerHTML =
      activeCurrencyRight.innerHTML;
    document.querySelector("#to-input").innerHTML = this.innerHTML;
  })
);

// Event listener for right side currency conversion
rightCurrencyOptions.forEach((item) =>
  item.addEventListener("click", function () {
    let activeCurrencyLeft = document.querySelector(".currency-left>.default");

    // Fetch exchange rates using the selected currency
    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: Something went wrong");
        }
        return response.json();
      })
      .then((data) => data["conversion_rates"])
      .then((data) => {
        console.log(data[activeCurrencyLeft.innerHTML]);
        // Update the 'fromInput' value based on the conversion rates
        fromInput.value = (
          data[activeCurrencyLeft.innerHTML] * toInput.value
        ).toFixed(4);
      })
      .catch((error) => {
        console.log("Error: Something went wrong");
      });

    // Update currency information in the UI
    document.querySelector("#to-currency").innerHTML = this.innerHTML;
    document.querySelector("#to-input").innerHTML =
      activeCurrencyLeft.innerHTML;
    document.querySelector("#from-currency").innerHTML =
      activeCurrencyLeft.innerHTML;
    document.querySelector("#from-input").innerHTML = this.innerHTML;
  })
);

// Event listener for input changes in the 'fromInput' element
fromInput.addEventListener("input", function () {
  // Remove non-numeric characters and ensure only one decimal point
  this.value = this.value.replace(/[^0-9.]/g, "");
  const dots = this.value.match(/\./g) || [];
  if (dots.length > 1) {
    this.value = this.value.slice(0, -1);
  }

  let activeCurrency = document.querySelector(".currency-left>.default");
  let activeCurrencyRight = document.querySelector(".currency-right>.default");

  // Fetch exchange rates using the selected currency
  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: Something went wrong");
      }
      return response.json();
    })
    .then((data) => data["conversion_rates"])
    .then((data) => {
      console.log(data[activeCurrencyRight.innerHTML]);
      // Update the 'toInput' value based on the conversion rates
      toInput.value = (
        data[activeCurrencyRight.innerHTML] * fromInput.value
      ).toFixed(4);
    })
    .catch((error) => {
      console.log("Error: Something went wrong");
    });
});

// Event listener for input changes in the 'toInput' element
toInput.addEventListener("input", function () {
  // Remove non-numeric characters and ensure only one decimal point
  this.value = this.value.replace(/[^0-9.]/g, "");
  const dots = this.value.match(/\./g) || [];
  if (dots.length > 1) {
    this.value = this.value.slice(0, -1);
  }

  let activeCurrency = document.querySelector(".currency-right>.default");
  let activeCurrencyLeft = document.querySelector(".currency-left>.default");

  // Fetch exchange rates using the selected currency
  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: Something went wrong");
      }
      return response.json();
    })
    .then((data) => data["conversion_rates"])
    .then((data) => {
      console.log(data[activeCurrencyLeft.innerHTML]);
      // Update the 'fromInput' value based on the conversion rates
      fromInput.value = (
        data[activeCurrencyLeft.innerHTML] * toInput.value
      ).toFixed(4);
    })
    .catch((error) => {
      console.log("Error: Something went wrong");
    });
});
