import classNames from 'classnames';
import { memo } from 'react';

const Button = ({ variant = 'base', color = 'primary', disabled = false, className, children, ...props }) => {
    const VARIANTS = {
        base: classNames('flex items-center justify-center rounded px-4 py-3 font-medium w-fit h-fit', {
            'bg-skin-primary text-skin-primary-inverted': color === 'primary' && !disabled,
            'bg-skin-secondary text-skin-secondary-inverted': color !== 'primary' && !disabled,
            'bg-skin-disabled text-skin-muted cursor-not-allowed': disabled,
            'cursor-pointer transition duration-300 shadow-button hover:shadow-button-hover': !disabled,
        }),
        chip: classNames('flex w-fit flex-row items-center rounded-full px-4 py-1 transition duration-200 w-fit h-fit', {
            'bg-skin-primary-inverted text-skin-primary hover:bg-skin-primary hover:text-skin-primary-inverted': color === 'primary' && !disabled,
            'bg-skin-secondary-inverted text-skin-secondary hover:bg-skin-secondary hover:text-skin-secondary-inverted': color !== 'primary' && !disabled,
            'bg-skin-disabled text-skin-muted cursor-not-allowed': disabled,
        }),
        transition: classNames('flex items-center justify-center rounded-md px-4 py-3 font-medium duration-300 w-fit h-fit', {
            'bg-skin-primary text-skin-primary-inverted hover:bg-skin-secondary hover:text-skin-secondary-inverted': color === 'primary' && !disabled,
            'bg-skin-secondary text-skin-secondary-inverted hover:bg-skin-primary hover:text-skin-primary-inverted': color !== 'primary' && !disabled,
            'bg-skin-disabled text-skin-muted cursor-not-allowed': disabled,
            'shadow-button hover:shadow-button-hover': !disabled,
        }),
        outlined: classNames('flex items-center justify-center rounded border-[2px] px-4 py-3 font-medium duration-300 w-fit h-fit', {
            'text-skin-primary border-skin-primary-inverted hover:bg-skin-primary-inverted hover:border-skin-primary': color === 'primary' && !disabled,
            'text-skin-secondary border-skin-secondary-inverted hover:bg-skin-secondary-inverted hover:border-skin-secondary': color !== 'primary' && !disabled,
            'text-skin-muted border-skin-disabled cursor-not-allowed': disabled,
        }),
    };

    return (
        <button onClick={() => {console.log("button clicked")}} className={classNames(VARIANTS[variant], className)} {...props}>
            {children}
        </button>
    );
};

export default memo(Button);
