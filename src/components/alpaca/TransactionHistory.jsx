import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getTransactionHistory } from '../../services/alpacaService';
import ReactPaginate from 'react-paginate';
import '../../assets/css/pagination.css'; // Add custom styles for pagination if needed

const TransactionHistory = () => {
    const { data, error, isLoading } = useQuery('transactionHistory', getTransactionHistory);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: 'transaction_time', direction: 'desc' });
    const transactionsPerPage = 10;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredTransactions = data.filter(transaction => transaction.order_id);

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const pageCount = Math.ceil(sortedTransactions.length / transactionsPerPage);
    const offset = currentPage * transactionsPerPage;
    const currentTransactions = sortedTransactions.slice(offset, offset + transactionsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        } else {
            direction = 'desc'; // Default to descending if a new column is clicked
        }
        setSortConfig({ key, direction });
    };

    const formatCurrency = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        return formatter.format(price);
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${day}-${month} ${hours}:${minutes}`;
    };

    return (
        <>
            <div className="table-responsive">
                <table className='table table-striped mb-0 w-100'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('symbol')} role='button' className='bg-primary-color text-white fw-normal text-start text-nowrap'> SYMBOL <i className="bi bi-chevron-expand"></i></th>
                            <th className='bg-primary-color text-white fw-normal'>QTY</th>
                            <th className='bg-primary-color text-white fw-normal'>SIDE</th>
                            <th className='bg-primary-color text-white fw-normal'>PRICE</th>
                            <th className='bg-primary-color text-white fw-normal text-nowrap'>ORDER STATUS</th>
                            <th onClick={() => handleSort('transaction_time')} role='button' className='bg-primary-color text-white fw-normal text-nowrap'> DATE <i className="bi bi-chevron-expand"></i></th>
                            <th className='bg-primary-color text-white fw-normal'>ORDER ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className='text-start'>{transaction.symbol}</td>
                                <td>{transaction.qty}</td>
                                <td className='text-capitalize'>{transaction.side}</td>
                                <td>{formatCurrency('USD', transaction.price)}</td>
                                <td>{transaction.order_status}</td>
                                <td className='text-nowrap'>{formatDateTime(transaction.transaction_time)}</td>
                                <td className='text-nowrap'>{transaction.order_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </>
    );
};

export default TransactionHistory;