# AIQTrading
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Description
This is a full-stack trading app built with React for the frontend, Node.js for the backend, and API integration for trading functionalities.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Run Locally](#run-locally)
- [Jest Test](#jest-tests)
- [License](#license)
- [Contributing](#contributing)
- [Screen Recording](#screen-recording)
- [Questions](#questions)

## Features

- **Trading Dashboard**: Users can view their portfolio, current positions, order history, and buying power.
- **Real-time Data**: The app integrates with external APIs to fetch real-time market data for stocks.
- **Trading Functionality**: Users can execute buy and sell orders for different financial instruments.
- **API Integration**: The backend communicates with external trading APIs to execute orders and fetch market data.
- **Responsive Design**: The app is designed to be responsive and accessible across different devices and screen sizes.

## Technologies

- **Frontend:** React, React Router, Chart.js
- **Backend:** Node.js
- **APIs:** 
    - Alpaca (https://alpaca.markets/)
    - Polygon.i (https://polygon.io/)
    - Financial Modeling Prep (https://site.financialmodelingprep.com)
    - Firebase (https://firebase.google.com/)
- **Deployment:** Netlify

## Installation

1. Make sure you have Node.js installed on your system.
2. Clone this repository to your local machine or download the source code as a ZIP file and extract it.

## Usage

1. Open your terminal or command prompt.
2. Navigate to the directory where you cloned or extracted the repository.
3. Run the following command to install dependencies:

````
npm install
````

## Run locally
````
npm run dev
````

## Jest Tests

### Command line

All tests:
````
npm run test
````

Smoke test:
````
jest smoke.test.js
````

### VS Code

Open the test file you want to run.
Navigate to the "Run and Debug" (Ctrl-Shift-D) window.
Select 'Jest Current File' from the drop down.


## License
This project is licensed under the [MIT License](LICENSE).

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

## Screen Recording
![Home Page](./public/assets/images/AIQTrading.gif)

![Home Page](./public/assets/images/AIQ_mobile.gif)


## Questions
Feel free to reach out for any inquiries at [tradingaiq@gmail.com ](mailto:tradingaiq@gmail.com ).

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)


## Netlify site

<https://aiqtrading.netlify.app/>
