import * as THREE from 'three';
import { Dice } from './render/dice.js';
import { Card } from './render/card.js';
import { Player } from './render/player.js';
import { Game, manaFromDice } from './server/state.js';
import { Input } from './input.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('game-canvas')
});
renderer.setSize(window.innerWidth, window.innerHeight);

// const cloader = new THREE.CubeTextureLoader();
// const text = cloader.load([
// 	'./textures/back.jpg',
// 	'./textures/back.jpg',
// 	'./textures/back.jpg',
// 	'./textures/back.jpg',
// 	'./textures/back.jpg',
// 	'./textures/back.jpg'
// ]);
// scene.background = text;

const game = new Game();

const diceList = [
	new Dice(scene, 4, -3, 0),
	new Dice(scene, 2, -3, 0),
	new Dice(scene, 0, -3, 0),
	new Dice(scene, -2, -3, 0),
	new Dice(scene, -4, -3, 0),
];

const handSize = 6;
const spacing = 4;
const hand = Array.from({ length: handSize }, (_, i) => {
	const x = (i - (handSize - 1) / 2) * spacing;
	return new Card(scene, x, -8, 0);
});

diceList.forEach(d => game.addMana(manaFromDice[d.result]));

const player = new Player(scene, diceList, hand);
player.newhand();
updateCardDisplay();

const input = new Input(
	camera, diceList, hand, player, game
);

const turnDisplay = document.createElement('Turn');
turnDisplay.innerText = `Turn: ${game.turn}`;
document.body.appendChild(turnDisplay);

const nextturnbutton = document.createElement('nextturnbutton');
nextturnbutton.innerText = 'Next turn';
nextturnbutton.addEventListener('click', () => {
	if (diceList.some(d => d.rolling)) return;
	game.nextTurn();
	diceList.forEach((d) => {
		d.locked = false;
		d.frozen = false;
		d.mesh.material.forEach(m => m.color.set(0xffffff));
		d.randomizeFace();
		game.addMana(manaFromDice[d.result]);
	});
	player.newhand();
	updateRollDisplay();
	updateCardDisplay();
	turnDisplay.innerText = `Turn: ${game.turn}`;
});
document.body.appendChild(nextturnbutton);

const rollbutton = document.createElement('rollbutton');
rollbutton.addEventListener('click', () => {
	if (diceList.some(d => d.rolling)) return;
	if (game.nrolls === 0) return;
	rollbutton.style.display = 'none';
	let results = [];
	diceList.forEach(d => {
		d.roll((result) => {
			results.push(result);
			if (results.length === diceList.length) {
				game.resetMana();
				diceList.forEach(d => game.addMana(manaFromDice[d.result]));
				game.nrolls--;
				updateRollDisplay();
				updateCardDisplay();
			}
		})
	});
});
document.body.appendChild(rollbutton);
updateRollDisplay();

function updateCardDisplay() {
	hand.forEach(c => {
		const cancan = game.canCastSpell(c.color, c.cost);
		c.setToPlay(cancan);
		c.mesh.position.set(c.originalX, c.originalY, 0);
		c.update();
	});
}

function updateRollDisplay() {
	if (game.nrolls === 0) {
		rollbutton.style.display = 'none';
		return ;
	}
	rollbutton.innerText = `${game.nrolls} Roll`;
	rollbutton.style.display = 'flex';
}

function animate() {
	requestAnimationFrame(animate);
	diceList.forEach(d => d.update());
	hand.forEach(c => c.update());
	renderer.render(scene, camera);
}
animate();

// tenho q fazer tudo o q teja na tela relativo a camara do player e nao coordenadas brute forced