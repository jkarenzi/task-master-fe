interface inputProps {
    id:string,
    type: string,
    placeholder: string,
    defaultValue?:string|number|undefined
    width?:string,
    height?:string,
    textColor?:string,
    outlineColor?:string,
    error?:boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    value?: string | number,
    editMode?:boolean
}

const InputField = ({id, type, placeholder, defaultValue, width, height, textColor, outlineColor, error, onChange, onBlur, value, editMode=true}: inputProps) => {
    return (
        <input id={id} type={type} placeholder={placeholder} defaultValue={defaultValue} readOnly={!editMode} className={`pl-2 outline-none ${width?width:'w-full'} ${height?height:'h-9'} border ${error && editMode?'border-red-500':'border-custom-borderGrey'} rounded-md bg-transparent ${textColor? textColor: !editMode?'text-custom-borderGrey':'text-white'} ${outlineColor? `focus:${outlineColor}`: 'focus:border-custom-blue'}`} onChange={onChange} onBlur={onBlur} value={value}/>
    );
}

export default InputField;