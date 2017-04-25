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
    camera.position.set( 0, 0, 10 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    var vertices = [ 
    [-1, 1, 0], // v0 
    [-1,-1, 0], // v1 
    [ 1,-1, 0], // v2
    [ 1, 1, 0], // v3
    [-1, 1, 2], // v4 
    [-1,-1, 2], // v5 
    [ 1,-1, 2], // v6
    [ 1, 1, 2], // v7
    ];
    var faces = [
    [0,1,2], // f0: v0-v1-v2
    [0,2,3], // f1: v0-v2-v3
    [0,3,7], // f2: v0-v3-v7
    [4,0,7], // f3: v0-v4-v7
    [0,5,1], // f4: v0-v1-v5
    [0,4,5], // f5: v0-v4-v5
    [2,1,6], // f6: v1-v2-v6
    [1,5,6], // f7: v1-v5-v6
    [3,6,7], // f8: v3-v6-v7
    [2,6,3], // f9: v2-v3-v6
    [4,6,7], // f10: v4-v6-v7
    [4,5,6], // f11: v4-v5-v6
    ];
//頂点座標
//_______________________________________________________________
    var v0 = new THREE.Vector3().fromArray( vertices[0] ); 
    var v1 = new THREE.Vector3().fromArray( vertices[1] ); 
    var v2 = new THREE.Vector3().fromArray( vertices[2] ); 
    var v3 = new THREE.Vector3().fromArray( vertices[3] ); 
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    var v7 = new THREE.Vector3().fromArray( vertices[7] ); 
//_______________________________________________________________
    var id = faces[0];
    var f0 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[1];
    var f1 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[2];
    var f2 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[3];
    var f3 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[4];
    var f4 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[5];
    var f5 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[6];
    var f6 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[7];
    var f7 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[8];
    var f8 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[9];
    var f9 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[10];
    var f10 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[11];
    var f11 = new THREE.Face3( id[0], id[1], id[2] );
    //_______________________________________________________________
    //登録
    var geometry = new THREE.Geometry(); 
    geometry.vertices.push( v0 ); 
    geometry.vertices.push( v1 ); 
    geometry.vertices.push( v2 ); 
    geometry.vertices.push( v3 ); 
    geometry.vertices.push( v4 ); 
    geometry.vertices.push( v5 ); 
    geometry.vertices.push( v6 ); 
    geometry.vertices.push( v7 );
    geometry.faces.push( f0 );
    geometry.faces.push( f1 );
    geometry.faces.push( f2 );
    geometry.faces.push( f3 );
    geometry.faces.push( f4 );
    geometry.faces.push( f5 );
    geometry.faces.push( f6 );
    geometry.faces.push( f7 );
    geometry.faces.push( f8 );
    geometry.faces.push( f9 );
    geometry.faces.push( f10 );
    geometry.faces.push( f11 );
    geometry.computeFaceNormals();
    //________________________________________________________________
    //表示
    var material = new THREE.MeshBasicMaterial(); 
    material.vertexColors = THREE.FaceColors; 
      material.side = THREE.DoubleSide;
    var triangle = new THREE.Mesh(geometry,material);
        document.addEventListener( 'mousedown', mouse_down_event );
        function mouse_down_event( event ){
            var x_win = event.clientX; 
            var y_win = event.clientY;
            var vx = renderer.domElement.offsetLeft; 
            var vy = renderer.domElement.offsetTop; 
            var vw = renderer.domElement.width;
            var vh = renderer.domElement.height;
            var x_NDC = 2 * ( x_win - vx ) / vw - 1;
            var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
            var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 ); 
            var p_wld = p_NDC.unproject( camera );
            var origin = camera.position; 
            var direction = p_NDC.sub(camera.position).normalize();
            var raycaster = new THREE.Raycaster( origin, direction ); // origin 視点　direction 方向
            var intersects = raycaster.intersectObject( triangle ); // intersectObject :tri1:配列
            if ( intersects.length > 0 ){
                intersects[0].face.color.setRGB( 1, 0, 0 );
                intersects[0].object.geometry.colorsNeedUpdate = true; 
            }
        }
    scene.add(triangle);
    loop(); 
    function loop()
    {
        requestAnimationFrame( loop );

        triangle.rotation.x += 0.001;
        triangle.rotation.y += 0.001;
        renderer.render( scene, camera );
    }
}
