import React, { useState, useEffect } from 'react';
import AlpacaOrder from './alpaca/Order'
import Col from "./common/Theme/Col";
import Header from './common/Header';
import Footer from './common/Footer';
import TradingPosition from './alpaca/TradingPosition';
import PortfolioStatus from './alpaca/PortfolioStatus';
import TradingPositionsPieChart from './alpaca/TradingPositionPieChart';
import OrderStatus from './alpaca/OrderStatus';
import PortfolioGraph from './alpaca/PortfolioGraph';
import { Modal } from 'react-bootstrap';
import MarketStatus from './alpaca/MarketStatus';
import axios from 'axios';
import DataPriceChange from './common/Tables/DataPriceChange';
import TransactionHistory from './alpaca/TransactionHistory';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CandlestickChart from './alpaca/CandlestickChart';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode());
  const [show, setShow] = useState(false);
  const [showCP, setShowCP] = useState(false);
  const [assetQty, setAssetQty] = useState(null);
  const [price, setPrice] = useState(null);
  const [marketValue, setMarketValue] = useState(null);
  const [unrealizedPL, setUnrealizedPL] = useState(null);
  const [unrealizedPLPC, setUnrealizedPLPC] = useState(null);
  const [tickerCP, setTickerCP] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCP = () => {
    setTickerCP(null);
    setShowCP(false);
  }
  const handleShowCP = (tickerCP) => {
    setTickerCP(tickerCP);
    setShowCP(true);
  }

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode !== null ? savedMode : true; // Default to dark mode if no saved mode
  }

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const getTickerStyle = (index) => ({
    backgroundColor: isDarkMode
      ? (index % 2 === 0 ? ' #3B404E' : '#303441')
      : (index % 2 === 0 ? '#f0f0f0' : '#fff'),
    color: isDarkMode ? 'white' : '#3d4354',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });

  const getTickerContainerStyle = () => ({
    flex: '1',
  });

  const getMainDivStyle = () => ({
    display: 'flex',
    backgroundColor: isDarkMode ? '#292D3A' : '#fff',
    borderRadius: '8px',
    marginBottom: '2rem'
  });

  const getBuyButtonStyle = (index) => ({
    fontSize: '14px',
    padding: '6px 20px',
    marginRight: '5px',
  });

  const getSellButtonStyle = (index) => ({
    fontSize: '14px',
    padding: '6px 20px',
  });

  const [selectedTicker, setSelectedTicker] = useState(null);
  const [tickerName, setTickerName] = useState(null);
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState(1);

  const handleTickerSelection = (ticker, tickerName, type) => {
    handleShow();
    setSelectedTicker(ticker);
    setTickerName(tickerName);
    setOrderType(type);
    checkAssetQuantity(ticker);
    checkAssetPrice(ticker);
  };

  const tickers = [
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms, Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'AVGO', name: 'Broadcom Inc.' },
    { symbol: 'QCOM', name: 'QUALCOMM Incorporated' }
  ];

  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
  const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;
  let newTicker;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('https://paper-api.alpaca.markets/v2/assets', {
          method: 'GET',
          headers: {
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }

        const data = await response.json();
        setStocks(data);
        setFilteredStocks(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStocks();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length > 1) {
      const filtered = stocks.filter(stock =>
        (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.exchange.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.class.toLowerCase().includes(searchTerm.toLowerCase())) &&
        stock.tradable &&
        stock.latestPrice !== null
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks([]);
    }
  };

  const checkAssetQuantity = async (ticker) => {
    try {
      const response = await axios.get(`https://paper-api.alpaca.markets/v2/positions/${ticker}`, {
        headers: {
          'APCA-API-KEY-ID': apiKey,
          'APCA-API-SECRET-KEY': secretKey
        },
      });
      setAssetQty(response.data.qty);
      setMarketValue(response.data.market_value);
      setUnrealizedPL(response.data.unrealized_pl);
      setUnrealizedPLPC(response.data.unrealized_plpc);
      setError('');
    } catch (error) {
      setAssetQty(null);
    }
  };

  const checkAssetPrice = async (ticker) => {
    try {
      const response = await axios.get(`https://data.alpaca.markets/v2/stocks/${ticker}/trades/latest`, {
        headers: {
          'APCA-API-KEY-ID': apiKey,
          'APCA-API-SECRET-KEY': secretKey
        },
      });

      if (response.data && response.data.trade) {
        setPrice(response.data.trade.p.toFixed(2));
        setError('');
      } else {
        setPrice(null);
        setError('No price data available for this symbol.');
      }
    } catch (error) {
      setPrice(null);
      setError('Failed to fetch asset price. Please check the symbol and try again.');
    }
  };

  return (
    <><div className={isDarkMode ? 'darkMode' : 'lightMode'}>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeSwitch"
          checked={isDarkMode}
          onChange={toggleDarkMode} />
        <label className="form-check-label" htmlFor="darkModeSwitch">
          {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
        </label>
      </div>
      <Header />
      <div className="container m-auto mb-3 mt-5 pt-5 row px-0 text-center">
        <Col size="lg-12">
          <PortfolioStatus />
        </Col>
      </div>
      <div className="container m-auto d-md-flex mt-4">
        <Col size="md-6">
          <div style={getMainDivStyle()}>
            <div style={getTickerContainerStyle()} className='col-md-2'>
              <div className='mb-4'>
                <div className='d-flex'>
                  <h3 className="fs-4">Trade Available Stocks</h3>
                  <MarketStatus />
                </div>
                {error && <p>Error: {error}</p>}
                <div className="input-group">
                  <input className='form-control rounded-0 shadow-none search bg-transparent'
                    type="text"
                    placeholder="SYMBOL OR NAME"
                    value={searchTerm}
                    onChange={handleSearch}
                  /><i className="bi bi-search position-absolute searchBtn" style={{ right: '5px', top: '5px', color: '#6c757d' }}></i>
                </div>
                {searchTerm.length > 2 && filteredStocks.length > 0 && (
                  <div style={{ maxHeight: '210px', overflowY: 'scroll' }}>
                    <table className='table table-striped mb-0 w-100 mb-4'>
                      <tbody>
                        {filteredStocks.map((ticker, index) => (
                          <tr key={index}>
                            <td onClick={() => handleShowCP(ticker.symbol)} role='button' style={{ minWidth: '84px' }}>
                              <i className="bi bi-graph-up text-success" data-toggle="tooltip" title="View Price Change Chart"></i> {ticker.symbol}
                            </td>
                            <td onClick={() => handleShowCP(ticker.symbol)} role='button'>{ticker.name}</td>
                            <td colSpan={2} className='text-end' style={{ minWidth: '154px' }}>
                              <button className="btn btn-outline-success m-1 px-3" onClick={() => handleTickerSelection(ticker.symbol, ticker.name, 'buy')}>Buy</button>
                              <button className="btn btn-outline-danger m-1 px-3" onClick={() => handleTickerSelection(ticker.symbol, ticker.name, 'sell')}>Sell</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <h3 className="fs-4" style={{ color: isDarkMode ? 'white' : '#3d4354' }}>Most Owned Stocks</h3>
              <table className='table table-striped mb-0 w-100 mb-4'>
                <tbody>
                  {tickers.map((ticker, index) => (
                    <tr key={index}>
                      <td onClick={() => handleShowCP(ticker.symbol)} role='button' data-toggle="tooltip" title="View Price Change Chart" style={{ minWidth: '84px' }}>
                        <i className="bi bi-graph-up text-success" ></i> {ticker.symbol}</td>
                      <td>{ticker.name}</td>
                      <td colSpan={2} className='text-end' style={{ minWidth: '154px' }}><div>
                        <button className="btn btn-outline-success m-1 px-3" onClick={() => handleTickerSelection(ticker.symbol, ticker.name, 'buy')}>Buy</button>
                        <button className="btn btn-outline-danger m-1 px-3" onClick={() => handleTickerSelection(ticker.symbol, ticker.name, 'sell')}>Sell</button>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
        <Col size="md-6">
          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>Trade Full or Fractional Shares</Modal.Header>
            <Modal.Body>
              {selectedTicker && (
                <AlpacaOrder
                  symbol={selectedTicker}
                  tickerName={tickerName}
                  isDarkMode={isDarkMode}
                  orderType={orderType}
                  quantity={quantity}
                  closeModal={handleClose}
                  assetQty={assetQty}
                  price={price}
                  marketValue={marketValue}
                  unrealizedPL={unrealizedPL}
                  unrealizedPLPC={unrealizedPLPC}
                />
              )}
            </Modal.Body>
          </Modal>
          <div className='ps-md-5'>
            <PortfolioGraph isDarkMode={isDarkMode} />
            <TradingPositionsPieChart />
          </div>
        </Col>
      </div>
      <div className="container m-auto">
        <Tabs
          defaultActiveKey="positions"
        >
          <Tab eventKey="positions" title="Trading Positions" className="mb-5 text-center">
            <TradingPosition />
          </Tab>
          <Tab eventKey="status" title="Orders" className="mb-5 text-center">
            <OrderStatus />
          </Tab>
          <Tab eventKey="history" title="Transactions" className="mb-5 text-center">
            <TransactionHistory />
          </Tab>
        </Tabs>
      </div>
      {tickerCP && (
        <Modal show={showCP} onHide={handleCloseCP} dialogClassName="asset-modal modal-dialog-centered" className={isDarkMode ? 'darkModal' : ''}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className="col-lg-4 mb-2">
                <DataPriceChange tickerCP={tickerCP} />
              </div>
              <div className='col-lg-8 text-center'>
                <CandlestickChart tickerCP={tickerCP} isDarkMode={isDarkMode} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <Footer />
    </div>
    </>
  );
};
export default Portfolio;