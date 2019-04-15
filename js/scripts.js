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

var cart = {
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
      if(this.toppings[i].position == 'Whole Pie') {
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
      if(this.toppings[i].position == 'Whole Pie') {
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
      if(this.toppings[i].position == 'Whole Pie') {
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
  return parseFloat(price).toFixed(2);
}

//sorts information about current pizza based on user selections
Pizza.prototype.compileInfo = function() {
  var output = [];
  var wholeToppings = [];
  var leftToppings = [];
  var rightToppings = [];
  output.push(this.qty + ' ' + this.size + ' Pizza');
  for(var i = 0; i < this.toppings.length; i++) {
    if(this.toppings[i].position == 'Whole Pie') {
      if(this.toppings[i].qty == 'Regular') {
        wholeToppings.push(this.toppings[i].topping);
      } else wholeToppings.push('Extra ' + this.toppings[i].topping);
    }
    if(this.toppings[i].position == 'Left Side') {
      if(this.toppings[i].qty == 'Regular') {
        leftToppings.push(this.toppings[i].topping);
      } else leftToppings.push('Extra ' + this.toppings[i].topping);
    }
    if(this.toppings[i].position == 'Right Side') {
      if(this.toppings[i].qty == 'Regular') {
        rightToppings.push(this.toppings[i].topping);
      } else rightToppings.push('Extra ' + this.toppings[i].topping);
    }
  }
  output.push(wholeToppings);
  output.push(leftToppings);
  output.push(rightToppings);
  return output;
}

var currentPizza = new Pizza();

//update selected toppings for current pizza
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

//update position of selected topping (left, right, or whole pie)
function toppingPositionCustomize(topping, position) {
  for(var i = 0; i < currentPizza.toppings.length; i++) {
    if(currentPizza.toppings[i].topping == topping.replace('-', ' ')) {
      currentPizza.toppings[i].position = position;
    }
  }
}

//update quantity of selected topping (regular or extra)
function toppingQtyCustomize(topping, qty) {
  for(var i = 0; i < currentPizza.toppings.length; i++) {
    if(currentPizza.toppings[i].topping == topping.replace('-', ' ')) {
      currentPizza.toppings[i].qty = qty;
    }
  }
}

//UI LOGIC

//update cost of current pizza
function updateCost() {
  $('#current-pizza-cost').text(currentPizza.calcPrice());
}

//confirm selections for current pizza and add to cart
function addToCart() {
  var orderedPizza = currentPizza;
  orderedPizza.price = orderedPizza.calcPrice();
  orderedPizza.info = orderedPizza.compileInfo();
  cart.pizzas.push(orderedPizza);
  $('#size-select').slideUp();
  $('#toppings-select').slideUp();
}

$(function(){
  $('#size-select input').change(function(){
    currentPizza.size = $('#size-select input:checked').val();
    $('#toppings-select').slideDown();
    $('#review-pizza').slideDown();
    updateCost();
  });

  $('#toppings-select input:checkbox').change(function(){
    $(this).siblings('.row').slideToggle();
    toppingSelect();
    updateCost();
  });

  $('[id$=position]').change(function(){
    toppingPositionCustomize($(this).attr('id').slice(0, -9), $(this).val());
    updateCost();
    console.log($(this).val());
  });

  $('[id$=qty]').change(function(){
    toppingQtyCustomize($(this).attr('id').slice(0, -4), $(this).val());
    updateCost();
  });

  $('#add-to-cart').click(function(){
    addToCart();
  });
});
