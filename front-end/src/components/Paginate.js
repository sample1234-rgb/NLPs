import React from "react";
import { Pagination } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

function Paginate({ page, pages, keyword='', isAdmin=false }) {
    
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    // console.log(keyword);
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <Link key={x+1} to={{pathname: !isAdmin ? `/?keyword=${keyword}&page=${x+1}`: `/productlist/?keyword=${keyword}&page=${x+1}`}}>
                    <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                </Link>
            ))}
        </Pagination>
    )
    
  );
}

export default Paginate;
