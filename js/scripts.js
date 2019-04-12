//BIZ LOGIC
function Pizza() {
  this.size = '';
  this.toppings = [];
  this.qty = 1;
}

function Topping(topping, position, qty) {
  this.topping = topping;
  this.position = position;
  this.qty = qty;
}

var order = {
  pizzas: []
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.calcPrice = function() {
  var price = 0;
  if(this.size == 'Small') {
    price += 8;
    for (var i = 0; i < this.toppings.length; i++) {
      if(this.toppings[i].position == 'Whole') {
        if(this.toppings[i].qty == 'Regular') {
          price += 0.5;
        } else price += 1;
      } else {
        if(this.toppings[i].qty == 'Regular') {
          price += 0.25;
        } else price += 0.5;
      }
    }
  }
  if(this.size == 'Medium') {
    price += 10;
    for (var i = 0; i < this.toppings.length; i++) {
      if(this.toppings[i].position == 'Whole') {
        if(this.toppings[i].qty == 'Regular') {
          price += 0.75;
        } else price += 1.50;
      } else {
        if(this.toppings[i].qty == 'Regular') {
          price += 0.40;
        } else price += 0.75;
      }
    }
  }
  if(this.size == 'Large') {
    price += 12;
    for (var i = 0; i < this.toppings.length; i++) {
      if(this.toppings[i].position == 'Whole') {
        if(this.toppings[i].qty == 'Regular') {
          price += 1;
        } else price += 2;
      } else {
        if(this.toppings[i].qty == 'Regular') {
          price += 0.5;
        } else price += 1;
      }
    }
  }
  return price;
}

// Pizza.prototype.compileInfo = function() {
//   var output = [];
//   var wholeToppings = [];
//   var leftToppings = [];
//   var rightToppings = [];
//   output.push(this.qty + ' ' + this.size + ' Pizza');
//   for(var i = 0; i < this.toppings.length; i++) {
//     if(this.toppings[i].position == 'whole') {
//       if(this.toppings[i].qty == 'regular') {
//         wholeToppings.push(this.toppings[i].topping);
//       } else wholeToppings.push('Extra ' + this.toppings[i].topping);
//     }
//     if(this.toppings[i].position == 'left') {
//       if(this.toppings[i].qty == 'regular') {
//         leftToppings.push(this.toppings[i].topping);
//       } else leftToppings.push('Extra ' + this.toppings[i].topping);
//     }
//     if(this.toppings[i].position == 'right') {
//       if(this.toppings[i].qty == 'regular') {
//         rightToppings.push(this.toppings[i].topping);
//       } else rightToppings.push('Extra ' + this.toppings[i].topping);
//     }
//   }
//   output.push(wholeToppings);
//   output.push(leftToppings);
//   output.push(rightToppings);
//   return output;
// }

var currentPizza = new Pizza();


function toppingSelect() {
  currentPizza.toppings = [];
  $('#toppings-select input:checkbox:checked').each(function(){
    currentPizza.toppings.push(new Topping($(this).val(), $('#' + ($(this).val()).replace(' ', '-') + '-position').val(), $('#' + $(this).val().replace(' ', '-') + '-qty').val()));
  });
  $('#toppings-select input:checkbox:not(:checked)').each(function(){
    for(var i = 0; i < currentPizza.toppings.length; i++) {
      if(currentPizza.toppings[i].topping == $(this).val()) {
        currentPizza.toppings.splice(i, 1);
      }
    }
  });
}

function toppingPositionCustomize(topping, position) {
  for(var i = 0; i < currentPizza.toppings.length; i++) {
    if(currentPizza.toppings[i].topping == topping.replace('-', ' ')) {
      currentPizza.toppings[i].position = position;
    }
  }
}

$(function(){
  $('#size-select input').change(function(){
    currentPizza.size = $('#size-select input:checked').val();
    $('#toppings-select').slideDown();
  });

  $('#toppings-select input:checkbox').change(function(){
    $(this).siblings('.row').slideToggle();
    toppingSelect();
  });

  $('[id$=position]').change(function(){
    console.log($(this).attr('id').slice(0, -9))
    toppingPositionCustomize($(this).attr('id').slice(0, -9), $(this).val());
  });

  $('[id$=qty]').change(function(){
    console.log('works');
  });


});
