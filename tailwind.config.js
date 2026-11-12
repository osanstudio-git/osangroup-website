/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        osan: {
          blue: '#2473AB',
          grey: '#595959',
          light: '#F7F7F7',
          deep: '#1B5683',
          sky: '#E4EEF6',
          ink: '#2B2B2B',
          surface: '#F8FAFC',
          border: 'rgba(36, 115, 171, 0.12)',
        },
        company: {
          osbic: '#2A93D5',
          maisarah: '#8F1D38',
          nameer: '#0E544A',
          omca: '#6F182A',
          studio: '#2E4960',
          studioAccent: '#EA580C',
          asas: '#A88836',
          masar: '#0095A8',
          amerRed: '#D62828',
          amerGreen: '#1B7340',
          tamkeen: '#234338',
          misk: '#514E45',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Tajawal', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'signature-tl': '72px 8px 8px 8px',
        'signature-tr': '8px 72px 8px 8px',
        'signature-bl': '8px 8px 8px 72px',
        'signature-br': '8px 8px 72px 8px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(36, 115, 171, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(36, 115, 171, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px 0 rgba(36, 115, 171, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

