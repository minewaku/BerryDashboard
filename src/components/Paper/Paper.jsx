import React from 'react';
import classNames from 'classnames';

const Paper = ({ className, children }) => {
    return (
        <div className={classNames('shadow-paper-elevation-1 rounded-md', className)}>
            {children}
        </div>
    );
};

export default Paper;
