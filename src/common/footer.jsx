import React from 'react'

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        position: 'fixed',
        left: 0,
        [theme.breakpoints.down('xs')]: {
            bottom: 50,
        },
        [theme.breakpoints.up('sm')]: {
            bottom: 0,
        },
        width: '100%',
        backgroundColor: '#0F4295'
    }
})

const Footer = props => {
    const { classes } = props;
    return (
        <Grid className={classes.root}>
            <Typography variant="body2" gutterBottom style={{color: 'white'}}>
                INPE - Instituto Nacional de Pesquisas Espaciais
                </Typography>         
            <Typography variant="body2" gutterBottom style={{color: 'white'}}>
                CPTEC - Centro de Previsão de Tempo e Estudos Climáticos
        </Typography>
        </Grid>
    )
}



Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);