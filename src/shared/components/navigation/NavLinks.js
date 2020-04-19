import React, {Component} from "react";
import API from '../../../Utils/API'
import {Link} from 'react-router-dom';

import './NavLinks.css';

class NavLinks extends Component {
    // categories = [];

    constructor(props) {
        super(props);

        this.state = {
            moreCategories: [] = []
        };

        this.getCategoryList().then();
    }

    async getCategoryList() {
        await API.get('categoriesRouter/all')
            .then(response => {
                response.data.map((value, index) =>{
                    this.state.moreCategories.push(value);
                })
                this.setState({
                    moreCategories : this.state.moreCategories
                })
            }).catch(error=> {
            console.log(error)
        })

        console.log('1',this.state.moreCategories)
        // this.state.filteredCategories = this.state.moreCategories.slice(1, 3);

    }


    render() {
        return (

            <ul className="navbar-nav mx-5 mr-auto">
                {this.state.moreCategories.slice(0,5).map((item, key) =>
                    <a key={key} href={`/allProducts/${item._id}`}
                          className="btn list-group-item mr-2 mb-2 bg-transparent text-white">{item.categoryName}</a>
                )}
                <div className="dropdown">
                    <button className="list-group-item mr-2 mb-2 bg-warning text-white dropdown-toggle w-100 rounded-lg"
                            type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={{float: "right"}}>
                        More Categories
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.state.moreCategories.slice(5,20).map((postDetail, index) => {
                            return <Link className="dropdown-item" key={postDetail._id}
                                         to={`/allProducts/${postDetail._id}`}
                                         params={{categoryId: '123'}}>{postDetail.categoryName}</Link>
                        })}
                        <a className="dropdown-item" href="/products">All Products</a>
                    </div>
                </div>
            </ul>
        );
    }
}

export default NavLinks;
