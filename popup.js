document.addEventListener('DOMContentLoaded', function () {
  navigator.getBattery().then(function (battery) {
    console.log(battery.level)
    function updateStatus() {
      var statusElement = document.getElementById('status');
      statusElement.innerHTML = 'Battery level: ' + (battery.level * 100).toFixed(0) + '%';
    }

    function checkBatteryStatus() {
      updateStatus(); // Update the status in the popup

      if (battery.charging && battery.level >= 0.99) { // Use >= to check for full charge
        chrome.notifications.create('battery-full', {
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Battery Full',
          message: 'Your battery is fully charged. You can unplug your charger.'
        });
      } else if (!battery.charging && battery.level < 0.15) {
        chrome.notifications.create('battery-low', {
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Battery Low',
          message: 'Your battery is low. Please plug in your charger.'
        });
      }
    }

    // Call checkBatteryStatus immediately to handle the current battery state
    checkBatteryStatus();

    // Setup listeners for battery status changes
    battery.addEventListener('chargingchange', checkBatteryStatus);
    battery.addEventListener('levelchange', checkBatteryStatus);
  });  
});
