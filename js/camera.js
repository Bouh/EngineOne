//ok
app.log_console === true ? console.log("Open -- camera.js") : false ;

app.camera = function(){

		app.log_console === true ? console.log("app.camera") : false ;
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
		//offset camera//
		camera.position.set(0,30,130);
		controls = new THREE.PointerLockControlsCannon(camera,sphereBody);
		scene.add( controls.getObject() );

};


