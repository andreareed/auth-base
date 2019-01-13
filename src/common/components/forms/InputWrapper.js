import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputWrapper = props => {
  const wrapperClasses = classNames('input-wrapper', props.className);
  const labelClasses = classNames({
    'input-wrapper__disabled': props.disabled,
    'input-wrapper__validation': !!props.validation,
  });

  return (
    <div className={wrapperClasses}>
      <label className={labelClasses}>
        {props.label ? <span className="input-wrapper__label">{props.label}</span> : null}
      </label>
      <div className="input-scaffold__children">{props.children}</div>
      {props.helperText ? (
        <div className="input-scaffold__helper-text">{props.helperText}</div>
      ) : null}
      {props.validation ? <div className="input-validation">{props.validation}</div> : null}
    </div>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  validation: PropTypes.any,
  helperText: PropTypes.string,
};

InputWrapper.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  label: null,
  validation: null,
  helperText: null,
};

export default InputWrapper;
