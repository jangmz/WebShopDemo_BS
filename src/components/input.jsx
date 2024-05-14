export default function Input ({ label, type }) {
    return (
        <div className="input-field">
            <label for={label}>{label}</label>
            <input name={label} type={type} />
        </div>
    )
}