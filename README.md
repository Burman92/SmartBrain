# React + Vite

## Description
A Full-Stack React application that scans images, detects faces and outlines the faces detected. The application stores the user's sign-in information as well as how many times the user has uploaded an image. The sign-in and registration feature is fully functional on deployment (currently locally) and will compare the information that the user has inputed and compare it to what has been stored in its database.

## Table of Contents
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshot](#screenshot)
* [Contributors](#contributors)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)

## Technologies
- [`react`](https://react.dev) - Library for web and native user interfaces.
- [`vite`](https://vitejs.dev/) - Module bundler, transpiler and dev server.
- [`express`](https://expressjs.com)  - Framework with a robust set of features for web and mobile applications.
- [`postgres`](https://postgresql.org) - Powerful, open source object-relational database system.
- [`vitest`](https://vitest.dev/) - Unit test runner.
- [`react-testing-library`](https://testing-library.com/docs/react-testing-library/api/) - React component test helper.
- [`bcrypt`](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [`tachyons`](https://www.npmjs.com/package/tachyons) - A library to with CSS.
- [`clarifai`](https://clarifai.com/clarifai/main/models/face-detection) - Library that provides differnt modules using api requests to get a desired output.
- [`particles-bg`](https://www.npmjs.com/package/particles-bg) - A library create the animated background.
- [`knex`](https://knexjs.org/guide/) - Query builder for Postgres.

## Installation
1. In order to keep the application main feature, face detection accessable, you will be directly routed to the logged in page.
2. In your terminal run `npm run dev` - this will launch the front end of the application.
3. Once you open the website input a image address in the input field that has a face in it and click detect.
4. The application will then detect faces in the image and outline the face with a square.

## Questions
Contact information (GitHub usernames) of the developers:
Burman - burman92 
