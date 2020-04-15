new Vue({
  el: '#app',
  data: {
    newKeyword: '',
	newResponse: '',
    pairs: [],
    nextId: 0,
	name: ''
  },
  methods: {
    addNew: function () {
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
  },
	removePair: function (index) {
		this.pairs.splice(index, 1)
  },
	exportFile: function () {
		this.name = this.name + '_config';
		const data = JSON.stringify(this.pairs)
	    const blob = new Blob([data], {type: 'text/plain'})
	    const e = document.createEvent('MouseEvents'),
	    a = document.createElement('a');
	    a.download = this.name + ".json";
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
  }
  }
})
