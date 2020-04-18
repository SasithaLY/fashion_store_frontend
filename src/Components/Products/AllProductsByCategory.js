import React, {Component} from 'react';
import {getProductsByCategory} from "../APIBridge/APIProduct";
import {withRouter} from 'react-router-dom';

class AllProductsByCategory extends Component {

    ProductsByCategory= [];

    constructor(props) {
        super(props);

        this.state = {
            ProductsByCategory: [],
            categoryID: this.props.match.params.categoryId
        };

        this.getAllProductsByCategory(this.state.categoryID).then();

    }

    async getAllProductsByCategory(CATEGORY_ID){
        await getProductsByCategory(CATEGORY_ID).then(data => {
            data.map(value => {
                this.ProductsByCategory.push(value);
            });

            this.setState({
                ProductsByCategory : this.ProductsByCategory
            })
            console.log(this.state.ProductsByCategory);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(AllProductsByCategory);