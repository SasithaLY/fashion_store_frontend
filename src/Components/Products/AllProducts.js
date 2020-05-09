import React, {useState, useEffect} from "react";
import RadioSelector from "./RadioSelector";
import {getFilteredProducts} from "../APIBridge/APIProduct";
import ProductCard from "./productCard";
import {prices} from "./Prices";
import {useParams} from 'react-router-dom'

const AllProducts = (props) => {

    const params = useParams();
    let totalSize = useState(0);
    // console.log('ishan', params.keyWord)

    const [myFilters, setMyFilters] = useState({
        filters: {price: [], name: params.keyWord}
    });
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);


    const loadFilteredResults = newFilters => {
        if (params.keyWord) {
            newFilters = {
                ...newFilters,
                name: params.keyWord
            };
        }
        getFilteredProducts(skip, limit, newFilters).then(data => {

            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });

    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const LoadMore = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-primary mb-5">
                    Load more
                </button>
            )
        );
    };


    const showAlertEmpty = () => {
        console.log(totalSize);
        totalSize = totalSize + size;
        return (
            totalSize === 0 && (
                <div className='container'>
                    <div className="alert bg-danger d-flex justify-content-center" role="alert">
                        Oops.. No Results!
                    </div>
                </div>
            )
        );
    };

    useEffect(() => {

        loadFilteredResults(skip, limit, myFilters.filters);
        console.log(size)
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("SHOP", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <div className="container-fluid">
            <p>
                <a className="badge badge-warning" data-toggle="collapse" href="#collapseExample" role="button"
                   aria-expanded="false" aria-controls="collapseExample">
                    More Filters
                </a>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="bg-dark rounded d-flex justify-content-center">
                    <div className="row h-25">
                        <RadioSelector
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>
            </div>


            <div>
                <div className="row mt-4 m-5 d-flex justify-content-center">
                    {filteredResults.map((product, i) => (
                        <div key={i} className="row m-2 ">
                            <ProductCard Product={product}/>
                        </div>
                    ))}
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    {LoadMore()}
                </div>
                {showAlertEmpty()}
            </div>
        </div>
    );
};

export default AllProducts;
