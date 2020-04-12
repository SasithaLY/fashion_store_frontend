import React, {Component} from 'react';
import API from "../../Utils/API";

class UploadCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ProductsArray: [],
            word: String
        };
    }

    async componentDidMount() {
        console.log('use effect');
        await API.get('productsRouter/')
            .then(response => {
                this.setState({
                    ProductsArray: response.data
                });
            });

        console.log('array', this.state.ProductsArray);
    };


    render() {
        return (
            <div className="container-fluid">
                {/*<form>*/}
                {/*    <div className="form-group">*/}
                {/*        <label htmlFor="exampleInputEmail1">Email address</label>*/}
                {/*        <input type="email" className="form-control" id="exampleInputEmail1"*/}
                {/*               aria-describedby="emailHelp" placeholder="Enter email" />*/}
                {/*            <small id="emailHelp" className="form-text text-muted">We'll never share your email with*/}
                {/*                anyone else.</small>*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label htmlFor="exampleInputPassword1">Password</label>*/}
                {/*        <input type="password" className="form-control" id="exampleInputPassword1"*/}
                {/*               placeholder="Password" />*/}
                {/*    </div>*/}
                {/*    <div className="form-check">*/}
                {/*        <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
                {/*            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                {/*    </div>*/}
                {/*    <button type="submit" className="btn btn-primary">Submit</button>*/}
                {/*</form>*/}

                {this.state.ProductsArray.map((postDetail, index) => {
                    this.state.word = "data:image/jpeg;base64," + postDetail.image[0].data.data;
                    return (
                        <div>
                            <img src={this.state.word}></img>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UploadCategories;