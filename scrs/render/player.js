import * as THREE from 'three';
import { HealthBar } from './healthbar.js';
import { AllCards } from './card.js';

export const Targets = {
    all: ['targetLeft', 'targetFront', 'targetRight'],
    self: ['targetSelf'],
    player: ['targetLeft', 'targetFront', 'targetRight'],
    trueall: ['targetLeft', 'targetFront', 'targetRight', 'targetSelf']
};

export class Player {
	constructor(scene, dices, cards) {
		this.diceList = dices;
		this.scene = scene;
		this.hand = cards;
		this.hp = new HealthBar(this.scene, 50, 0, 6);
		this.health = this.hp.hp;
		this.dropzones = {
			targetLeft: { minX: -25, maxX: -10, minY: -15, maxY: 15, label: 'targetLeft' },
			targetFront: { minX: -8, maxX: 8, minY: 2, maxY: 15, label: 'targetFront' },
			targetRight: { minX: 10, maxX: 25, minY: -15, maxY: 15, label: 'targetRight' },
			targetSelf: { minX: -8, maxX: 8, minY: -15, maxY: -2, label: 'targetSelf' },
		};
		this.dropZonesGraphic = {};
			
		for (const one in this.dropzones) {
			const z = this.dropzones[one];
			const width = z.maxX - z.minX;
			const height = z.maxY - z.minY;

			const geometry = new THREE.PlaneGeometry(width, height);
			const material = new THREE.MeshBasicMaterial({
				side: 2,
				opacity: 0.2,
				transparent: true,
				color: 0xffffff,
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = (z.minX + z.maxX) / 2;
			mesh.position.y = (z.minY + z.maxY) / 2;
			mesh.position.z = -0.1;
			mesh.visible = false;
			scene.add(mesh);
			mesh.visible = false;
			this.dropZonesGraphic[one] = mesh;
		}
	}

	printMana() {
		console.log(this.mana);
	}

	dropCard(x, y) {
		for (const zone of Object.values(this.dropzones)) {
			if (x >= zone.minX && x <= zone.maxX && y >= zone.minY && y <= zone.maxY) {
				return zone.label;
			}
		}
		return null;
	}

	takeDmg(amount) {
		this.health = Math.max(0, this.health - amount);
		this.hp.newHealth(this.health);
	}

	gainHp(amount) {
		this.health = Math.min(this.hp.maxhp, this.health + amount);
		this.hp.newHealth(this.health);
	}

	newhand() {
		const notrep = {};
		for (let i = 0; i < 6; i++) {
			let theid;
			do {
				theid = Math.floor(Math.random() * AllCards.length) + 1;
			} while (Object.values(notrep).includes(theid));
			notrep[i] = theid;
			this.hand[i].newcard(theid);
		}
	}
}
