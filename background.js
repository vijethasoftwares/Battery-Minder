navigator.getBattery().then(function(battery) {
    function checkBatteryStatus() {
      if (battery.charging && battery.level === 1) {
        chrome.notifications.create('battery-full', {
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Battery Full',
          message: 'Your battery is fully charged. You can unplug your charger.'
        });
      } else if (!battery.charging && battery.level < 0.50) {
        alert("hi")
        chrome.notifications.create('battery-low', {
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Battery Low',
          message: 'Your battery is low. Please plug in your charger.'
        });
      }
    }
  
    battery.addEventListener('chargingchange', checkBatteryStatus);
    battery.addEventListener('levelchange', checkBatteryStatus);
  });  