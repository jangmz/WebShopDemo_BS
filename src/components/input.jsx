export default function Input ({ label, type, onChange }) {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input name={label} type={type} onChange={onChange}/>
        </div>
    )
}