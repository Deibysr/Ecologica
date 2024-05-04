/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                "ecologica-primary": "#246876",
                "ecologica-secondary": "#9cc824"
            }
        },
    },
    plugins: [typography],
}