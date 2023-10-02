/* Define the server host URL */
const serverHost = "http://127.0.0.1/test/";

// Execute the following code when the DOM is ready
$(function () {
  /**Event handler for the form submission.
   * - Disabled the continue button, set input fields as readonly, and show the spinner.
   * - Make an AJAX request to the server.
   * - Expect a JSON response and handled it based on the `message` field.
   * - Enabled the continue button, make input fields editable, and hide the spinner.
   * - Show appropriate error if necessary.
   * **/
  $("#login-form").on("submit", function (e) {
    e.preventDefault();
    const form = $(this);
    const username = form.find('input[name="username"]').val();
    const password = form.find('input[name="password"]').val();

    // Disable the "CONTINUE" button, set input fields as readonly, and show the spinner
    $("#btn-login-continue").prop("disabled", true);
    form.find("input").prop("readonly", true);
    $("#login-form-spinner").removeClass("visually-hidden");
    $("#error-message, #success-message").addClass("visually-hidden"); // Hide error and success messages

    // Handle the AJAX request.
    $.ajax({
      url: serverHost,
      type: "POST",
      data: { message: "request-login", username: username, password: password }, // Send a request to the server
      timeout: 60000, // Set a timeout for the request
      dataType: "json", // Expect a JSON response
      success: function (response) {
        console.log(response);
        // Handle the response based on the "message" field
        switch (response.message) {
          case "login-success":
            $("#success-message").removeClass("visually-hidden"); // Show success message
            break;
          case "invalid-credential":
            $("#error-message").text("Invalid username or password.").removeClass("visually-hidden"); // Show error message
            break;
          default:
            $("#error-message").text("Something's not right.").removeClass("visually-hidden"); // Show generic error message
            break;
        }
      },
      error: function (xhr, status, error) {
        // Handle AJAX errors
        $("#error-message")
          .text(status === "timeout" ? "Request timed out. Please try again." : "Something's not right.")
          .removeClass("visually-hidden"); // Show error message
      },
      complete: function () {
        // Re-enable the "CONTINUE" button, make input fields editable, and hide the spinner
        $("#btn-login-continue").prop("disabled", false);
        form.find("input").prop("readonly", false);
        $("#login-form-spinner").addClass("visually-hidden");
      },
    });
  });

  /* Event handler for showing/hiding the password. */
  $(".btn-show-password").on("click", function (e) {
    const passwordInput = $(this).prev("input");
    const isPasswordVisible = passwordInput.attr("type") === "password";

    // Toggle the password visibility and update the button icon.
    passwordInput.attr("type", isPasswordVisible ? "text" : "password");
    $(this).html(isPasswordVisible ? `<i class="fa-solid fa-eye"></i>` : `<i class="fa-solid fa-eye-slash"></i>`);
  });
});
