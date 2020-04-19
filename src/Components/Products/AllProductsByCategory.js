import React, {Component} from 'react';
import {getProductsByCategory} from "../APIBridge/APIProduct";
import {withRouter} from 'react-router-dom';
import ProductCard from "./productCard";

class AllProductsByCategory extends Component {

    ProductsByCategory = [];

    constructor(props) {
        super(props);

        this.state = {
            ProductsByCategory: [],
            categoryID: this.props.match.params.categoryId,
            spinner: true
        };
        console.log(this.state.categoryID);
        this.getAllProductsByCategory(this.state.categoryID).then();

    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.ProductsByCategory = [];
        this.setState({
            ProductsByCategory: [],
            categoryID: this.props.match.params.categoryId,
            spinner: true
        })

        console.log(this.props.match.params.categoryId)
        this.getAllProductsByCategory(this.state.categoryID).then();

    }

    async getAllProductsByCategory(CATEGORY_ID) {
        await getProductsByCategory(CATEGORY_ID).then(data => {
            data.map(value => {
                this.ProductsByCategory.push(value);
            });

            this.setState({
                ProductsByCategory: this.ProductsByCategory,
                spinner: false
            })
            console.log(this.state.ProductsByCategory);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className=" d-flex justify-content-center">
                    <div className="spinner-grow text-warning text-center justify-content-center" role="status"
                         hidden={this.state.spinner === false}>
                        <span className="sr-only">Loading...</span>
                    </div>

                </div>
                <div className="row m-5">

                    {this.state.ProductsByCategory.map((product, i) => (
                        <div key={i} className="col mt-2">
                            <ProductCard Product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(AllProductsByCategory);