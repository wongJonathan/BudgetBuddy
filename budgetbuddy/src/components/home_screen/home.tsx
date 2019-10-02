import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

interface IState {
    amounts: string[],
    value: string
};

export default class Home extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            amounts: [],
            value: ''
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    }

    keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13) {
            let newAmounts = this.state.amounts;
            newAmounts.push(this.state.value);
            this.setState({ amounts: newAmounts, value: '' });
        }
    };

    render() {
        console.log(this.state);
        return (
            <TextField
                id="moneyInput"
                label="Enter Amount"
                value={this.state.value}
                variant="outlined"
                onKeyDown={this.keyPress}
                onChange={this.handleChange}
            ></TextField>
        );
    }
};