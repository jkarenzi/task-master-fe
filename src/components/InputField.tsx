interface inputProps {
    id:string,
    type: string,
    placeholder: string,
    width?:string,
    height?:string,
    textColor?:string,
    outlineColor?:string,
    error?:boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    value?: string | number
}

const InputField = ({id, type, placeholder, width, height, textColor, outlineColor, error, onChange, onBlur, value}: inputProps) => {
    return (
        <input id={id} type={type} placeholder={placeholder} className={`pl-2 outline-none ${width?width:'w-full'} ${height?height:'h-9'} border ${error?'border-red-500':'border-custom-borderGrey'} rounded-md bg-transparent ${textColor? textColor: 'text-white'} ${outlineColor? `focus:${outlineColor}`: 'focus:border-custom-blue'}`} onChange={onChange} onBlur={onBlur} value={value}/>
    );
}
 
export default InputField;