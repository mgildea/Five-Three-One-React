import React from "react";

import PropTypes from "prop-types";

import _ from "lodash/util";
// @material-ui core components

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
//import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import TextField from "@material-ui/core/TextField";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import programInputStyle from "assets/jss/material-kit-react/views/landingPageSections/programInputStyle.jsx";

const movementOptions = [
  "Back Squat",
  "Deadlift",
  "Front Squat",
  "Push Press",
  "Overhead Squat",
  "Strict Press",
  "Bench Press"
];

class ProgramInput extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      // movements: [],
      // daysPerWeek: 0,
      cardAnimaton: "cardHidden"
    };
  }

  handleDaysPerWeekChange = event => {
    this.props.handleDaysPerWeekChange(event.target.value);
    // this.setState({ daysPerWeek: event.target.value });
  };

  handleMovementsChange = event => {
    this.props.handleMovementsChange(event.target.value);
    //this.setState({ movements: event.target.value });
  };

  handleProgramNameChange = event => {
    this.props.handleProgramNameChange(event.target.value);
  };

  // buildProgram = event => {
  //   console.log(this.state.movements);
  //   console.log(this.state.daysPerWeek);
  // };

  render() {
    const {
      classes,
      movements,
      daysPerWeek,
      programUrl,
      programName,
      onPublishProgram
    } = this.props;
    return (
      <Card className={classes[this.state.cardAnimaton]}>
        <form className={classes.form}>
          <CardHeader color="success" className={classes.cardHeader}>
            <h4>Design Program</h4>
          </CardHeader>

          <CardBody>
            {programUrl === "" || (
              <span>Your 5-3-1 program has been succesfully created!</span>
            )}
            {programUrl !== "" || (
              <div>
                <GridContainer>
                  <GridItem>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                    >
                      <TextField
                        id="programName"
                        label="Program Name"
                        className={classes.textField}
                        value={programName}
                        onChange={this.handleProgramNameChange}
                        margin="normal"
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="movements">Movements</InputLabel>
                      <Select
                        multiple
                        value={movements}
                        onChange={this.handleMovementsChange}
                        input={<Input id="movements" fullWidth={true} />}
                        autoWidth={true}
                        renderValue={selected => selected.join(", ")}
                        //  MenuProps={MenuProps}
                      >
                        {movementOptions.map(name => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={movements.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="daysPerWeek">
                        Days per Week
                      </InputLabel>
                      <Select
                        value={daysPerWeek}
                        onChange={this.handleDaysPerWeekChange}
                        input={<Input id="daysPerWeek" fullWidth={true} />}
                        autoWidth={true}
                        //renderValue={selected => selected.join(", ")}
                        //  MenuProps={MenuProps}
                      >
                        {_.range(1, 8).map(day => (
                          <MenuItem key={day} value={day}>
                            <ListItemText primary={day} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </div>
            )}
          </CardBody>

          <CardFooter className={classes.cardFooter}>
            {programUrl !== "" && (
              <Button
                color="transparent"
                href={programUrl}
                hand="true"
                target="_blank"
              >
                View {programName}
              </Button>
            )}
            {programUrl === "" && (
              <Button
                variant="contained"
                color="success"
                size="lg"
                hand="true"
                onClick={onPublishProgram}
              >
                Build Program
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    );
  }
}

ProgramInput.propTypes = {
  classes: PropTypes.object.isRequired,
  movements: PropTypes.array.isRequired,
  daysPerWeek: PropTypes.number.isRequired,
  programUrl: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  onPublishProgram: PropTypes.func.isRequired,
  handleMovementsChange: PropTypes.func.isRequired,
  handleDaysPerWeekChange: PropTypes.func.isRequired,
  handleProgramNameChange: PropTypes.func.isRequired
};

export default withStyles(programInputStyle)(ProgramInput);
