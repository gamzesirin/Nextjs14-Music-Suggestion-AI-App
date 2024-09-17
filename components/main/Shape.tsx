'use client'

import React from 'react'

const Shape = ({ shape, style }: any) => {
	switch (shape) {
		case 'circle':
			return <div className="rounded-full" style={style} />
		case 'square':
			return <div style={style} />
		case 'triangle':
			return (
				<div
					style={{
						...style,
						width: 0,
						height: 0,
						borderLeft: `${style.width / 2}px solid transparent`,
						borderRight: `${style.width / 2}px solid transparent`,
						borderBottom: `${style.height}px solid rgba(0, 0, 255, 0.1)`,
						background: 'none'
					}}
				/>
			)
		case 'diamond':
			return (
				<div
					style={{
						...style,
						transform: 'rotate(45deg)'
					}}
				/>
			)
		default:
			return null
	}
}

export default Shape
