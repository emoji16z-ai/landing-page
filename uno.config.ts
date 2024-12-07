import presetAttributify from 'unocss/preset-attributify'
import presetUno from 'unocss/preset-uno'
import presetWebFonts from 'unocss/preset-web-fonts'
import { defineConfig, presetIcons, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        emojione: () => import('@iconify-json/emojione/icons.json').then(i => i.default),
        ri: () => import('@iconify-json/ri/icons.json').then(i => i.default),
      }
    }),
    presetAttributify(),
    presetShadcn({
      color: 'slate',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: {
          name: 'JetBrains Mono',
          weights: [400, 700],
        }
      },
    }),
  ],
  transformers: [
    transformerAttributifyJsx(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    },
  },
})
