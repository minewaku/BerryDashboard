import React from 'react';
import MaterialUITextField from '@mui/material/TextField';

const TextField = ({ variant = 'outlined', color = 'secondary', ...props }) => {
    const themeColor = color === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)';
    return (
        <MaterialUITextField
            variant={variant}
            sx={{
                // Base styles
                '& .MuiOutlinedInput-root': {
                    '& input': {
                        color: 'var(--color-text)',
                        backgroundColor: 'var(--color-bg-search)',
                        borderRadius: '4px',
                    },
                    '& fieldset': {
                        borderColor: 'var(--color-border)',
                        borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                        borderColor: themeColor,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: themeColor,
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'var(--color-text)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: themeColor,
                },

                // Disabled styles
                '& .MuiOutlinedInput-root.Mui-disabled': {
                    '& input': {
                        color: 'var(--color-text-muted)',
                    },
                    '& fieldset': {
                        borderColor: 'var(--color-muted-border)',
                    },
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                    color: 'var(--color-text-muted)',
                },

                // Error styles
                '& .MuiOutlinedInput-root.Mui-error': {
                    '& input': {
                        color: 'var(--color-error)', // Text color for error
                    },
                    '& fieldset': {
                        borderColor: 'var(--color-error)', // Border color for error
                    },
                },
                '& .MuiInputLabel-root.Mui-error': {
                    color: 'var(--color-error)', // Label color for error
                },
            }}
            {...props}
        />
    );
};

export default TextField;
