import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface MyProps {
    name: string;
}

interface MyState {
    data: string;
}

/*
 * https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
 */

class ShoppingList extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);
        this.state = {
            data: "started"
        }
    }

    async componentDidMount(): Promise<void> {
        try {
            const response: Response = await fetch('https://api.github.com/users/mralexgray/repos');
            if (!response.ok) throw Error(response.statusText);

            const json: any = await response.json();
            const data: string = JSON.stringify(json);

            this.setState({data})
        } catch(error) {
            console.log(error);
        }
    }

    public render(): any {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Apple</li>
                    <li>{this.state.data}</li>
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <ShoppingList name="Peter"/>,
    document.getElementById('root')
);
