import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import QueryString from "qs";

export const useParams = (getParams, watchList=[]) => {
    const { search } = useLocation();
    useEffect(() => {
        getParams(QueryString.parse(search.substring(1)));
    }, [search, ...watchList]);
}
