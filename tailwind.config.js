/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                skin: {
                    base: 'var(--color-bg-base)',
                    layout: 'var(--color-bg-layout)',
                    search: 'var(--color-bg-search)',
                },
            },
            borderColor: {
                skin: {
                    DEFAULT: 'var(--color-border)',
                },
            },
            textColor: {
                skin: {
                    DEFAULT: 'var(--color-text)',
                    base: 'var(--color-text-base)',
                    accent: 'var(--color-text-accent)',
                    muted: 'var(--color-text-muted)',
                },
            },
            colors: {
                skin: {
                    primary: {
                        DEFAULT: 'var(--color-primary)',
                        inverted: 'var(--color-primary-inverted)',
                    },
                    secondary: {
                        DEFAULT: 'var(--color-secondary)',
                        inverted: 'var(--color-secondary-inverted)',
                    },
                    success: 'var(--color-success)',
                    warning: 'var(--color-warning)',
                    error: 'var(--color-error)',
                    disabled: 'var(--color-disabled)',
                    scrollbar: {
                        DEFAULT: 'var(--color-scrollbar)',
                        hover: 'var(--color-scrollbar-hover)',
                    },
                    utility: {
                        DEFAULT: 'var(--color-utility)',
                        dark: 'var(--color-utility-dark)',
                        logo: 'var(--color-utility-logo)',
                        'icon-search': 'var(--color-utility-icon-search)',
                        'text-search': 'var(--color-utility-text-search)',
                    },
                },
            },
            boxShadow: {
                button: 'var(--shadow-button)',
                'button-hover': 'var(--shadow-button-hover)',
                'inner-focus': 'var(--shadow-inner-focus)',
                'paper-elevation-1': 'var(--shadow-paper-elevation-1)',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss'],
    darkMode: 'class',
};
