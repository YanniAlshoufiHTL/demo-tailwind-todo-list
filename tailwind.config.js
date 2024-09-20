import { addDynamicIconSelectors } from '@iconify/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{html,ts}'],
    theme: {
        extend: {},
    },
    plugins: [addDynamicIconSelectors()],
};
