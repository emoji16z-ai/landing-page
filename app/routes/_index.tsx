import type { MetaFunction } from '@remix-run/node'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'

// 主题配置
interface Theme {
  title: string
  subtitle: string
  description: string
}

const EMOJI_THEMES: Record<string, Theme> = {
  'Alien Monster.webp': {
    title: 'Tech is Weird',
    subtitle: 'And We Love It',
    description: 'When was the last time you felt delightfully confused by technology?',
  },
  'Angry Face.gif': {
    title: 'Rage Against the Machine',
    subtitle: 'But Make it Fun',
    description: 'Channel your tech frustrations into something beautiful',
  },
  'Face Screaming in Fear.gif': {
    title: 'Embrace the Chaos',
    subtitle: 'It\'s Not a Bug, It\'s a Feature',
    description: 'Sometimes the scariest innovations lead to the biggest breakthroughs',
  },
  'Face With Rolling Eyes.gif': {
    title: 'Been There, Done That',
    subtitle: 'But Never Like This',
    description: 'Turning tech skepticism into endless possibilities',
  },
} as const

// 获取随机emoji和对应主题的函数
function getRandomTheme({ index }: { index?: number }) {
  const emojis = ['Alien Monster.webp', 'Angry Face.gif', 'Face Screaming in Fear.gif', 'Face With Rolling Eyes.gif'] as const
  const randomEmoji = emojis[index ?? Math.floor(Math.random() * emojis.length)]
  return {
    emoji: randomEmoji,
    theme: EMOJI_THEMES[randomEmoji],
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: 'emoji16z.ai' },
    { name: 'description', content: 'Tech is weird and we love it' },
  ]
}

export default function Index() {
  const { emoji, theme } = getRandomTheme({ index: 0 })
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <div className="px-16 py-8 font-mono">
      {/* 顶部导航 */}
      <nav className="mb-20 flex items-center justify-between">
        <div className="flex items-center gap-1 text-4xl">
          <img src={emoji} alt="Animated Emoji" width="48" height="48" />
          <span>.ai</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="i-ri-twitter-x-line text-2xl"></div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="font-mono">
        <h1 className="mb-4 text-4xl font-bold leading-[55.49px] tracking-[-2.48px]">{theme.title}</h1>
        <div className="mb-12 flex items-center gap-2 text-4xl font-bold leading-[55.49px] tracking-[-2.48px]">
          <span>{theme.subtitle}</span>
          <img src={emoji} alt="Animated Emoji" width="48" height="48" />
        </div>

        <p className="mb-8 text-xl text-gray-500">
          {theme.description}
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-xl bg-zinc-800 px-8 py-[24px] text-xl text-white hover:bg-zinc-700"
            >
              Join Waitlist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                Join the Waitlist
                <img src={emoji} alt="Animated Emoji" width="24" height="24" />
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-x-2">
              <div className="w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-full px-4 py-6 text-lg"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-4 rounded-full px-8"
                onClick={() => {
                  // 邮箱格式验证
                  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
                  if (!emailRegex.test(email)) {
                    toast.error('Please enter a valid email address')
                    return
                  }

                  toast.success('Email submitted successfully')
                  setOpen(false)
                }}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
