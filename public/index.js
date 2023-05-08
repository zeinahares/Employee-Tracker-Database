const inquirer = require("inquirer");
const questions = [
    {
      type: 'list',
      message: "What would you like to do?",
      name: 'Main Menu',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Quit'],
    },
    // {
    //   type: 'input',
    //   message: "What color do you want your shape? Enter a color keyword (OR a hexadecimal number starting with #)",
    //   name: 'shape_color',
    // },
  ];
  
  inquirer.prompt(questions)
    .then((data) => function (data){
        if (data.choices === "View All Departments"){
            // fetch the appropriate data and rinse repeat
        }

        if (data.choices === 'View All Roles') {

        }
        if (data.choices === 'View All Employees') {

        }
    })
    .catch((err) => console.log(err))