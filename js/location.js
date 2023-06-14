
(function ($) {
    "use strict";

    //$("#matricula").mask("999.999-9-*");
    //$('#form-success').text('Registro realizado com sucesso!');
    //$("#form-success").fadeIn().delay(5000).fadeOut(clearFormsInput);


    /*==================================================================
    [ Focus Contact2 ]*/
  

    /*==================================================================
    [ Chose Radio ]*/

  
    
    /*==================================================================
    [ Validate ]*/
    //var name = $('.validate-input input[name="name"]');
    //var email = $('.validate-input input[name="email"]');
    //var message = $('.validate-input textarea[name="message"]');

        //selector from your HTML form
        $('#my-form').submit(function(e) {
            //prevent the form from submiting so we can post to the google form
            e.preventDefault();
            
            const valid = validateform();
            if(!valid){
                return
            }

            var kmFinal = $('.input3.km_final').val();
            console.log(kmFinal); 


            var formData = $(this).serialize(); // Serializa os dados do formulário
            //AJAX request
            //https://docs.google.com/forms/u/0/d/e/1FAIpQLSfq5msjyfHZHRZ3q1b0JNn0TQGN0NnalN4OCZAoiScGItKolA/formResponse?edit2=2_ABaOnucgYQTUDOp3lwiPU8YbUUFZ6Mc0T_czhxNuYK-6X3P5cCDa4X5ircnwkiiCbRGEjiI&entry.545795178=500000
            
            console.log($(this),formData)

            return
            $.ajax({
                //url: 'https://docs.google.com/forms/d/e/1FAIpQLScfJY0v7xNhp6fyFdmiX6vPiAVgoldqPDNvf1PU1OCVxIu1jg/formResponse',     //The public Google Form url, but replace /view with /formResponse
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSfq5msjyfHZHRZ3q1b0JNn0TQGN0NnalN4OCZAoiScGItKolA/formResponse',     //The public Google Form url, but replace /view with /formResponse
                type: 'POST', //tells ajax to post the data to the url
                data: formData,//$('#my-form').serialize(), //Nifty jquery function that gets all the input data 
                dataType: "json", //json xml      the standard data type for most ajax requests
                statusCode: { //the status code from the POST request
                    0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
                        //success
                        $('#form-success').text('Registro realizado com sucesso!');
                        $("#form-success").fadeIn().delay(5000).fadeOut(clearFormsInput);
                    }, 
                    200: function(data) {//200 is a success code. it went through!
                        //success
                        $('#form-success').text('Registro realizado com sucesso!');
                        $("#form-success").fadeIn().delay(5000).fadeOut(clearFormsInput);
                    },
                    403: function(data) {//403 is when something went wrong and the submission didn't go through
                    //error
                        alert('Algo deu errado. devemos verificar nosso código para garantir que tudo corresponda ao Google');
                    }
                }  
            });
        });




})(jQuery);
