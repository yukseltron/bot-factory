new Vue({
  el: '#app',
  data: {
    newKeyword: '',
	newResponse: '',
    pairs: [],
    nextId: 0,
	name: '',
	text: {}
  },
  methods: {
	uploadFile: function () {
		//console.log('selected a file');
        //console.log(this.$refs.document.files[0]);

        let file = this.$refs.document.files[0];
        if(!file || file.type !== 'application/json') {
			alert("No file or incorrect file type uploaded! Should end in '.json'");
			return;
		}
        // Credit: https://stackoverflow.com/a/754398/52160
        let reader = new FileReader();
		this.name = file.name;
        reader.readAsText(file, "UTF-8");
        reader.onload =  evt => {
          stringText = evt.target.result;
		  this.text = JSON.parse(stringText);
		  for (j of Object.entries(this.text)) {
  			  if (this.alreadyStored(j[0]) == true) {
				  this.pairs.push({
					id: this.nextId++,
					keyword: j[0],
					response: j[1]
					});
			  }
		  }
		  stringText = '';
		  this.text = {};
        }
        reader.onerror = evt => {
          console.error(evt);
        }
    },
	resetFields: function () {
        if (confirm("Are you sure you want to Reset All Fields?")) {
            this.pairs = [];
            this.name = '';
            this.text = {};
        }
    },
    addNew: function () {
		if (this.newKeyword != "" && this.newResponse != "" && this.alreadyStored(this.newKeyword) == true) {
			if (this.newKeyword.includes(',')) {
				listOfKeys = this.newKeyword.split(",");
				for (i of listOfKeys) {
					this.pairs.push({
					  id: this.nextId++,
					  keyword: i,
					  response: this.newResponse
					  });
				}
			} else {
				this.pairs.push({
				  id: this.nextId++,
				  keyword: this.newKeyword,
				  response: this.newResponse
				  });
			}
			this.newKeyword = '';
			this.newResponse = '';
		}
  },
    alreadyStored: function (keyword) {
	  for (p of this.pairs) {
		  if (keyword == p.keyword) {
			  alert('Keyword : response already stored! Keyword: ' + keyword);
			  return false;
		  }
	  }
	  return true;
  },
	removePair: function (index) {
		this.pairs.splice(index, 1);
  },
	exportFile: function () {
		if (this.name == '') {
			this.name = 'config.json';
		} else {
			this.name = this.name + '.json';
		}
		jsonPairs = {}
		for (i of this.pairs) {
			jsonPairs[i.keyword] = i.response;
		}
		const data = JSON.stringify(jsonPairs);
	    const blob = new Blob([data], {type: 'text/plain'});
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
