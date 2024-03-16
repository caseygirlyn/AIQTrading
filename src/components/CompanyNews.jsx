import React, { useState, useEffect } from 'react';

const CompanyNews = (props) => {
    const news = props.news;
    const query = props.parseQuery;

    return (
        <div className='container news'>
            <h2 className="fs-4 mt-2">{query} NEWS</h2>
            <div className='wrapper card-group pb-3'>
                {news.slice(0, 9).map((article, index) => (
                    <div className="cardContainer col-md-4 col-sm-12 w-lg-auto py-3" key={index}>
                        <div className="card border-2 rounded-0 w-auto border-0">
                            <div className="card-body caption py-1 px-md-2 px-0">
                                <p className="card-title mb-0">
                                    <a href={article.url} className="text-decoration-none" target="_blank" rel="noopener noreferrer">{article.title}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyNews
