import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SunnyIcon from '@material-ui/icons/WbSunny'
import Calendar from '@material-ui/icons/CalendarToday'
import Multimidia from '@material-ui/icons/VideoLibrary'
import Info from '@material-ui/icons/Info'
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        width: '100%',
    },
    menu: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
};

class MenuMobile extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Grid container className={classes.menu} >
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Previsões" icon={<SunnyIcon />} />
                    <BottomNavigationAction label="Agenda" icon={<Calendar />} />
                    <BottomNavigationAction label="Multimídias" icon={<Multimidia />} />
                    <BottomNavigationAction label="Informações" icon={<Info />} />
                </BottomNavigation>
            </Grid>
        );
    }
}

MenuMobile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuMobile);
