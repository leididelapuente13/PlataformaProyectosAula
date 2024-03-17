import {PropTypes} from 'prop-types';

export const PopUpError = ({message}) => {
  return (
    <div style={opacityStyles}>
        <div style={container}>
            <p>{message}</p>
            <p>Ha ocurrido un error, intentalo de nuevo</p>
        </div>
    </div>
  )
}

const opacityStyles = {
    width: "100%",
    height: "100vh",
    position: "absolute",
    opacity: "0.8",
    backgroundColor: "grey",
    display: "flex", 
    justifyContent: "center"
    // backgroundColor: "ghostWhite",
    // borderLeft: "solid 10px red",
}

const container = {
    width: "80%", 
    maxWidth: "300px",
    borderRadius: "5px",
    backgroundColor: "#fff", 
    fontSize: "0.8rem",
    opacity: "1", 
    margin: "auto",
    padding: "2rem",
}

PopUpError.propTypes= {
    message: PropTypes.string.isRequired
}