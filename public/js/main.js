var offline = new Offline(); // options: {document: myDocFragment, useThreads: false}
if (navigator.onLine)
{
offline.prime()
}
else
{
offline.activate()
}