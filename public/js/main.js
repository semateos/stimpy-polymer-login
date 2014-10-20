var offline = new Offline(); // options: {document: myDocFragment, useThreads: false}
if (navigator.onLine){

	window.addEventListener('WebComponentsReady', function(e) {
    	console.log('components ready');
    	offline.prime();
    });

}else{

	offline.activate()
}