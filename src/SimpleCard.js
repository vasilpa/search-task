import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const SimpleCard = props => {
    console.log(props.networkErr);
    return (
        <div className="simple-card">
            {props.counter > 0 ? <Card >
                <CardContent>
                    <Typography variant="h5" component="h2">{props.counter}</Typography>
                </CardContent>
            </Card> : <Card >
                <CardContent>
                        <Typography variant="h5" component="h2">{props.displaySelectedCountry[0].name}</Typography>
                        <Typography color="textSecondary">capital: {props.displaySelectedCountry[0].capital}</Typography>
                        <Typography variant="body2" component="p">population: {props.displaySelectedCountry[0].population}</Typography>
                </CardContent>
            </Card>}
        </div>
    );
}
export default SimpleCard;