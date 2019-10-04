import React from 'react';
import TextField from '@material-ui/core/TextField';

type IState = {
    amounts: string[],
    value: string
};

export default class Home extends React.Component<{}, IState> {

    state = {
        amounts: [] as string[],
        value: ''
    };

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
            <div>
                <TextField
                    id="moneyInput"
                    label="Enter Amount"
                    value={this.state.value}
                    variant="outlined"
                    onKeyDown={this.keyPress}
                    onChange={this.handleChange}
                ></TextField>
                <div >
                    {this.state.amounts.map(item => {
                        return (<ul>{item}</ul>);
                    })}
                </div>
            </div>
        );
    }
};