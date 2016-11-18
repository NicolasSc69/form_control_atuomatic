$( document ).ready(function() {

  function replace (str, search, replace ) {
    var res = str.replace(search, replace); 
    return res; 
  }

  $("#formulaire").submit(function(e){
    var formError = false ;
    var errors = [];
    var valueForm = [];
    var txtError = '' ; 

    /*  delete all class form-error */
    $( ".form-error" ).each(function() {
      $(this).removeClass('form-error');
    });

    /* Control JS Input txt */
    $( "input[type=text]" ).each(function() {
      var value = $(this).val();
      var ID_INPUT = $(this).attr('id') ;
      var libelleError = $('label[for="' + ID_INPUT + '"]').text();
      if($(this).hasClass('required') && value == '') {
        errors.push( { message: "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
        $('label[for="' + ID_INPUT + '"]').addClass('form-error');
        formError = true ;
      } else {
        // check if is a numeric
        if($(this).hasClass('int')) {
          if($(this).attr('data-max-lenght') == undefined) {
            if (value.match(/[0-9]/)) {
              valueForm.push( { TYPE : 'TEXT_INT' , ID_INPUT: ID_INPUT, VALUE : value, });
            } else {
              errors.push( { message: "Field <b>" + replace(libelleError, '*', '') + "</b> isn't a numeric<br>" });
              $('label[for="' + ID_INPUT + '"]').addClass('form-error');
              formError = true ; 
            }
          } else {
            var counter = $('#cp').attr('data-max-lenght') ;
            if (value.match(/[0-9]/)) {
              valueForm.push( { TYPE : 'TEXT_INT' , ID_INPUT: ID_INPUT, VALUE : value, });
            } else {
              errors.push( { message: "Field <b>" + replace(libelleError, '*', '') + "</b> isn't a numeric<br>" });
              $('label[for="' + ID_INPUT + '"]').addClass('form-error');
              formError = true ; 
            }
            if (value.length == counter) {
              valueForm.push( { TYPE : 'TEXT_INT' , ID_INPUT: ID_INPUT, VALUE : value, });
            } else {
              errors.push( { message: "Field <b>" + replace(libelleError, '*', '') + "</b> has not the correct number<br>" });
              $('label[for="' + ID_INPUT + '"]').addClass('form-error');
              formError = true ; 
            }
          }
        } else {
          valueForm.push( { TYPE : 'TEXT' , ID_INPUT: ID_INPUT, VALUE : value, });
        }
      }
    });

    /* Control JS Input txt */
    $( "input[type=mail]" ).each(function() {
      var value = $(this).val();
      var ID_INPUT = $(this).attr('id') ;
      var libelleError = $('label[for="' + ID_INPUT + '"]').text();
      if($(this).hasClass('required') && value == '') {
        errors.push( { message:  "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
        $('label[for="' + ID_INPUT + '"]').addClass('form-error');
        formError = true ;
      } else {
        if (value.match(/^([\w\.\-]+)@([\w\-\.]+)((\.(\w){2,3})+)$/i)) {
          valueForm.push( { TYPE : 'MAIL' , ID_INPUT: ID_INPUT, VALUE : value, });
        } else {
          errors.push( { message: "Field <b>" + replace(libelleError, '*', '') + "</b> isn't a valid mail<br>" });
          $('label[for="' + ID_INPUT + '"]').addClass('form-error');
          formError = true ;
        }
      }
    });

    /* Control JS Input type radio */
    var count = 0 ;
    $( "input[type=radio]" ).each(function(index, value) {
      var NAME_INPUT = $(this).attr('name') ;
      var value = $(this).val();
      if($(this).hasClass('required')  && !$('input[name=' + NAME_INPUT +']').is(':checked') ){
        var libelleError = $('label[for="' + NAME_INPUT + '"]').text();
        count++;
        if(count != 1) {
          errors.push( { message:  "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
          count = 0 ;
        }
        $('label[for="' + NAME_INPUT + '"]').addClass('form-error');

        formError = true ;
      } else {
        count++;
        if(count != 1) {
          valueForm.push( { TYPE : 'RADIO' , ID_INPUT: NAME_INPUT, VALUE : $('input:checked[name=' + NAME_INPUT + ']').val(), });
          count = 0 ;
        }
      }
    });

    /* Control JS Input type checkbox */
    var count = 0 ;
    $( "input[type=checkbox]").each(function(index, value) {
      var NAME_INPUT = $(this).attr('name') ;
      if($(this).hasClass('required')  && !$('input[name=' + NAME_INPUT +']').is(':checked') ){
        var libelleError = $('label[for="' + NAME_INPUT + '"]').text();
        count++;
        if(count != 1) {
          errors.push( { message:  "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
          count = 0 ;
        }
        $('label[for="' + NAME_INPUT + '"]').addClass('form-error');
        formError = true ;
      } else {
        count++;
        if(count != 1) {
          $('input:checked[name=' + NAME_INPUT + ']').each(function() {
            valueForm.push( { TYPE : 'CHECKBOX' , ID_INPUT: NAME_INPUT, VALUE : $(this).val() });
          });
          count = 0 ;
        }
      }
    });

    /* Control JS textarea  */
    $( "textarea" ).each(function() {
      var value = $(this).val();
      var ID_INPUT = $(this).attr('id') ;
      if($(this).hasClass('required') && value == '') {
        var libelleError = $('label[for="' + ID_INPUT + '"]').text();
        errors.push( { message:  "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
        $('label[for="' + ID_INPUT + '"]').addClass('form-error');
        formError = true ;
      } else {
        valueForm.push( { TYPE : 'TEXTAREA'  , ID_INPUT: ID_INPUT, VALUE : value, });
      }
    });

    /* Control JS select  */
    $( "select" ).each(function() {
      var value = $(this).val();
      var ID_INPUT = $(this).attr('id') ;
      if($(this).hasClass('required') && value == '') {
        var libelleError = $('label[for="' + ID_INPUT + '"]').text();
        errors.push( { message:  "Field <b>" + replace(libelleError, '*', '') + "</b> is empty<br>" });
        $('label[for="' + ID_INPUT + '"]').addClass('form-error');
        formError = true ;
      } else {
        valueForm.push( { TYPE : 'SELECT' , ID_INPUT: ID_INPUT, VALUE : value, });
      }
    });

    if(formError) {
      for(var i= 0; i < errors.length; i++)
      {
         txtError +=  errors[i].message ;
      }
      $.colorbox({
                  html  : txtError,
                  width : "600px",
                  height: "auto"
                });
      e.stopPropagation();
      e.preventDefault();
      return false;
    } else {
      var sUrl = 'submit.php';
      var oParams = {
          data : valueForm
      };

      $.post(sUrl,oParams,function(data) {
           $.colorbox({
                  html  : data,
                  width : "800px",
                  height: "800px"
                });
      });
      $('#formulaire')[0].reset();
      return false;
    }
  });
});