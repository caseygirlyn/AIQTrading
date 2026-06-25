import React from "react";

const formatValue = (value) => {
  if (value === null || value === undefined) return "N/A";
  return value.toFixed(2);
};

const PriceRow = ({ label, value }) => {
  const isPositive = value > 0;

  return (
    <tr>
      <td className="w-50">{label}</td>
      <td>
        <span className={isPositive ? "text-success" : "text-danger"}>
          {formatValue(value)}%
          {isPositive ? (
            <i className="bi bi-arrow-up-short"></i>
          ) : (
            <i className="bi bi-arrow-down-short"></i>
          )}
        </span>
      </td>
    </tr>
  );
};

export default function PriceChangeCard({ priceChange }) {
  if (!priceChange) return null;

  return (
    <table className="table table-striped mt-2 mb-0 rounded-1 mb-4">
    <thead>
        <tr>
        <th colSpan={2} className="bg-primary-color text-white fs-6">
            Price Changes
        </th>
        </tr>
    </thead>

    <tbody>
        <PriceRow label="1-day" value={priceChange["1D"]} />
        <PriceRow label="5-day" value={priceChange["5D"]} />
        <PriceRow label="MTD" value={priceChange["1M"]} />
        <PriceRow label="3 MTD" value={priceChange["3M"]} />
        <PriceRow label="6 MTD" value={priceChange["6M"]} />
        <PriceRow label="YTD" value={priceChange.ytd} />
        <PriceRow label="1-year" value={priceChange["1Y"]} />
        <PriceRow label="5-years" value={priceChange["5Y"]} />
        <PriceRow label="MAX" value={priceChange["max"]} />
    </tbody>
    </table>
  );
}