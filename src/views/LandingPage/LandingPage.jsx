import React from "react";

// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// import CustomInput from "components/CustomInput/CustomInput.jsx";

// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";

// Sections for this page
import ProgramInput from "./Sections/ProgramInput.jsx";

import * as ProgramApi from "util/api/ProgramApi.js";
// import ProductSection from "./Sections/ProductSection.jsx";
// import TeamSection from "./Sections/TeamSection.jsx";
// import WorkSection from "./Sections/WorkSection.jsx";
// import MenuItem from "@material-ui/core";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered

    this.state = {
      programName: "My New 5-3-1 Program",
      programUrl: "",
      daysPerWeek: 0,
      movements: []
    };
  }

  publishProgram = () => {
    //TODO some validation here

    ProgramApi.publish(
      this.state.movements,
      this.state.daysPerWeek,
      this.state.programName
    ).then(resp => {
      this.setState({ programUrl: resp.spreadsheetUrl });
    });
  };

  handleMovementsChange = movements => {
    this.setState({ movements: movements });
  };

  handleDaysPerWeekChange = daysPerWeek => {
    this.setState({ daysPerWeek: daysPerWeek });
  };

  handleProgramNameChange = programName => {
    this.setState({ programName: programName });
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="5-3-1 Program Builder"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/cover.jpg")}>
          <div className={classes.container}>
            <GridContainer alignContent="center">
              <GridItem xs={12} sm={12} md={4}>
                <ProgramInput
                  movements={this.state.movements}
                  handleMovementsChange={this.handleMovementsChange}
                  daysPerWeek={this.state.daysPerWeek}
                  handleDaysPerWeekChange={this.handleDaysPerWeekChange}
                  programName={this.state.programName}
                  handleProgramNameChange={this.handleProgramNameChange}
                  onPublishProgram={this.publishProgram}
                  programUrl={this.state.programUrl}
                />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        {/* <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
