import React from 'react';
import classnames from 'classnames';

const FormGroup = ({name, label, type, placeholder, value, onChange, error}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   name={name}
                   className={classnames("form-control",{"is-invalid": error})}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}/>
            <div className="invalid-feedback">{error}</div>
        </div>
    )
};

FormGroup.defaultProps = {
    type: 'text'
}

export default FormGroup;
