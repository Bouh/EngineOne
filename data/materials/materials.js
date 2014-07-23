var materials = {
	
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
		
		var diff = app.images("data/textures/textures_batiment.jpg");
		var spec = app.images("data/textures/textures_batiment_SPEC.jpg");
		var nor = app.images("data/textures/textures_batiment_NRM.jpg");
		
			return new THREE.MeshPhongMaterial({
				color : new THREE.Color( 0xffffff ),
				ambient : new THREE.Color( 0xffffff ),
				emissive : new THREE.Color( 0x000000 ),
				specular : new THREE.Color( 0x111111 ),
				shininess : 30,

				map :  diff,
				normalMap : nor,
				normalScale : new THREE.Vector2( 1, 1 ),
				specularMap : spec,
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
		
	}
};