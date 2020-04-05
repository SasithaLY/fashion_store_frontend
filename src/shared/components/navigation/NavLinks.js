import React, {Component} from "react";
import PostData from "../../../Components/Products/posts.json"
import axios from 'axios';

import './NavLinks.css';

class NavLinks extends Component {
    categories = [];

    constructor(props) {
        super(props);

        this.state = {
          moreCategories: []
        };

        this.categories = [
            {id: 1, item: 'Women'},
            {id: 2, item: 'Men'},
            {id: 3, item: 'Kids & Babies'},
            {id: 4, item: 'Sportsware'},
            {id: 4, item: 'Homeware'},
        ];
    }

    componentDidMount() {
      axios.get('http://localhost:8000/categoriesRouter/all')
          .then(response => {
            this.setState({
              moreCategories: response.data
            });
          })
    }


  render() {
        return (

            <ul className="navbar-nav mx-5 mr-auto">
                {this.categories.map((item, key) =>
                    <button key={key}
                            className="list-group-item mr-2 mb-2 bg-transparent text-white">{item.item}</button>
                )}
                <div className="dropdown">
                    <button className="list-group-item mr-2 mb-2 bg-warning text-white dropdown-toggle w-100 rounded-lg"
                            type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        More Categories
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.state.moreCategories.map((postDetail, index) => {
                            return <a className="dropdown-item" key={postDetail.id}
                                      href={"/products/" + postDetail._id}>{postDetail.categoryName}</a>
                        })}
                        <a className="dropdown-item" href="/products">All Products</a>
                    </div>
                </div>
            </ul>
        );
    }
}

export default NavLinks;
