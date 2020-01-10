import React from "react";

interface SquareProps {
    value: string;
    onClick: any;
}

class Square extends React.Component<SquareProps> {

    public render(): JSX.Element {
        return (
            <button
                className="square"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

export default Square;