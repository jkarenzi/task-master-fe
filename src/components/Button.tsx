import ClipLoader from "react-spinners/ClipLoader";

interface buttonProps {
    width?: string,
    height?: string,
    radius?: string,
    color?: string,
    textColor?: string,
    textSize?: string,
    activeColor?:string,
    borderColor?:string,
    text: string,
    onClick?: () => void,
    disabled?: boolean,
    loader?: JSX.Element
}

const Button = ({width, height, radius, color, textColor, textSize, activeColor, borderColor, text, onClick, disabled, loader}: buttonProps) => {
    return (
        <button className={`flex items-center justify-center ${textSize?textSize:null} ${borderColor?`border border-${borderColor}`:'border-none'} outline-none ${width ? width :'w-full'} ${height ? height :'h-9'} ${radius ? radius :'rounded-md'} ${(disabled?(activeColor?activeColor:'bg-custom-activeBlue'):(color?color:'bg-custom-blue'))} ${textColor ? textColor :'text-white'}`} onClick={onClick} disabled={disabled}>
            {disabled?(loader?loader:<ClipLoader size='15' color="#ffffff"/>):text}
        </button>
    );
}

export default Button;