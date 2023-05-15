var cluster = require('cluster');

if (cluster.isMaster) {
  // Esto cuenta el numero de nucleos que tiene la pc.
  var cpuCount = require('os').cpus().length;

  // Crea un 'Worker' por cada nucleo del procesador de la pc.
  for (var i = 0; i < cpuCount; i += 1) {
    //console.log(process.pid);
    cluster.fork();
    
  }

  //Proceso principal que no debemos matar.
  console.log("El proceso principal es: " + process.pid);

  // Aqui esta al pendiente en caso de que un 'Worker' muera
  cluster.on('exit', function (worker) {
    console.log("El proceso " + worker.process.pid + " ha muerto.");
    cluster.fork();
  });

  cluster.on("listening", (worker)=>{
    console.log("El proceso " + worker.process.pid + " ha sido activado.");
  })

  
} else {
  require('./app');
}