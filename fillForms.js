javascript:function f(){
    var inputs = document.getElementsByTagName('input');
    
    for(var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type === 'text') {
            input.value = Math.random().toString(36).slice(2, 7 + 2);
        } else if (input.type === 'password') {
            input.value = 'Password123';
        }
    }
    
    var dropdowns = document.getElementsByTagName('select');
    for(var i = 0; i < dropdowns.length; i++){
        var dd = dropdowns[i];
        dd.selectedIndex = Math.random() * (dropdowns.length - 1) + 1;
    }
}f();