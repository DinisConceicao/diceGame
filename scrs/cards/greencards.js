function windDamage(min, max) {
	return Math.floor(Math.random() * max) + min 
}

export const GreenCards = [
	{ id: 5, name: 'Gust', cost: 1, damage: () => windDamage(2,4), color: 'green', target: 'player'},
	{ id: 6, name: 'Gust', cost: 2, damage: () => windDamage(2,4), color: 'green', target: 'player'},
	{ id: 7, name: 'Gust', cost: 3, damage: () => windDamage(2,4), color: 'green', target: 'player'},
	{ id: 8, name: 'Gust', cost: 4, damage: () => windDamage(2,4), color: 'green', target: 'player'},
]