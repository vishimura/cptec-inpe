import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },button: {
    margin: theme.spacing.unit,
  },
})

class Content extends Component {
    constructor(props){
        super(props)
        this.state = {
            cidade: '',
            id: 0
        }
    }
   
    cidadeForm = (e) => {
        this.setState({cidade: e.target.value})
    }
    procurarCidade = () => {
        fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${this.removeAcento(this.state.cidade)}`)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser()
            let xml = parser.parseFromString(data, 'application/xml')
            let cidade = xml.getElementsByTagName('nome')[0].firstChild.nodeValue
            let id = xml.getElementsByTagName('id')[0].firstChild.nodeValue
            this.setState({cidade, id})
            this.previsao7dias()
        })
    }

    previsao7dias = () => {
        console.log(this.state.id)
        fetch(`http://servicos.cptec.inpe.br/XML/cidade/7dias/${this.state.id}/previsao.xml`)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser()
            let xml = parser.parseFromString(data, 'application/xml')
            console.log(xml)
        })
    }

    condicaoTempo = (sigla) => {
        switch(sigla){
            case 'ec':	return 'Encoberto com Chuvas Isoladas'
            break;
            case 'ci':	return 'Chuvas Isoladas'
            break;
            case 'c':	return 'Chuva'
            break;
            case 'in':	return 'Instável'
            break;
            case 'pp':	return 'Poss. de Pancadas de Chuva'
            break;
            case 'cm':	return 'Chuva pela Manhã'
            break;
            case 'cn':	return 'Chuva a Noite'
            break;
            case 'pt':	return 'Pancadas de Chuva a Tarde'
            break;
            case 'pm':	return 'Pancadas de Chuva pela Manhã'
            break;
            case 'np':	return 'Nublado e Pancadas de Chuva'
            break;
            case 'pc':	return 'Pancadas de Chuva'
            break;
            case 'pn':	return 'Parcialmente Nublado'
            break;
            case 'cv':	return 'Chuvisco'
            break;
            case 'ch':	return 'Chuvoso'
            break;
            case 't':	return 'Tempestade'
            break;
            case 'ps':	return 'Predomínio de Sol'
            break;
            case 'e':	return 'Encoberto'
            break;
            case 'n':	return 'Nublado'
            break;
            case 'cl':	return 'Céu Claro'
            break;
            case 'nv':	return 'Nevoeiro'
            break;
            case 'g':   return 'Geada'
            break;
            case 'ne':	return 'Neve'
            break;
            case 'nd':	return 'Não Definido'
            break;
            case 'pnt':	return 'Pancadas de Chuva a Noite'
            break;
            case 'psc':	return 'Possibilidade de Chuva'
            break;
            case 'pcm':	return 'Possibilidade de Chuva pela Manhã'
            break;
            case 'pct':	return 'Possibilidade de Chuva a Tarde'
            break;
            case 'pcn':	return 'Possibilidade de Chuva a Noite'
            break;
            case 'npt':	return 'Nublado com Pancadas a Tarde'
            break;
            case 'npn':	return 'Nublado com Pancadas a Noite'
            break;
            case 'ncn':	return 'Nublado com Poss. de Chuva a Noite'
            break;
            case 'nct':	return 'Nublado com Poss. de Chuva a Tarde'
            break;
            case 'ncm':	return 'Nubl. c/ Poss. de Chuva pela Manhã'
            break;
            case 'npm':	return 'Nublado com Pancadas pela Manhã'
            break;
            case 'npp':	return 'Nublado com Possibilidade de Chuva'
            break;
            case 'vn':	return 'Variação de Nebulosidade'
            break;
            case 'ct':	return 'Chuva a Tarde'
            break;
            case 'ppn':	return 'Poss. de Panc. de Chuva a Noite'
            break;
            case 'ppt':	return 'Poss. de Panc. de Chuva a Tarde'
            break;
            case 'ppm':	return 'Poss. de Panc. de Chuva pela Manhã'
            break;
            default:
                return 'Valor Ínvalido'
        }
    }

    removeAcento (text){       
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;                 
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container >
            <Paper elevation={1} style={{width:'100%', textAlign: 'center'}}>
            <Typography  variant="h5" gutterBottom >Previsão do Tempo</Typography>
            <TextField
            id="standard-search"
            label="Cidade"
            type="search"
            className={classes.textField}
            margin="normal"
            onChange={this.cidadeForm}
            />
             <Button variant="contained" color="primary" className={classes.button} onClick={this.procurarCidade}>
                Procurar
            </Button>
            </Paper>
            </Grid>
        )
    }
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Content)