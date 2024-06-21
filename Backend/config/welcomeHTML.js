exports.welcomeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Blog</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            background-color: #0073e6;
            color: #fff;
            padding: 20px 0;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #0073e6;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #f4f4f4;
            color: #777;
            border-radius: 0 0 10px 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Blog!</h1>
        </div>
        <div class="content">
            <p>Dear Reader,</p>
            <p>We are thrilled to have you here! Our blog is dedicated to bringing you the latest and greatest content on a variety of topics. Whether you're here to read about technology, lifestyle, health, or any other subject, we hope you'll find something that piques your interest.</p>
            <p>Feel free to browse through our articles, leave comments, and share your thoughts. Your feedback is invaluable to us as we strive to create a community where everyone can learn and grow together.</p>
            <p>Happy reading!</p>
            <p>Best regards,</p>
            <p>The Blog Team</p>
            <a href="https://yourblogwebsite.com" class="button">Visit Our Blog</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Blog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
