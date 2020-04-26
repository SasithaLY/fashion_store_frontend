import React, {useState, useEffect} from "react";
import RadioSelector from "./RadioSelector";
import {getFilteredProducts} from "../APIBridge/APIProduct";
import ProductCard from "./productCard";
import {prices} from "./Prices";

const AllProducts = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            setFilteredResults(data.data);
            setSize(data.size);
            setSkip(0);

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

    useEffect(() => {

        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
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
                <a class="badge badge-warning" data-toggle="collapse" href="#collapseExample" role="button"
                   aria-expanded="false" aria-controls="collapseExample">
                    More Filters
                </a>
            </p>
            <div className="collapse" id="collapseExample" >
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
            </div>
        </div>
    );
};

export default AllProducts;
