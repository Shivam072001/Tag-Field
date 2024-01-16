import * as React from 'react'

interface RemoveButtonProps {
  onRemove: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  className: string
  index: number
  ariaLabel: string
}

const crossStr = String.fromCharCode(215)

export function RemoveButton({
  onRemove,
  onKeyDown,
  className,
  ariaLabel,
}: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onRemove}
      onKeyDown={onKeyDown}
      className={className}
      aria-label={ariaLabel}
    >
      {crossStr}
    </button>
  )
}
