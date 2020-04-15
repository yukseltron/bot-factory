new Vue({
  el: '#app',
  data: {
    newKeyword: '',
	newResponse: '',
    pairs: [],
    nextId: 0
  },
  methods: {
    addNew: function () {
      this.pairs.push({
        id: this.nextId++,
        keyword: this.newKeyword,
		response: this.newResponse
	});
	  this.newKeyword = '';
	  this.newResponse = '';
  },
	removePair: function (index) {
		this.pairs.splice(index, 1)
  },
	exportFile: function () {
		const data = JSON.stringify(this.pairs)
	    const blob = new Blob([data], {type: 'text/plain'})
	    const e = document.createEvent('MouseEvents'),
	    a = document.createElement('a');
	    a.download = "test.json";
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
  }
  }
})
