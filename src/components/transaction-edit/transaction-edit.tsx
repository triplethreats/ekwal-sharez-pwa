import * as React from "react";
import {Transaction} from "../../domain/transaction";
import TextField from '@material-ui/core/TextField';

const TransactionEdit: React.FunctionComponent<{
    transaction: Transaction
}> = (props) => {
    return (
        <div>
            <TextField
                label="Name"
                value="toto"
                margin="normal"
            />
            <TextField
                label="Price"
                value="50"
                margin="normal"
            />
            <TextField
                label="Date"
                type="date"
                defaultValue="2019-05-14"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                select
                label="Payer"
                value={0}
                SelectProps={{
                    native: true,
                    MenuProps: {
                    },
                }}
                helperText="Please select the payer"
                margin="normal"
            >

                <option key="arthur" value="arthur">
                    Arthur
                </option>
                <option key="kevin" value="kevin">
                    Kevin
                </option>
                <option key="rafael" value="rafael">
                    Rafael
                </option>

            </TextField>
        </div>
    );
};

export default TransactionEdit;
