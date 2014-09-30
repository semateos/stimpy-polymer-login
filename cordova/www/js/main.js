var tabs = document.querySelector('paper-tabs');
tabs.addEventListener('core-select', function(e) {
    console.log("Selected: " + tabs.selected);
});