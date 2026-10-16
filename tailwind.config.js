/**
 * Tailwind CSS Theme Configuration
 * Palette: Near-black charcoal, warm white, neutral grey, electric lime
 */
tailwind.config = {
      theme: {
        extend: {
          colors: {
            charcoal: {
              950: '#0A0B0D',
              900: '#101216',
              850: '#15181E',
              800: '#1B1F27',
              700: '#262B36'
            },
            warm: {
              50: '#F4F3EF',
              100: '#E6E4DD',
              300: '#9A9AA2',
              400: '#6E707A'
            },
            lime: {
              DEFAULT: '#D4FF33',
              dim: '#B8E619',
              muted: 'rgba(212, 255, 51, 0.12)'
            }
          },
          fontFamily: {
            display: ['"Space Grotesk"', 'sans-serif'],
            sans: ['"Inter"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          }
        }
      }
    };
