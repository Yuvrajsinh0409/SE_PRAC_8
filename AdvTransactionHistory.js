import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import styles from "dan-components/Tables/tableStyle-jss";
import messageStyles from "dan-styles/Messages.scss";
import PapperBlock from "../PapperBlock/PapperBlock";

let id = 0;

function AdvTransactionHistory(props) {
  const [transacationdata, setTransacationdata] = useState([]);
  const { classes } = props;
  const getStatus = (status) => {
    switch (status) {
      case "Cancelled":
        return messageStyles.bgError;
      case "Pending":
        return messageStyles.bgWarning;
      case "Info":
        return messageStyles.bgInfo;
      case "Complete":
        return messageStyles.bgSuccess;
      default:
        return messageStyles.bgDefault;
    }
  };

  const fetchtransaction = async () => {
    try {
      const response = await fetch("http://localhost:3000/thistory", {
        method: "post",
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data) {
        setTransacationdata(data.transactions);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchtransaction();
  }, []);
  return (
    <PapperBlock
      whiteBg
      noMargin
      title="Transaction History"
      icon="ion-ios-time-outline"
      desc=""
    >
      <div className={classes.rootTable}>
        <Table padding="none" className={classes.tableSmall}>
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Sr No.</TableCell>
              <TableCell padding="normal">Date</TableCell>
              <TableCell padding="normal">Order Id.</TableCell>
              <TableCell padding="normal">Method</TableCell>
              <TableCell padding="normal">Amount</TableCell>
              <TableCell padding="normal">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacationdata.map((tdata, index) => {
              const createdAt = new Date(tdata.created_at * 1000);
              const formattedDate = createdAt.toLocaleDateString();

              return (
                <TableRow key={`${tdata.account_id}-${index}`}>
                  <TableCell padding="normal">{index + 1}</TableCell>
                  <TableCell padding="normal">{formattedDate}</TableCell>
                  <TableCell padding="normal">
                    <Typography>
                      {tdata.payload.payment.entity.order_id}
                    </Typography>
                  </TableCell>
                  <TableCell padding="normal">
                    <Typography>
                      {tdata.payload.payment.entity.method}
                    </Typography>
                  </TableCell>
                  <TableCell padding="normal">
                    <Typography>
                      ₹{tdata.payload.payment.entity.amount / 100}
                    </Typography>
                  </TableCell>
                  {/* <TableCell padding="normal">
                    <Typography>{formattedDate}</Typography>
                  </TableCell> */}
                  <TableCell padding="none">
                    <Chip
                      label={tdata.payload.payment.entity.status}
                      className={classNames(
                        classes.tableChip,
                        getStatus(tdata.payload.payment.entity.status)
                      )}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </PapperBlock>
  );
}

AdvTransactionHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvTransactionHistory);