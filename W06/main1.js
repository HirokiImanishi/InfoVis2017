function main()
{
    var width = 500;
    var height = 500;
    
    var scene = new THREE.Scene();
    
    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 8 );
    scene.add( camera );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.setClearColor( 0xfffaf0 ); //背景色
    document.body.appendChild( renderer.domElement );
    
    var vertices = [
                    [-1, 1, -1], //v0
                    [-1, -1, -1], //v1
                    [1, -1, -1], //v2
                    [1, 1, -1], //v3
                    [-1, 1, 1], //v4
                    [-1, -1, 1], //v5
                    [1, -1, 1], //v6
                    [1, 1, 1] //v7
                    ];
    
    var faces = [
                 [0,2,1], //f0: v0-v2-v1
                 [0,3,2], //f1: v0-v3-v2
                 [4,5,6], //f2: v4-v5-v6
                 [4,6,7], //f3: v4-v6-v7
                 [1,2,5], //f4: v1-v2-v5
                 [2,6,5], //f5: v2-v6-v5
                 [2,7,6], //f6: v2-v7-v6
                 [2,3,7], //f7: v2-v3-v7
                 [0,4,3], //f8: v0-v4-v3
                 [3,4,7], //f9: v3-v4-v7
                 [1,5,4], //f10: v1-v5-v4
                 [0,1,4] //f11: v0-v1-v4
                 ];

    var geometry = new THREE.Geometry();
    for(i = 0;i < 8;i++){
        var v = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( v );
    }
    
    for(i = 0;i < 12;i++){
        var id = faces[i];
        var f = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( f );
    }

    geometry.computeFaceNormals();
    
    var material = new THREE.MeshBasicMaterial( { color: 0xff1493 } );
    material.side = THREE.DoubleSide
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    loop();
    
    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    
}
