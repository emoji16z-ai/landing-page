import type { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'
import{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { useState } from 'react'

// 主题配置
type Theme = {
  title: string
  subtitle: string
  description: string
  buttonText: string
  dialogTitle: string
}

const DIGITAL_IMMORTALITY_THEMES: Record<string, Theme> = {
  'ai16z-chan.png': {
    title: 'Digital Immortality',
    subtitle: 'Your Story, Forever Digital',
    description: 'Transform your consciousness into eternal digital existence. Join the next evolution of human experience.',
    buttonText: 'Begin Your Digital Journey',
    dialogTitle: 'Reserve Your Digital Future'
  },
  'ai16z-virtual.png': {
    title: 'Beyond Reality',
    subtitle: 'Where Humanity Meets Infinity',
    description: 'Experience a world where your thoughts, memories, and dreams live on in the digital realm.',
    buttonText: 'Enter the Virtual Eternal',
    dialogTitle: 'Start Your Transformation'
  },
  'ai16z-future.png': {
    title: 'Eternal Digital Life',
    subtitle: 'Transcend the Physical',
    description: 'Join the revolution of consciousness. Your mind, preserved forever in the digital universe.',
    buttonText: 'Embrace Eternity',
    dialogTitle: 'Begin Your Digital Legacy'
  }
} as const

function getRandomTheme({index}: {index?: number}) {
  const themes = Object.keys(DIGITAL_IMMORTALITY_THEMES)
  const selectedTheme = themes[index ?? Math.floor(Math.random() * themes.length)]
  return {
    image: selectedTheme,
    theme: DIGITAL_IMMORTALITY_THEMES[selectedTheme]
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Digital Immortality - ai16z' },
    { name: 'description', content: 'Transform your consciousness into eternal digital existence' },
  ]
}

export default function Index() {
  const { image, theme } = getRandomTheme({index: 0})
  const [email, setEmail] = useState('')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-16 py-8 font-cute">
      {/* 顶部导航 */}
      <nav className="flex justify-between items-center mb-20">
        <div className="flex items-center gap-1 text-4xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">ai16z</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-purple-400">_immortality</span>
          <div className="i-ri-twitter-x-line text-2xl"></div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-2xl relative">
        <div className="absolute right-[-500px] top-[-100px] w-[600px] h-[600px] opacity-90">
          <img src="/images/anime-girl.jpg" alt="Digital Avatar" className="w-full h-full object-contain" />
        </div>
        
        <h1 className="text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
          {theme.title}
        </h1>
        <div className="text-4xl mb-12 text-purple-300">
          {theme.subtitle}
        </div>
        
        <p className="text-xl mb-12 text-purple-200 max-w-lg">
          {theme.description}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl hover:opacity-90 rounded-full px-8 py-[24px] shadow-lg shadow-purple-500/30"
            >
              {theme.buttonText}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-purple-950 to-black text-white border-purple-800">
            <DialogHeader>
              <DialogTitle className="text-xl text-purple-300">
                {theme.dialogTitle}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  type="email"
                  placeholder="Your email for digital transcendence"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-4 py-6 text-lg bg-purple-900/50 border-purple-700 text-purple-200 placeholder:text-purple-400"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              >
                Begin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
