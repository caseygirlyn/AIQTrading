import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SignUp from './components/pages/SignUp';
import Portfolio from './components/Portfolio';

// Load .env and .secrets files
import('dotenv').then(dotenv => {
  dotenv.config();
  dotenv.config({ path: '.secrets' });
});

const App = (props) => {
  return <>
    <Routes>
      <Route path="/" element={<Container apiKeys={props}/>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  </>
}

function DepositButton() {
  const [depositAmount, setDepositAmount] = useState(0);
  const handleDeposit = () => {
    
    console.log("Deposit amount:", depositAmount);
    // You can perform deposit-related actions here, like sending the amount to an API or updating state.
  }

  return (
    <div>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}





export default App;
