import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from 'react';
import {ExpenseEntry} from "../../types";
import {ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";

interface ExpenseListItemProps {
    tagName: string;
    expenses: ExpenseEntry[];
    color: string;
    handleCheckbox: (selected: boolean) => void;
}
const ExpenseListItem = ({tagName, expenses, color, handleCheckbox}: ExpenseListItemProps): ReactElement => {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
};

export default ExpenseListItem;
