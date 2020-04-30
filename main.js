//author Hamid Yuksel

new Vue({
  el: '#app',
  data: {
    newKeyword: '', //Keyword to be added
	newResponse: '', //Response to be added
    pairs: [], //list of keyword-response pairings
    nextId: 0, //keeps track of id
	name: '', //name of file
	text: {} //stores parsed JSON from uploaded file
  },
  methods: {
	uploadFile: function () { //function for filling pairings list with pairings from uploaded file
		//console.log('selected a file');
        //console.log(this.$refs.document.files[0]);

        let file = this.$refs.document.files[0];
        if(!file || file.type !== 'application/json') { //ensures only .json file types can be uploaded
			alert("No file or incorrect file type uploaded! Should end in '.json'");
			return;
		}
        // Credit: https://stackoverflow.com/a/754398/52160
        let reader = new FileReader(); //file reader functionalities
		this.name = file.name;

        reader.readAsText(file, "UTF-8"); //parses through file and appends to pairs.
        reader.onload =  evt => {
          stringText = evt.target.result;
		  this.text = JSON.parse(stringText);

		  for (j of Object.entries(this.text)) {
  			  if (this.alreadyStored(j[0]) == true) { // check if keyword already used
				  this.pairs.push({
					id: this.nextId++,
					keyword: j[0],
					response: j[1]
					});
			  }
		  }
		  stringText = ''; //reset params
		  this.text = {};
        }
        reader.onerror = evt => {
          console.error(evt);
        }
    },
	resetFields: function () { //Resets all fields
        if (confirm("Are you sure you want to Reset All Fields?")) {
            this.pairs = [];
            this.name = '';
            this.text = {};
        }
    },
    addNew: function () { //for when user manually adds a pairing to the list
		if (this.newKeyword != "" && this.newResponse != "" && this.alreadyStored(this.newKeyword) == true) { //check if not empty and keyword hasn't already been stored
			if (this.newKeyword.includes(',')) { //allows for multiple keywords to be added, separated by a comma ','
				listOfKeys = this.newKeyword.split(",");

				for (i of listOfKeys) { //add comma separated items into the pairs list
					this.pairs.push({
					  id: this.nextId++,
					  keyword: i,
					  response: this.newResponse
					  });
				}
			} else { //otherwise commas are not used, add a single pair to pairs list
				this.pairs.push({
				  id: this.nextId++,
				  keyword: this.newKeyword,
				  response: this.newResponse
				  });
			}
			this.newKeyword = ''; //reset fields
			this.newResponse = '';
		}
  },
    alreadyStored: function (keyword) { //internal function to check if keyword has been stored already.
	  for (p of this.pairs) {
		  if (keyword == p.keyword) {
			  alert('Keyword : response already stored! Keyword: ' + keyword);
			  return false;
		  }
	  }
	  return true;
  },
	removePair: function (index) { //remove pair from pairs-list. as specified by the user
		this.pairs.splice(index, 1);
  },
	exportFile: function () { //export the pairs into a json file
		if (this.name == '') { //applies default name if none is given
			this.name = 'config.json';
		} else if (this.name.endsWith('.json')) { //do not change name if ends in json already
            this.name = this.name;
        } else { //add json extension to end of file otherwise
			this.name = this.name + '.json';
		}

		jsonPairs = {} //json to store pairs in to export

		for (i of this.pairs) { //stores pairs into json object
			jsonPairs[i.keyword] = i.response;
		}

		const data = JSON.stringify(jsonPairs); //creates and downloads the json file for user
	    const blob = new Blob([data], {type: 'text/plain'}); //uses blob to make exportable file
	    const e = document.createEvent('MouseEvents');
	    a = document.createElement('a');
	    a.download = this.name;
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
  }
  }
})
