/**
 Analytics Send Handlers - These help facilitate the communication between your code and your analytics
 library.
*/
//TODO: Replace this with the actual analytics library calls for your specific implementation
//  e.g.: ga('send', 'pageview', value);
//  e.g.: ga('send', 'event', 'button', 'click', 'nav buttons', value);
export default {
  route: function(information) { console.log('*** Page View: '+JSON.stringify(information)); },
  action: function(information) { console.log('*** Action: '+JSON.stringify(information)); }
};
