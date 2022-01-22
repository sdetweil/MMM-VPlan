
Module.register("MMM-VPlan", {
	defaults: {
		fadeSpeed: 2,
        username: "",
        password: ""
	},

  response: {},

	getStyles: function() {
        return ["MMM-Plan.css"];
	},

  start: function() {
		Log.log("Starting module: " + this.name);
		
    this.getData()
	},

	getDom: function() {
        const wrapper = document.createElement("div");
        if(this.response.length <= 0) {  /// response is not a string, so length is bad
            wrapper.innerHTML = "No Entries";
        } else {
            wrapper.innerHTML = JSON.stringify(this.response);  // not a json object
        }

        return wrapper;
	},

    getData: function () {
        let self = this
        const request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/vplan/' + this.config.username + '/' + this.config.password + '/today', true);
        request.onreadystatechange = () => {
          if (request.readyState != 4) {
            return;
          };
    
          if (request.status === 200) {
            this.response = JSON.parse(request.response);
            //this.response = "Test"
            this.updateDom();
          } else {
            Log.error(`${this.name}: Could not load data`);
          }
    
          setTimeout(() => self.getData(), 1000*60*10);
        };
        request.send();
      },
})
  