import classNames from 'classnames';

const IconButton = ({ variant = 'base', color = 'secondary', disabled = false, className, children, ...props }) => {
   const BUTTON_VARIANTS = {
      base: classNames('flex items-center justify-center rounded-lg p-2 font-medium', {
         'bg-skin-primary-inverted text-skin-primary hover:bg-skin-primary hover:text-skin-primary-inverted': color === 'primary' && !disabled,
         'bg-skin-primary-inverted text-skin-secondary hover:bg-skin-secondary hover:text-skin-secondary-inverted': color !== 'primary' && !disabled,
         'bg-skin-disabled text-skin-muted cursor-not-allowed': disabled,
         'cursor-pointer transition duration-200': !disabled,
      }),
   };

   return (
      <button onClick={disabled ? undefined : () => console.log('Icon on click!')} className={classNames(BUTTON_VARIANTS[variant], className)} disabled={disabled} {...props}>
         {children}
      </button>
   );
};

export default IconButton;
