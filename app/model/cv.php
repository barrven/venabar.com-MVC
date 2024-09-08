<?php
$json_data = file_get_contents('assets/cv.json');
$data = json_decode($json_data, true); // Decode the JSON data into a PHP array

// echo "<br><br><br><br>";
// echo PHP_BINARY;
// var_dump($data['experienceSchema']);

$skills = $data['skills'];
/***** format *****:
[
    {
        "title": "description of skill",
        "rating": "int from 1-5",
        "type": "hard/soft",
        "category":"Administrative/Technical/Communication/Analytical/Leadership/
            Project Management/Creative/Operational"
    },
    ...
]
*/
$experience = $data['experience'];
/***** format *****:
[
    {
        "company": "name",
        "title": "job title",
        "location": "format: 'Toronto, ON'",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM",
        "duties": ["description of each duty in a separate string"],
        "description": "optional"
    },
    ...
]
*/

// $output = [];
// $return_var = 0;
// exec('echo "Hello, world"', $output, $return_var);
// echo "<br><br><br><br>";
// print_r($output); // Output from the command
// echo "<br>$return_var"; // Return status of the command


