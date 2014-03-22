/**
 Analytics Send Handlers - These help facilitate the communication between your code and your analytics
 library.
*/
//TODO: Replace this with the actual analytics library calls for your specific implementation
export default {
  route: function(information) { console.log('*** '+JSON.stringify(information)); },
  action: function(information) { console.log('*** '+JSON.stringify(information)); }
};
