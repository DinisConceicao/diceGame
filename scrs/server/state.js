import { Card } from "../render/card.js";

export const manaFromDice = {
	1: "blue",
	2: "green",
	3: "darkorange",
	4: "purple",
	5: "red",
	6: "gold"
};

export class Game {
	constructor() {
		this.turn = 1;
		this.mana = {
			blue: 0,
			green: 0,
			darkorange: 0,
			purple: 0,
			red: 0,
			gold: 0,
		};
		this.nrolls = 2
		this.endturn = false;
	}

	nextTurn() {
		this.turn++;
		this.resetMana();
		this.nrolls = 2
		this.endturn = false;
		console.log(`turn > ${this.turn}`);
	}

	addMana(color) {
		if (!this.mana[color]) this.mana[color] = 0;
			this.mana[color] += 1;
	}

	canCastSpell(color, amount) {
		if (this.mana[color] >= amount)
			return true;
		return false;
	}

	resetMana() {
		for (const color in this.mana)
			this.mana[color] = 0;
	}

	playCard(c, ttaa) {
		const gimic = c.findGimic();
		switch (gimic) {
			// case 0:
				// break;
			case 1:
				freeze(c, ttaa);
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
		}
	}
}

function freeze(c, target) {
	let frozenletitgo = 0;
	while (frozenletitgo <= c.gimic) {
		const i = Math.floor(Math.random() * target.diceList.length);
		if (target.diceList[i].frozen === false) {
			target.diceList[i].mesh.material.forEach(m => m.color.set(0x7777ff));
			target.diceList[i].frozen = true;
			frozenletitgo++;
		}
	}
	target.takeDmg(c.damage);
}