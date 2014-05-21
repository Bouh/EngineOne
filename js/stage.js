app.log_console === true ? console.log("Open -- stage.js") : false ;

app.stage = function(){
	
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	var light = new THREE.PointLight( "white",1,1000);
	light.position.set(10,0,0);
	scene.add( light );
	
	
	app.element = document.getElementById("mycanvas");

	app.element.requestPointerLock = app.element.requestPointerLock || app.element.mozRequestPointerLock || app.element.webkitRequestPointerLock;
	app.element.requestPointerLock();

	document.exitPointerLock = document.exitPointerLock ||	document.mozExitPointerLock ||	document.webkitExitPointerLock;
	document.exitPointerLock();
	
	
	var currentMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe:true });
	var sphere_geometry = new THREE.SphereGeometry( 50, 8, 8);
	mesh = new THREE.Mesh( sphere_geometry, currentMaterial );
	mesh.name = "sphereControls";
	scene.add(mesh);
	
	//plateforme1
	
	var plateformeShape = new CANNON.Box(new CANNON.Vec3(100, 10, 100));
	var plateformeBody = new CANNON.RigidBody(0,plateformeShape,physicsMaterial);
	//plateformeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
	plateformeBody.position.set(5,35,150);
	world.add(plateformeBody);
	console.log("---------" + plateformeBody);
	
	var currentMaterial = new THREE.MeshLambertMaterial({ color: "red", wireframe:false });
	var box_geometry = new THREE.BoxGeometry(  100*2, 10*2, 100*2 );
	mesh = new THREE.Mesh( box_geometry, currentMaterial );
	mesh.position.set(5,35,150);
	mesh.name = "monsol";
	scene.add(mesh);
	
	
	//plateforme2
	
	var plateformeShape = new CANNON.Box(new CANNON.Vec3(100, 10, 100));
	var plateformeBody = new CANNON.RigidBody(0,plateformeShape,physicsMaterial);
	//plateformeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
	plateformeBody.position.set(5,60,450);
	world.add(plateformeBody);
	
	var currentMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe:false });
	var box_geometry =  new THREE.BoxGeometry(  100*2, 10*2, 100*2 );
	mesh = new THREE.Mesh( box_geometry, currentMaterial );
	mesh.position.set(5,60,450);
	mesh.name = "monsol";
	scene.add(mesh);
};
