//BIZ LOGIC
function Pizza(size) {
  this.size = size;
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
      if(this.toppings[i].position == 'whole') {
        if(this.toppings[i].qty == 'regular') {
          price += 0.5;
        } else price += 1;
      } else {
        if(this.toppings[i].qty == 'regular') {
          price += 0.25;
        } else price += 0.5;
      }
    }
  }
  if(this.size == 'Medium') {
    price += 10;
    for (var i = 0; i < this.toppings.length; i++) {
      if(this.toppings[i].position == 'whole') {
        if(this.toppings[i].qty == 'regular') {
          price += 0.75;
        } else price += 1.50;
      } else {
        if(this.toppings[i].qty == 'regular') {
          price += 0.40;
        } else price += 0.75;
      }
    }
  }
  if(this.size == 'Large') {
    price += 12;
    for (var i = 0; i < this.toppings.length; i++) {
      if(this.toppings[i].position == 'whole') {
        if(this.toppings[i].qty == 'regular') {
          price += 1;
        } else price += 2;
      } else {
        if(this.toppings[i].qty == 'regular') {
          price += 0.5;
        } else price += 1;
      }
    }
  }
  return price;
}

Pizza.prototype.compileInfo = function() {
  var output = [];
  var wholeToppings = [];
  var leftToppings = [];
  var rightToppings = [];
  output.push(this.qty + ' ' + this.size + ' Pizza');
  for(var i = 0; i < this.toppings.length; i++) {
    if(this.toppings[i].position == 'whole') {
      if(this.toppings[i].qty == 'regular') {
        wholeToppings.push(this.toppings[i].topping);
      } else wholeToppings.push('Extra ' + this.toppings[i].topping);
    }
    if(this.toppings[i].position == 'left') {
      if(this.toppings[i].qty == 'regular') {
        leftToppings.push(this.toppings[i].topping);
      } else leftToppings.push('Extra ' + this.toppings[i].topping);
    }
    if(this.toppings[i].position == 'right') {
      if(this.toppings[i].qty == 'regular') {
        rightToppings.push(this.toppings[i].topping);
      } else rightToppings.push('Extra ' + this.toppings[i].topping);
    }
  }
  output.push(wholeToppings);
  output.push(leftToppings);
  output.push(rightToppings);
  return output;
}
