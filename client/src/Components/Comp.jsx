import React from 'react'

export default function Comp(props) {
    const {title, description, size, size1} = props;
    return (
        <div className={`col-md-${size} col-sm-${size1}`}>
            <div className="card pt-4 pb-3 shadow zoom" >
                        <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        </div>
        </div>
        </div>
    )
}
