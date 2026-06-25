import React from "react";
import { formatCurrency, formatCurrencyShort } from "../../utils/formatters";

export default function CompanyProfileCard({ profile }) {
    if (!profile) return null;

    const changePercent =
        profile.price && profile.changes
            ? (profile.changes / profile.price) * 100
            : 0;

    return (
        <table className="table table-striped mt-2 mb-0 rounded-1 mb-4">
            <thead>
                <tr>
                    <th colSpan={2} className="bg-primary-color text-white">
                        <div className="float-start p-1 me-3 rounded-2">
                            <img src={profile.image} height={50} alt={profile.companyName} />
                        </div>

                        <div>
                            <span className="fs-5">
                                {profile.companyName} ({profile.symbol})
                            </span>
                        </div>

                        <div>
                            <span className="fs-5">
                                {formatCurrency(profile.currency, profile.price)}
                            </span>{" "}

                            <span className={profile.changes > 0 ? "text-success" : "text-danger"}>
                                ({changePercent.toFixed(2)}%) {profile.changes}
                                {profile.changes > 0 ? (
                                    <i className="bi bi-arrow-up-short"></i>
                                ) : (
                                    <i className="bi bi-arrow-down-short"></i>
                                )}
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="w-50">Year Range</td>
                    <td>
                        {profile.range} ({profile.currency})
                    </td>
                </tr>

                <tr>
                    <td>Market Cap</td>
                    <td>{formatCurrencyShort(profile.currency, profile.marketCap)}</td>
                </tr>

                <tr>
                    <td>Average Volume</td>
                    <td>{formatCurrencyShort(profile.currency, profile.averageVolume)}</td>
                </tr>

                <tr>
                    <td>Dividend Yield</td>
                    <td>{profile.lastDividend ? `${profile.lastDividend}%` : "-"}</td>
                </tr>

                <tr>
                    <td>Exchange</td>
                    <td>{profile.exchange}</td>
                </tr>

                <tr>
                    <td>CEO</td>
                    <td>{profile.ceo}</td>
                </tr>

                <tr>
                    <td>Website</td>
                    <td>
                        <a
                            href={profile.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-info"
                        >
                            {profile.website}
                        </a>
                    </td>
                </tr>

                <tr>
                    <td>HQ</td>
                    <td>
                        {profile.city} {profile.state}
                    </td>
                </tr>

                <tr>
                    <td>IPO Date</td>
                    <td>{profile.ipoDate}</td>
                </tr>

                <tr>
                    <td>Total Employees</td>
                    <td>{profile.fullTimeEmployees?.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    );
}