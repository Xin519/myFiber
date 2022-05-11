import React, { render, Component } from "./react"

const root = document.getElementById('root')

const jsx = (<div>
    <p id="a1">jsx</p>
    <p id="a2">fiber</p>
    
</div>)

// render(jsx, root)

// setTimeout(() => {
//     const jsx = (<div>
//         <p>new jsx</p>
//     </div>)

//     render(jsx, root)
// }, 5000);

class Greating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'fall'
        }
    }

    render() {
        return <div> 
            {this.state.name} class &nbsp;
            <button onClick={() => this.setState({ name: 'FALL' })}>修改</button>
        </div>
    }
}

// render(<Greating />, root)

function FnComponent({ title }) {
    return <div>
        <p>{title} function</p>
        {jsx}
        <Greating />
    </div>
}

render(<FnComponent title={'title'} />, root)

