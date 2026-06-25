const NewsCard = ({ article }) => (
  <div className="cardContainer col-md-6 col-sm-12 w-lg-auto py-3">
    <a
      href={article.article_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none"
    >
      <div className="card-body caption py-1 px-md-2 px-0 d-flex align-items-start">
        <div
          className="newsthumb w-25 me-3 shadow"
          style={{
            backgroundImage: `url(${article.image_url})`,
          }}
        />

        <div className="newsTitle w-75">
          {article.title}
          <div className='mt-1 text-secondary'><i className="bi bi-calendar3 me-2"></i>{article.published_utc.slice(0, 10)}</div>
        </div>
      </div>
    </a>
  </div>
);

export default NewsCard;