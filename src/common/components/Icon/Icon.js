import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = props => {
  const IconComponent = require(`./icons/${props.icon}`).default;

  return (
    <span className={classNames(['icon', props.className])}>
      <IconComponent />
    </span>
  );
}

Icon.displayName = 'Icon';
Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Icon.defaultProps = {
  className: null,
};

export default Icon;
