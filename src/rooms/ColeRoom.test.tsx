import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ColeRoom } from './ColeRoom'
import type { ColeProgress } from '../hooks/useProgress'

beforeEach(() => {
  vi.useFakeTimers()
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

const renderRoom = (saved: ColeProgress = { hugComplete: false, heartIds: [] }, easterEggSignal = 0) => {
  const onSave = vi.fn()
  const view = render(<ColeRoom onComplete={vi.fn()} play={vi.fn()} saved={saved} onSave={onSave} easterEggSignal={easterEggSignal}/>)
  return { ...view, onSave }
}

describe("Cole's Cozy Corner", () => {
  it('counts each floating heart once and removes it after collection', () => {
    const { onSave } = renderRoom()
    const first = screen.getByRole('button', { name: 'Collect floating heart 1' })
    fireEvent.click(first)
    fireEvent.click(first)
    expect(screen.getByText(/Hearts: 1\/3/)).toBeInTheDocument()
    expect(first).not.toBeInTheDocument()
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenLastCalledWith({ hugComplete: false, heartIds: ['rose'] })
  })

  it('runs the hug state machine once and keeps the final pose', () => {
    renderRoom()
    const button = screen.getByRole('button', { name: 'Make the rats hug' })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: 'Cuddle in progress…' })).toBeDisabled()
    expect(document.querySelector('[data-hug-phase="approaching"]')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1150))
    expect(screen.getByRole('button', { name: "Aww, they're hugging!" })).toBeDisabled()
    expect(document.querySelector('[data-hug-phase="hugging"]')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: "Aww, they're hugging!" }))
    expect(document.querySelector('[data-hug-phase="hugging"]')).toBeInTheDocument()
  })

  it('restores completed hug and unique heart progress', () => {
    renderRoom({ hugComplete: true, heartIds: ['rose', 'peach', 'berry'] })
    expect(screen.getByRole('button', { name: "Aww, they're hugging!" })).toBeDisabled()
    expect(screen.getByText(/Hug: complete · Hearts: 3\/3/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Collect the second heart' })).toBeEnabled()
  })

  it.each([
    ['Hold paws', 'Connected paws'],
    ['Exchange flower', 'Cole blush reaction'],
    ['Share cheese', 'Shared cheese pieces'],
    ['Fall asleep', 'Sleeping marks'],
  ])('renders and clears the %s visual interaction', (buttonName, visualName) => {
    renderRoom({ hugComplete: true, heartIds: [] })
    fireEvent.click(screen.getByRole('button', { name: buttonName }))
    expect(screen.getByLabelText(visualName)).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(2200))
    expect(screen.queryByLabelText(visualName)).not.toBeInTheDocument()
    expect(document.querySelector('[data-hug-phase="hugging"]')).toBeInTheDocument()
  })

  it('turns the Easter egg into a visible Cole reaction', () => {
    const { rerender } = renderRoom({ hugComplete: true, heartIds: [] }, 0)
    rerender(<ColeRoom onComplete={vi.fn()} play={vi.fn()} saved={{ hugComplete: true, heartIds: [] }} onSave={vi.fn()} easterEggSignal={1}/>)
    expect(screen.getByLabelText('Cole blush reaction')).toBeInTheDocument()
  })
})
