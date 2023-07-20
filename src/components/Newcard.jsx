import React from 'react'

function Newcard({News}) {
  return (
    <div>
    {
        News.urlToImage && (
            <div className="border mt-3 p-3 bg-light">
                <div className="row">
                        <div className="col-3">
                        <img
                            src={News.urlToImage}
                            alt="title"
                            style={{ height: 200, width: 200 }}
                        />
                        </div>
                        <div className="col-9 ps-3">
                        <h4>{News.title}</h4>
                        {/* <p>{News.publishedAt.toDate().toDateString()}</p> */}
                        <hr/>
                        <p>{News.description}</p>
                        {News.author && (<div className="col-6">
                                <span className="badge bg-primary">Author:  {News.author}</span>
                            </div>
                        )}
                        <div className="row">
                        <div className="col-12 d-flex flex-row-reverse mb-3">
                            <a href={News.url} target='_blank' rel="noreferrer" class="btn btn-secondary">Full Article</a>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default Newcard