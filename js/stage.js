app.log_console === true ? console.log("Open -- stage.js") : false ;

app.stage = function(){
	

	scene.add(app.createShadowedLight( 868, 900, 0, "white",1));
	
	/*
	var light = new THREE.DirectionalLight("white",1); // soft white light
	light.position.set(100,200,0);
	scene.add( light );
	
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	
	
	var light = new THREE.PointLight( "white",1,1000);
	light.position.set(10,0,0);
	scene.add( light );
	*/
	
	
	app.element = document.getElementById("mycanvas");

	app.element.requestPointerLock = app.element.requestPointerLock || app.element.mozRequestPointerLock || app.element.webkitRequestPointerLock;
	app.element.requestPointerLock();

	document.exitPointerLock = document.exitPointerLock ||	document.mozExitPointerLock ||	document.webkitExitPointerLock;
	document.exitPointerLock();
	
	
	var currentMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe:true });
	var sphere_geometry = new THREE.SphereGeometry( 25, 8, 8);
	mesh = new THREE.Mesh( sphere_geometry, currentMaterial );
	mesh.name = "sphereControls";
	scene.add(mesh);
	
	
	boxCollide(new CANNON.Vec3(100, 10, 100), new CANNON.Vec3(500, 10, 100), new CANNON.Vec3(0, 0, 0), "plateforme_remove");
	
	boxCollide(new CANNON.Vec3(100, 10, 100), new CANNON.Vec3(5, 35, 150), new CANNON.Vec3(-0.3, 0, 0), "plateforme_1");
	boxCollide(new CANNON.Vec3(100, 10, 100), new CANNON.Vec3(5, 60, 450), new CANNON.Vec3(0, 0, 0), "plateforme_2");
	
	boxCollide(new CANNON.Vec3(100, 100, 100), new CANNON.Vec3(395, 50, 450), new CANNON.Vec3(0, 0, 0), "mur");
	
	
	
};
