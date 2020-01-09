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

    private board: number[][];
    private table: number[][];

    constructor(props: MyProps) {
        super(props);
        this.state = {
            data: "started"
        }
        this.board = [];
        this.initBoard();

         this.table = Array(3).fill(0)
            .map(() => new Array(3).fill(0));
    }

    private initBoard(): void {
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
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

        this.initBoard();
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
