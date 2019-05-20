import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SkyImage from '../assets/imgs/sky.jpg'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
            ...theme.mixins.gutters(),
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            backgroundImage: `url(${SkyImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            textAlign: 'center',
    },
    media: {
        height: 140,
    },
    multilineColor:{
        color:'white'
    },labelRoot:{
        color:'white'

    }
})

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cidade: '',
            id: 0,
            dias: []
        }
    }

    cidadeForm = (e) => {
        this.setState({ cidade: e.target.value })
    }
    procurarCidade = () => {
        fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${this.removeAcento(this.state.cidade)}`)
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser()
                let xml = parser.parseFromString(data, 'application/xml')
                let cidade = xml.getElementsByTagName('nome')[0].firstChild.nodeValue
                let id = xml.getElementsByTagName('id')[0].firstChild.nodeValue
                this.setState({ cidade, id })
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
                let previsao = xml.getElementsByTagName('previsao')
                let diasPrev = []
                for (let i = 0; i < 6; i++) {
                    let dia = {}
                    dia['dia'] = previsao[i].getElementsByTagName('dia')[0].innerHTML
                    dia['tempo'] = previsao[i].getElementsByTagName('tempo')[0].innerHTML
                    dia['maxima'] = previsao[i].getElementsByTagName('maxima')[0].innerHTML
                    dia['minima'] = previsao[i].getElementsByTagName('minima')[0].innerHTML
                    dia['iuv'] = previsao[i].getElementsByTagName('iuv')[0].innerHTML
                    diasPrev[i] = dia
                }
                this.setState({ dias: diasPrev })
                this.renderCards(diasPrev)
            })
    }

    renderCards = (dias) => {
        const { classes } = this.props;
        console.log(dias)
        let render = dias.map((dia, index) => {
            return (
                <Grid item sm={2} key={index} style={{ width: '100%' }}>
                    <Paper style={{height: '100%'}} >
                        <Grid container>
                            <Grid container>
                                <Grid item xs={4}>
                                    <img src={require(`../assets/imgs/${this.condicaoTempo(dia['tempo'])['imagem']}`)} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.diaSemana(dia['dia'])}
                                    </Typography>
                                    <Typography component="h5">
                                        {`Máxima: ${dia['maxima']}ºC`}
                                    </Typography>
                                    <Typography component="h5">
                                        {`Mínima: ${dia['minima']}ºC`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography component="h5" style={{padding: 5}}>
                                    Tempo:{this.condicaoTempo(dia['tempo'])['sigla']}
                                </Typography>
                                <Typography component="h5" style={{padding: 5}}>
                                    IVU:{dia['iuv']}
                                </Typography>
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid >
            )
        })
        return render
    }

    condicaoTempo = (sigla) => {
        switch (sigla) {
            case 'ec': return { sigla: 'Encoberto com Chuvas Isoladas', imagem: 'chuva-nuvem.png' }
                break;
            case 'ci': return { sigla: 'Chuvas Isoladas', imagem: 'chuva.png' }
                break;
            case 'c': return { sigla: 'Chuva', imagem: 'chuva.png' }
                break;
            case 'in': return { sigla: 'Instável', imagem: 'chuva-nuvem.png' }
                break;
            case 'pp': return { sigla: 'Poss. de Pancadas de Chuva', imagem: 'chuva.png' }
                break;
            case 'cm': return { sigla: 'Chuva pela Manhã', imagem: 'chuva-nuvem.png' }
                break;
            case 'cn': return { sigla: 'Chuva a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'pt': return { sigla: 'Pancadas de Chuva a Tarde', imagem: 'chuva.png' }
                break;
            case 'pm': return { sigla: 'Pancadas de Chuva pela Manhã', imagem: 'chuva.png' }
                break;
            case 'np': return { sigla: 'Nublado e Pancadas de Chuva', imagem: 'chuva.png' }
                break;
            case 'pc': return { sigla: 'Pancadas de Chuva', imagem: 'chuva.png' }
                break;
            case 'pn': return { sigla: 'Parcialmente Nublado', imagem: 'nubladoParcialmente.png' }
                break;
            case 'cv': return { sigla: 'Chuvisco', imagem: 'chuva-nuvem.png' }
                break;
            case 'ch': return { sigla: 'Chuvoso', imagem: 'chuva.png' }
                break;
            case 't': return { sigla: 'Tempestade', imagem: 'chuva.png' }
                break;
            case 'ps': return { sigla: 'Predomínio de Sol', imagem: 'sol.png' }
                break;
            case 'e': return { sigla: 'Encoberto', imagem: 'nubladoParcialmente.png' }
                break;
            case 'n': return { sigla: 'Nublado', imagem: 'nubladoParcialmente.png' }
                break;
            case 'cl': return { sigla: 'Céu Claro', imagem: 'sol.png' }
                break;
            case 'nv': return { sigla: 'Nevoeiro', imagem: 'nubladoParcialmente.png' }
                break;
            case 'g': return { sigla: 'Geada', imagem: 'chuva-nuvem.png' }
                break;
            case 'ne': return { sigla: 'Neve', imagem: 'chuva-nuvem.png' }
                break;
            case 'nd': return { sigla: 'Não Definido', imagem: 'chuva-nuvem.png' }
                break;
            case 'pnt': return { sigla: 'Pancadas de Chuva a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'psc': return { sigla: 'Possibilidade de Chuva', imagem: 'chuva-nuvem.png' }
                break;
            case 'pcm': return { sigla: 'Possibilidade de Chuva pela Manhã', imagem: 'chuva-nuvem.png' }
                break;
            case 'pct': return { sigla: 'Possibilidade de Chuva a Tarde', imagem: 'chuva-nuvem.png' }
                break;
            case 'pcn': return { sigla: 'Possibilidade de Chuva a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'npt': return { sigla: 'Nublado com Pancadas a Tarde', imagem: 'chuva-nuvem.png' }
                break;
            case 'npn': return { sigla: 'Nublado com Pancadas a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'ncn': return { sigla: 'Nublado com Poss. de Chuva a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'nct': return { sigla: 'Nublado com Poss. de Chuva a Tarde', imagem: 'chuva-nuvem.png' }
                break;
            case 'ncm': return { sigla: 'Nubl. c/ Poss. de Chuva pela Manhã', imagem: 'chuva-nuvem.png' }
                break;
            case 'npm': return { sigla: 'Nublado com Pancadas pela Manhã', imagem: 'chuva-nuvem.png' }
                break;
            case 'npp': return { sigla: 'Nublado com Possibilidade de Chuva', imagem: 'chuva-nuvem.png' }
                break;
            case 'vn': return { sigla: 'Variação de Nebulosidade', imagem: 'chuva-nuvem.png' }
                break;
            case 'ct': return { sigla: 'Chuva a Tarde', imagem: 'chuva-nuvem.png' }
                break;
            case 'ppn': return { sigla: 'Poss. de Panc. de Chuva a Noite', imagem: 'chuva-nuvem.png' }
                break;
            case 'ppm': return { sigla: 'Poss. de Panc. de Chuva pela Manhã', imagem: 'chuva-nuvem.png' }
                break;
            default:
                return { sigla: 'Valor Ínvalido', imagem: 'chuva-nuvem.png' }
        }
    }

    diaSemana = (data) => {
        const dayName = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
        let now = new Date(data)
        return dayName[now.getDay()]
    }

    removeAcento(text) {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container >
                    <Paper elevation={1} className={classes.card}>
                        <Typography variant="h5" gutterBottom style={{color: 'white'}}>Previsão do Tempo</Typography>
                        <TextField
                            id="standard-search"
                            label="Cidade"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.cidadeForm}
                            InputProps={{
                                classes: {
                                    input: classes.multilineColor
                                }
                            }}
                            InputLabelProps={{ 
                                FormLabelClasses: {
                                    root: classes.labelRoot
                                  }                 
                            }}
                        />
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.procurarCidade}>
                            Procurar
                    </Button>
                    </Paper>
                </Grid>
                <br />
                <Grid container spacing={16} style={{ width: '100%', paddingBottom: 150 }}>
                    {this.renderCards(this.state.dias)}
                </Grid>
            </>
        )
    }
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content)