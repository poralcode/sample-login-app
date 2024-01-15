# Sample Login Form Project

The main purpose of this project is to demonstrate the implementation of a simple login form. When a user submits their login credentials, the form sends a POST request to a server. The server processes the request and responds with a JSON object containing information about the login status and user details. The expected JSON response format is as follows:

```json
{
  "message": "login-success",
  "userID": 1,
  "username": "user",
  "fullname": "John Wick"
}
```

## Technologies Used

This project utilizes the following technologies:

- **Node.js**: A JavaScript runtime that allows server-side scripting and execution of JavaScript code.
- **Electron.js**: A framework for building cross-platform desktop applications using web technologies.
- **Bootstrap**: A popular front-end framework for creating responsive and visually appealing web interfaces.
- **jQuery**: A JavaScript library that simplifies DOM manipulation and event handling.
- **FontAwesome**: A library of scalable vector icons that can be easily customized and integrated into web projects.
- **JavaScript**: The primary programming language used for both client-side and server-side scripting.
- **PHP**: A server-side scripting language used to handle HTTP requests and generate JSON responses.

## Server-side PHP Implementation

The server-side PHP script is implemented using a simple conditional statement to handle POST requests. Here's an overview of the server-side code:

```php
<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        switch ($_POST["message"]) {
            case "request-login":
                $username = $_POST['username'];
                $password = $_POST['password'];

                $response = [
                    "message" => "invalid-credential",
                    "userID" => 0,
                    "username" => $username,
                    "fullname" => null
                ];

                if ($username === "user" && $password === "user") {
                    $response['userID'] = 1;
                    $response['message'] = "login-success";
                    $response['fullname'] = "John Wick";
                }

                header('Content-Type: application/json');
                die(json_encode($response));
                break;
            default:
                die("Invalid request.");
                break;
        }
    } else {
        die("Invalid request method.");
    }
?>
```

The server script listens for POST requests, processes the login request, and returns a JSON response based on the provided credentials.

## Getting Started

To get started with this project, follow these steps:

1. Clone or download this repository to your local machine.
   ```bash
   git clone https://github.com/poralcode/sample-login-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sample-login-app
   ```
3. Ensure you have Node.js and PHP. (You can install the project dependencies):
   ```bash
   npm install
   ```
4. Open the project in your preferred code editor.
5. Run the application to see the login form in action.

```bash
   npm start
```

## Usage

- Open the Electron application.
- Enter the username and password in the login form and submit it.
- The application will send a POST request to the server, and you will receive a JSON response indicating the login status. Note that this was tested on my local machine running Apache server. You can implement the server side on your own by copying the PHP script above and changing the value of the `serverHost` on the file `renderer.js`.
- You may open a devtools by pressing `F12` on your keyboard to see the JSON output in the console.
- The expected username and password is `user`.

## Sample Output

[Output 1 - Form](https://github.com/poralcode/sample-login-app/blob/main/sample_output/Output%201%20-%20Form.png)

[Output 2 - Required Field](https://github.com/poralcode/sample-login-app/blob/main/sample_output/Output%202%20-%20Required%20Field.png)

[Output 3 - Invalid Credentials](https://github.com/poralcode/sample-login-app/blob/main/sample_output/Output%203%20-%20Invalid%20Credentials.png)

[Output 4 - Correct Credentials](https://github.com/poralcode/sample-login-app/blob/main/sample_output/Output%204%20-%20Correct%20Credentials.png)

[Output 5 - Expected Response](https://github.com/poralcode/sample-login-app/blob/main/sample_output/Output%205%20-%20Expected%20Response.png)

## Author

- Poralcode
- GitHub: [https://github.com/poralcode](https://github.com/poralcode)
