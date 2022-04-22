import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import QueryString from "qs";

export const useParams = (getParams) => {
    const { search } = useLocation();
    useEffect(() => {
        getParams(QueryString.parse(search.substring(1)));
    }, []);
}
