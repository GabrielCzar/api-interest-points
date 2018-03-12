$('select.dropdown').dropdown();
$('.ui.sidebar').sidebar('toggle');

var cities = new Vue({
  el: '#cities',
  data: {
    cities: []
  }, 
  mounted() {
    this.get()
  },
  methods: {
    get: function () {
      fetch('/api/cities').then((res) => {
        res.json().then((data) => {
          this.cities = data
        });
      });
    }
  }
});
 
var message = new Vue({
  el: '#message',
  data: {
    hidden: true,
    url: '/ilat/39.68/ilon/116.08/flat/40.18/flon/116.77/city/Beijing.json',
    city: 'Beijing'
  },
  methods: {
    copy: function (e) {
      let link = document.getElementById('url');
      let area = document.createElement('textarea');

      area.setAttribute('type', 'hidden');
      area.textContent = link.text.replace(/\s/g, '');

      document.body.appendChild(area);
      area.select();

      document.execCommand("Copy");
      
      document.body.removeChild(area);

      // Show feedback to user
      let btnCopy = document.getElementById('btnCopy');
      btnCopy.setAttribute('data-tooltip', 'URL Copiada com sucesso!');
      setTimeout(() => {
        btnCopy.removeAttribute('data-tooltip');
      }, 1000);

      e.preventDefault();
    }
   }
 });

let search = new Vue({
  el: '#search',
  methods: {
    submit: function (e) {
      let cityChoosed = document.getElementById('cities').value

      if (cityChoosed === '' || cityChoosed === 'undefined') 
      	return false;
      
      let origin = document.origin;
      const URL = `${origin}/api/interest-points/city/${cityChoosed}/${cityChoosed}-interest-points.json`;

      message.city = cityChoosed;
      message.url = URL;
      message.hidden = false;

      let btnSearch = $('#btnSearch');
      btnSearch.addClass('inverted'); // lost color
      btnSearch.blur(); // lost focus

      e.preventDefault();
    }
  }
});



