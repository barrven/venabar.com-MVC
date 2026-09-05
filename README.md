# venabar.com MVC

## Project Description
This is a PHP-based project that follows the MVC (Model-View-Controller) design pattern. The project serves as a portfolio or personal website, which includes sections for about, CV, projects, and more. It leverages PHP with XAMPP for local development, and JSON files are used to manage data without the need for a database.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation
Follow these steps to set up the project locally:

1. **Install XAMPP**:
   - Download and install XAMPP from the [official website](https://www.apachefriends.org/index.html).
   - During installation, ensure that you install the Apache and PHP components.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/barrven/venabar.com-MVC.git

3. **Copy the Project to XAMPP's htdocs**:
   - Navigate to the XAMPP installation directory (default is `C:\xampp\htdocs` on Windows).
   - Copy the cloned `venabar.com-MVC` folder into the `htdocs` directory.

4. **Start Apache**:
   - Open the XAMPP Control Panel.
   - Start the Apache server by clicking the "Start" button next to Apache.

5. **Access the Website**:
   - Open a web browser and navigate to `http://localhost/venabar.com-MVC/public_html`.
  
   - ## Usage
Once the Apache server is running, you can access the website locally via your browser. Any changes you make to the project files in the `htdocs` directory will be reflected when you refresh the page.

## Project Structure
The project follows the MVC design pattern, with the webroot (`public_html/`) separated from the application code (`app/`) and root-level config:

```plaintext
venabar.com-MVC/
│
├── public_html/            <- webroot: point Apache's DocumentRoot here
│   ├── index.php           <- front controller
│   ├── js/
│   ├── style/
│   ├── assets/
│   └── examples/           <- standalone demo projects linked from projects.json
├── app/
│   ├── model/
│   │   ├── about.php
│   │   ├── cv.php
│   │   └── projects.php
│   ├── view/
│   │   ├── components/
│   │   │   ├── 404.phtml
│   │   │   ├── layout.phtml
│   │   │   └── navbar.phtml
│   │   ├── about.phtml
│   │   ├── academic.phtml
│   │   ├── cv.phtml
│   │   ├── home.phtml
│   │   └── projects.phtml
│   ├── connections/
│   ├── functions.php
│   └── data/
│       ├── cv.json
│       ├── projects.json
│       └── quiz/
│            ├── courses/
│            ├── quizPrompt.txt
│            └── responseSchema.json
├── config.php
└── .env
```
- **Controller**: `public_html/index.php` handles the main application logic; the rest of the app (`app/`) and `config.php`/`.env` sit outside the webroot.
- **Model**: Contains the logic related to data handling, located in `app/model/`.
- **View**: Contains the templates for displaying the data, located in `app/view/`.

## Features
- MVC architecture
- Dynamic content served via PHP
- JSON-based data handling

## Technologies Used
- **Backend**: PHP
- **Development Environment**: XAMPP
- **Data Storage**: JSON files
- **Frontend**: HTML, CSS, JavaScript

