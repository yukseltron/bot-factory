new Vue({
  el: '#app',
  data: {
    newKeyword: '',
	newResponse: '',
    pairs: [],
    nextId: 0,
	name: '',
	text: 'sample'
  },
  methods: {
	uploadFile: function () {
		console.log('selected a file');
        console.log(this.$refs.document.files[0]);

        let file = this.$refs.document.files[0];
        //if(!file || file.type !== 'text/plain') return;

        // Credit: https://stackoverflow.com/a/754398/52160
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload =  evt => {
          this.text = evt.target.result;
        }
        reader.onerror = evt => {
          console.error(evt);
        }
    },
	resetFields: function () {
		  console.log('0');
    },
    addNew: function () {
		if (this.newKeyword != "" && this.newResponse != "") {
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
	removePair: function (index) {
		this.pairs.splice(index, 1);
  },
	exportFile: function () {
		this.name = this.name + '_config';
		jsonPairs = {}
		for (i of this.pairs) {
			jsonPairs[i.keyword] = i.response;
		}
		const data = JSON.stringify(jsonPairs);
	    const blob = new Blob([data], {type: 'text/plain'});
	    const e = document.createEvent('MouseEvents');
	    a = document.createElement('a');
	    a.download = this.name + ".json";
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
  }
  }
})
