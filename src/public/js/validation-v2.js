function Validation(formSlector, classError){

  var _this= this;
  function getParent(element, selector){
   while(element.parentElement){
      if(element.parentElement.matches(selector)){
        return element.parentElement;
      }
      element = element.parentElement;
   }
  }
  var formRules = {

  }
/**
 * quy uoc tao rules
 * - neu co loi thi return 'error message'
 * - neu ko loi thi return 'undefined'
 */
var validationRules = {
  required: function(value){
    return value ? undefined : 'Không được để trống'
  },
  email: function(value){
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value) ? undefined : 'Vui lòng nhập email'
  },
  min: function(min){
    return function(value){
      return value.length >= min ? undefined : `Mật khẩu ít nhất ${min} ký tự`
    }
  },
}



  var formElement = document.querySelector(formSlector)

  // chi xu ly khi co element
  if(formElement){

    var inputs = formElement.querySelectorAll('[name][rules]')
    
    for(var input of inputs){
      var rules = input.getAttribute('rules').split('|')
      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(':');
        if(isRuleHasValue){
          var ruleInfo = rule.split(':');
          rule = ruleInfo[0]
        }
      
      var ruleFunc = validationRules[rule];
      if(isRuleHasValue){
        ruleFunc = ruleFunc(ruleInfo[1])
      }

      if(Array.isArray(formRules[input.name])){
        formRules[input.name].push(ruleFunc)
      }else{
        formRules[input.name] = [ruleFunc]
      }
    }
    // lang nghe su kien de validate
    input.onblur = handleValidate;
    input.oninput = handleClearError;

    }
    // ham thuc hien validate
    function handleValidate(event){
      var rules = formRules[event.target.name];
      var errorMessage ;

      for(var rule of rules){
        errorMessage = rule(event.target.value);
        if(errorMessage) break;
      }
      rules.find(function(rule){
        errorMessage = rule(event.target.value);
        return errorMessage
      })
      // neu co loi thi hien thi ra UI
      if(errorMessage){
       var formGroup = getParent(event.target, '.form-group')
       if(formGroup){
         formGroup.classList.add('invalid')
         var formMessage = formGroup.querySelector(classError)
         if(formMessage){
           formMessage.innerText = errorMessage
         }
       }
      }
      return !errorMessage;
    }

    function handleClearError(event){
      var formGroup = getParent(event.target, '.form-group')
      if(formGroup.classList.contains('invalid')){
        formGroup.classList.remove('invalid')

        var formMessage = formGroup.querySelector(classError)
        if(formMessage){
          formMessage.innerText = '';
        }
      }
    }
  }
 
  // xu ly hanh vi submit form
  formElement.onsubmit = function(event){
    event.preventDefault();


    var inputs = formElement.querySelectorAll('[name][rules]')
    var isValid = true;
    for(var input of inputs){
      if(!handleValidate({target: input})){
        isValid = false;
      }
    }
    // khi khong co loi thi submit
    if(isValid){
      if (typeof _this.onSubmit === "function") {
        var enableInputs = formElement.querySelectorAll(
          "[name]"
        );
        var formValues = Array.from(enableInputs).reduce((values, input) => {
          switch(input.type){
            case 'radio':
              values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
              break;
            case 'checkbox':
              if(!input.matches(':checked')) return values

              if(!Array.isArray(values[input.name])){
                values[input.name] = [];
              }

              values[input.name].push(input.value)

              break;
            case 'file':
              values[input.name] = input.files
              break;
            default: 
              values[input.name] = input.value

          }
          return values;
        }, {});
        // goi lai ham onSubmit va trar ve kem gia tri cua form
        _this.onSubmit(formValues);
      }else{
        formElement.submit()
      }
    }
  }
}