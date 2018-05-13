var app = new Vue({
    el: '#app-cep-search',
    data: {
        cep: '',
        city: '',
        state: '',
        street: '',
        district: ''
    },
    watch: {
        cep: function(){
            this.city = '';
            this.state = '';
            this.street = '';
            this.district = '';
            if(this.cep.length == 8){
                this.getAddressByCep();
            }
        }
    },
    methods: {
        getAddressByCep: _.debounce(function(){
            var app = this;
            app.city = 'wait...';

            axios.get('https://viacep.com.br/ws/'+app.cep+'/json/').then(function(response){
                app.city = response.data.localidade;
                app.state = response.data.uf;
                app.street = response.data.logradouro;
                app.district = response.data.bairro;
            }).catch(function(error){
                app.city = 'Invalid CEP: '+error;
            });
        }, 500)
    }
});

