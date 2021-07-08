import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {Helmet} from "react-helmet"

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}
export const Test = (props) => {
    const history = useHistory();
    const pressButton = () => {
        // history.push('/')
        console.log('authentication: ', props.authentication.isLoading)
    }
    return (
        <>
            <Helmet lang = 'zh'>
                <title>My Title</title>
            </Helmet>
            <Button outline onClick={pressButton}>Redirect to the default address</Button>
            {/* <div>{props.match.params.id} </div>
            {props.a} */}
        </>
    )
}

// class Test extends Component {

//     constructor(props) {
//         this.pressButton = this.pressButton.bind(this)
//     }

//     pressButton = () => {
//         this.props.history.push('/')
//     }

//     render() {
//         return (
//             <>
//             <Button outline onClick={this.pressButton}>Redirect to the initial address</Button>
//                 <div>Test</div>
//             </>
//         )
//     }
// }

// In Function
// const Test = withRouter((props) => (
//     <div>{props.match.params.id}</div>
// ))

// function Test() {
//     let history = useHistory();

//     function handleClick() {
//       history.push("/home");
//     }

//     return (
//       <button type="button" onClick={handleClick}>
//         Go home
//       </button>
//     );
//   }

// export default Test
export default connect(mapStateToProps)(Test)