import * as THREE from 'three';

export class HealthBar {
	constructor(scene, maxhp, x, y) {
        this.maxhp = maxhp;
        this.hp = maxhp

		const gbthbg = new THREE.PlaneGeometry(4, 1);
		const gbthmt = new THREE.MeshBasicMaterial({ color: 0x333333});
		this.greybar = new THREE.Mesh(gbthbg, gbthmt);
		this.greybar.position.set(x, y, 0);
		scene.add(this.greybar);

		const hlthbg = new THREE.PlaneGeometry(4, 1);
		const hlthmt = new THREE.MeshBasicMaterial({ color: 0xff0000});
		this.hlthbar = new THREE.Mesh(hlthbg, hlthmt);
		this.hlthbar.position.set(x, y, 0.1);
		scene.add(this.hlthbar);		
	}

	newHealth(newh) {
		this.hp = newh;
		const arigato = Math.max(0, newh / this.maxhp);
		this.hlthbar.scale.x = arigato;
		const maxwidth = 4;
		this.hlthbar.position.x = this.greybar.position.x - (maxwidth * (1 - arigato)) / 2;
	}
}