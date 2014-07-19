var THREEx = THREEx || {};


(function() {
    "use strict";

    THREEx.LaserCooked	= function(laserBeam){
	// for update loop
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)	;
		});
	};
	
	var object3d	= laserBeam.object3d;

	// build THREE.Sprite for impact
	var textureUrl	= THREEx.LaserCooked.baseURL+'images/blue_particle.jpg';
	var texture	= THREE.ImageUtils.loadTexture(textureUrl);
	var material	= new THREE.SpriteMaterial({
		map			: texture,
		blending		: THREE.AdditiveBlending,
		useScreenCoordinates	: false,
	});
	var sprite	= new THREE.Sprite(material);
	sprite.scale.set(1, 1, 1).multiplyScalar(2);
	sprite.position.x	= 1;
	object3d.add(sprite);

	// add a point light
	var light	= new THREE.PointLight( 0x4444ff, 10 );
	light.intensity	= 2;
	light.distance	= 4;
	light.position.x= -0.05;
	this.light	= light;
	sprite.add(light);

	// to exports last intersects
	this.lastIntersects	= [];

	var raycaster	= new THREE.Raycaster();
	// TODO assume object3d.position are worldPosition. works IFF attached to scene
	raycaster.ray.origin.copy(object3d.position);
        this.setTarget = function(target) {
            object3d.lookAt(target.position);
            var distance = object3d.position.distanceTo(target.position);
            object3d.scale.x = distance;
        };
    };

    THREEx.LaserCooked.baseURL	= '../';
})();
