/*
	this = app
	this.camera();  -- from camera.js
	all is Y-UP
*/
console.log("Open -- init.js");

//Listing de toutes les images
var add_images = new Array();

var app = {
	
	friction : 1,
	time : "0:0:0",
	raycaster : new THREE.Raycaster(),
	
	shadow_opacity : 0.5,
	clock : new THREE.Clock(),
//	delta : app.clock.getDelta(),
	objectsCollider : [],
	cameraIsNotFree : false,
	src_load : 0,
	total_src_toload : 0,
	control_move : null,
	log_console : true,
	havePointerLock : 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document,
	
	

	duff : function() {
	},
	
	motion : function() {
	},
	
	activePointerLock : function(){
		if(app.havePointerLock){

			var element = document.body;
				var pointerlockchange = function (event){

					if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element){
						controls.enabled = true;
					}else{
						controls.enabled = false;
					}
				}
			var pointerlockerror = function (event){
				//nothing
			}

			// Hook pointer lock state change events
			document.addEventListener( 'pointerlockchange', pointerlockchange, false );
			document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
			document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

			document.addEventListener( 'pointerlockerror', pointerlockerror, false );
			document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
			document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

			window.addEventListener( 'click', function ( event ) {

				// Ask the browser to lock the pointer
				element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
				element.requestPointerLock();
			}, false );
			
			return true;
			
		}else{
			instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
			return false;
		}
	},

	init_scene : function(){
	
		this.log_console === true ? console.log("app.init_scene") : false ;
		scene = new THREE.Scene();
		this.camera();
		this.render();
	},
	
	
	createShadowedLight : function( x, y, z, color, intensity ) {
		var directional_light = new THREE.DirectionalLight( color, intensity );
		directional_light.position.set( x, y, z );
		directional_light.castShadow = true;

		/* Parameters for shadow casting */
		var d = 1000;
		directional_light.shadowCameraLeft   = -d;
		directional_light.shadowCameraRight  =  d;
		directional_light.shadowCameraTop    =  d;
		directional_light.shadowCameraBottom = -d;

		directional_light.shadowCameraNear 	= 0.01;
		directional_light.shadowCameraFar 	= 5000;

		directional_light.shadowMapWidth 	= 1024*2;
		directional_light.shadowMapHeight 	= 1024*2;
		
		return directional_light;
	},

	
	Shadow : function() {
		
		renderer.shadowMapEnabled  = true;
		
		for(var i=0;i<scene.children.length;i++){
			if(scene.children[i] instanceof THREE.Mesh){
				scene.children[i].castShadow = true;
				scene.children[i].receiveShadow = true;
			}
			
			if(scene.children[i] instanceof THREE.DirectionalLight || scene.children[i] instanceof THREE.SpotLight ){
				scene.children[i].shadowDarkness = app.shadow_opacity;
				//debug
				scene.children[i].shadowCameraVisible = true;
			}
		}
		log( "Shadow", "OK", "green", "white")
	},
	
	complete : function() {
		if(src_load == total_src_toload){
			//debut du jeu possible.
		}
	},
	
	load_script : function(link,type,noajax) {
		app.total_src_toload ++;
		if(noajax){
			var balise = document.createElement("script");
			balise.rel = type;
			balise.src = link;
			document.head.appendChild(balise);
			app.src_load ++;
		}else{
			var oXmlHttp = new XMLHttpRequest() || new ActiveXObject("MsXml2.XmlHttp");
			oXmlHttp.onreadystatechange  = function(){
				if(oXmlHttp.readyState == 4 ){
					if(oXmlHttp.status == 200 || oXmlHttp.status == 304 ){
						if(typeof oXmlHttp.responseText === "string"){
							app.src_load ++;
							var balise = document.createElement("script");
							balise.rel = type;
							balise.src = link;
							document.head.appendChild(balise);
							app.log_console === true ? console.log("Load OK -- " + link) : false ;
							
						}else{
							app.log_console === true ? console.log("Load FAIL -- " + link) : false ;
						}
						
						//this.log_console === true ? console.log("Load OK -- " + link) : false ;
					}else{
						app.log_console === true ? console.log("Not Found -- " + link) : false ;
					}
				}
			}
			oXmlHttp.open('GET', link, true);
			oXmlHttp.send(null);
		}
	},
	
	
	
	animate : function(){
	
		/*
			Delta : For movement
			Time ; For refresh image
		*/
	
		app.delta = app.clock.getDelta();
		requestAnimationFrame(app.animate);
		app.updateStage();
		
		if(controls.enabled){
			world.step(app.delta);
			controls.update(Date.now() - time);
		}
		
		//debug
		scene.getObjectByName("sphereControls").position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
		
		renderer.render(scene, camera);
		document.getElementsByTagName("p")[0].innerHTML = "Delta : 0,01699... /" + app.delta + "<br>Time : 17 / " + (Date.now() - time );
		time = Date.now();
		stats.update();
		
	},
	
	render : function() {
	
		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight - 2 * 100;
		var SCALE = 1;
		
		//renderer = new THREE.WebGLDeferredRenderer( { width: WIDTH, height: HEIGHT, scale: SCALE, antialias: true, brightness: 2.5 } );

		renderer = new THREE.WebGLRenderer({antialias:true, canvas : mycanvas});
		
		renderer.shadowMapEnabled = true;
		renderer.setFaceCulling( THREE.CullFaceBack, THREE.FrontFaceDirectionCW );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor("white");
		document.body.appendChild( renderer.domElement );
	},
	
	//Gestionnaire d'images
	images : function(src_img){
		this.log_console === true ? console.log("app.images") : false ;
		add_images.push(src_img);
		
		for(var i=0; add_images.length; i ++){
		
			ftest = THREE.ImageUtils.loadTexture(src_img);
			if(ftest.sourceFile == src_img ){
			
				log("Load OK", src_img, "green", "white");
				return ftest
			}else{
				log("Load FAIL", src_img, "red", "white");
				return false
			}
		}
	},
	
	mat : {
		checkboard : function(img){
			return new THREE.MeshBasicMaterial({
				map  : img,
				wireframe : false,
				side : THREE.DoubleSide					
			});
		},
		
		red : function(){
			return new THREE.MeshLambertMaterial({
				//map  : app.images(img),
				color : "red",
				wireframe : false,
				//ambient : "blue"
				//side : THREE.DoubleSide					
			});
		},
		
		wireframe : function(){
			return new THREE.MeshBasicMaterial({
				color : "red",
				wireframe : true
			});
		},
		
		/*
		wall : function(){
			return new THREE.MeshPhongMaterial({
				color : new THREE.Color( 0xffffff ),
				ambient : new THREE.Color( 0xffffff ),
				emissive : new THREE.Color( 0x000000 ),
				specular : new THREE.Color( 0x111111 ),
				shininess : 30,

				map :  new THREE.Texture("../textures/textures_batiment.jpg"),
				normalMap : null,
				normalScale : new THREE.Vector2( 1, 1 ),
				specularMap : null,

				reflectivity : 1,
				refractionRatio : 0.98			
			});
		},
		*/
		
		emissive : function(){
			return new THREE.MeshLambertMaterial({
				//map  : app.images(img),
				//color : "red",
				//ambient : "blue",
				emissive : "0x0000ff"
			});
		}
		
	},
	
	axe_debug : function(arg_x,arg_y,arg_z){
		var axes = new THREE.AxisHelper(100);
		
		if(arg_x instanceof Object){
			x = arg_x.position.x || 0 ;
			y = arg_x.position.y || 0 ;
			z = arg_x.position.z || 0 ;
		}else{
			x = arg_x || 0 ;
			y = arg_y || 0 ;
			z = arg_z || 0 ;
		}	
		this.log_console === true ? console.log("LOG -- axe_debug = x:"+ x + ", y:" + y + ", z:" + z) : false ;
//		if(this.log_console === true) ;
		
		axes.position.set(x,y,z);
		scene.add( axes );
	},
	
	init_Cannon : function(){
		// Setup our world
		world = new CANNON.World();
		//world.quatNormalizeSkip = 0;
		//world.quatNormalizeFast = false;

		var solver = new CANNON.GSSolver();
		world.broadphase = new CANNON.NaiveBroadphase();
		world.iterations = 20;

		world.defaultContactMaterial.contactEquationStiffness = 1e9;
		world.defaultContactMaterial.contactEquationRegularizationTime = 4;
		solver.iterations = 20;
		solver.tolerance = 0.1;
	/*
		var split = true;
		if(split){
			world.solver = new CANNON.SplitSolver(solver);
		}else{
			world.solver = solver;
		}
	*/
		
		// Create material for all
		physicsMaterial = new CANNON.Material("slipperyMaterial");
		var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
																physicsMaterial,
																1.0, // friction coefficient
																0.0  // restitution
																);
		
		world.addContactMaterial(physicsContactMaterial);
		
		// Create a sphere physic
		var mass = 10 * 100, radius = 25;
		sphereShape = new CANNON.Sphere(radius);
		sphereBody = new CANNON.RigidBody(mass,sphereShape,physicsMaterial);
		sphereBody.position.set(252,60,145);
		sphereBody.linearDamping = 0;
		sphereBody.name = "sphereBody";
		world.add(sphereBody);

		
		// Create a plane physic
		var groundShape = new CANNON.Plane();
		var groundBody = new CANNON.RigidBody(0,groundShape,physicsMaterial);
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
		world.add(groundBody);
		groundBody.name = "groundBody";
		world.gravity.set(0,-970,0);
	},
	
	load_all_files : function(data){
		data.object.forEach(function(elem){
		
			var name = "data/models/" + elem.name + ".js";//file
			
			var loader = new THREE.JSONLoader( manager );
			loader.load(name,function (geometry, materials){						
				
				console.debug(materials);
				
				var name = elem.name;//name
				var pos = elem.position;//position
				var rot = elem.rotation;//rotation
				var sca = elem.scale;//rotation
				var col = elem.collisionType;//collisionType
				for(var i=0;i<materials.length;i++){
					materials[i].needsUpdate = true;
				}
				
				materials
				
//				materials.map.needsUpdate = true;
				var object = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials)); 
				
				/*
				collision with BoundingBox for cannon.js
				*/
				if(col == "box" ){
					object.geometry.computeBoundingBox();
				}
				
				object.material.needsUpdate = true;
				
				object.name = name;
				
				object.position.set(pos[0],pos[1],pos[2]);
				object.rotation.set(rot[0],rot[1],rot[2]);
				
				scene.add(object);
				
				object
				
				objTOrescale = scene.getObjectByName(object.name);
				
				objTOrescale.scale.set(sca[0],sca[1],sca[2]);
				
				app.src_load ++;
				
				if(data.object.length == app.src_load){
					app.Shadow();
				}
				
			console.log("Placement : " + name);
			},"data/textures/");
			
		});
	}
};