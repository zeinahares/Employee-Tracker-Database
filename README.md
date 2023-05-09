# Employee Tracker Database

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
I wanted to create a program that allows you to connect to a company database that relates the department, rolen and information of the empolyee in connected and integrated tables.

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)
 

## Installation
You will need to have node js installed on your computer. You will also need a MySQL account and MySQL installed on your computer. After you have both programs installed, you will need to install this program (after cloning it locally) and running 'npm install' in your terminal, inside the relevant file. After that, you will need to initilize the database and the seeds. You can do that by entering the db folder and running 'mysql -u root -p', logging into MySQL with your password, and then running in MySQL 'source ./schema.sql' then 'source ./seeds.sql'. After that, you need to enter the server.js file,and change line 15 to include the password of your MySQL account inside the string quotes. After you install the program, initialize the database, and enter your MySQL password into the code, you need to run 'node server.js' in your terminal to start using the program.

## Usage
Use your arrow keys to scroll and the enter key choose between the main menu options. There are 3 categories of choices of interacting with the database: Viewing, Adding, and updating. When you choose a viewing option, you will get a table of the relevant information, and then the main menu options will be presented to you again. If you select to Add or update information, you will need to follow the follwoing prompts to fill the relevant information (like inseritng department name when adding a department, or choosing an empolyee name from a list of empolyee names to update their manager details). 

## Walkthrough Video
https://drive.google.com/file/d/1HuX0DKVLKbixqWVwC7C93AXBK9eY-CoC/view

## License
MIT License https://opensource.org/licenses/MIT

    Copyright (c) 2023 zeinahares
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contribution
N/A 

## Tests
N/A 

## Questions - 
  
Feel free to reach me for questions at anytime!

  GitHub URL: https://github.com/zeinahares 


  Email Address: zeinahares@gmail.com
