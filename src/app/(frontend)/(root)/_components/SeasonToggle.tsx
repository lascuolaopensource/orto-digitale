import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Season = 'estate' | 'inverno'

interface SeasonToggleProps {
  season: Season
  onToggle: () => void
}

export function SeasonToggle({ season, onToggle }: SeasonToggleProps) {
  const [showLabel, setShowLabel] = useState(false)

  const handleClick = () => {
    onToggle()
    setShowLabel(true)
    setTimeout(() => setShowLabel(false), 2000)
  }

  return (
    <div className="absolute top-4 right-4 z-10">
      <motion.button
        onClick={handleClick}
        className="relative w-[90px] h-[44px] rounded-full p-1 cursor-pointer"
        style={{
          background:
            season === 'estate'
              ? 'linear-gradient(135deg, #FFB347, #FFAA33)'
              : 'linear-gradient(135deg, #A1C4FD, #90CAF9)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}
      >
        {/* Sliding circle with icon */}
        <motion.div
          className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-lg"
          animate={{
            x: season === 'estate' ? 46 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          <motion.div
            key={season}
            initial={{ scale: 0.5, rotate: 0 }}
            animate={{ scale: 1, rotate: season === 'estate' ? 360 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            {season === 'estate' ? '☀️' : '❄️'}
          </motion.div>
        </motion.div>

        {/* Labels */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 pointer-events-none text-[10px] font-semibold">
          <motion.span
            animate={{ opacity: season === 'inverno' ? 1 : 0.3 }}
            className="text-white ml-7"
          ></motion.span>
          <motion.span
            animate={{ opacity: season === 'estate' ? 1 : 0.3 }}
            className="text-white mr-7"
          ></motion.span>
        </div>
      </motion.button>

      {/* Popup Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium"
            style={{
              color: season === 'estate' ? '#FFB347' : '#90CAF9',
            }}
          >
            {season === 'estate' ? 'Estate' : 'Inverno'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
