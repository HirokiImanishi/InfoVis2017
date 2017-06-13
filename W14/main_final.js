function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    screen.init( volume, {
                width: window.innerWidth,
                height: window.innerHeight,
                enableAutoResize: false
                });
    
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    
    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue );
    
    screen.init(volume, {
                width: window.innerWidth * 0.8,
                height: window.innerHeight,
                targetDom: document.getElementById('display'), enableAutoResize: false
                });
    
    screen.scene.add( surfaces );
    
    document.addEventListener( 'mousemove', function() {
                              screen.light.position.copy( screen.camera.position );
                              });

    window.addEventListener('resize', function() {
                            screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
                            });
    
    document.getElementById('change-isovalue-button')
    .addEventListener('click', function() {
                      screen.scene.remove( surfaces );
                      var r = Math.floor( Math.random() * 255 ) ;
                      var g = Math.floor( Math.random() * 255 ) ;
                      var b = Math.floor( Math.random() * 255 ) ;
                      var isovalue = 100;
                      surfaces = Isosurfaces2(volume,isovalue,r,g,b);
                      screen.scene.add( surfaces );
                      });
 
    screen.loop();
}
